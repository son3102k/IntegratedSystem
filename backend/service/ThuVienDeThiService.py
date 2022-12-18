from .Base import BaseService
from model.request import RequestSearch
from model.responses import Response
import asyncio
from fastapi import HTTPException

class ThuVienDeThiService(BaseService):
    def __init__(self):
        super(ThuVienDeThiService,self).__init__()

    def rewriteQuery(self, req: RequestSearch) -> str:
        url = None
        if req.grade == None or int(req.grade) < 6:
            return url
        if req.subject in ["MATH", "PHYSIC", "CHEMISTRY", "BIOLOGY"]: 
            grade = str(req.grade)
            if req.subject == "MATH":
                url = f"http://thuviendethi.com/de-thi/toan-{grade}/" 
            if req.subject == "PHYSIC":
                if int(req.grade) <6:
                    url = None
                    return url
                url = f"http://thuviendethi.com/de-thi/vat-ly-{grade}/"
            if req.subject == "CHEMISTRY":
                if int(req.grade) < 8:
                    url = None
                    return url
                else:
                    url = f"http://thuviendethi.com/de-thi/hoa-hoc-{grade}/"
            if req.subject == "BIOLOGY":
                if int(req.grade) < 6:
                    url = None
                    return url
                url = f"http://thuviendethi.com/de-thi/sinh-hoc-{grade}/"
        else: return url
        if req.page > 1 and url != None:
            url += "?page=" +str(req.page)
        return url

    def parser_html(self,soup, req: RequestSearch):
        results = []
        try:
            records = soup.find_all('div',class_ ="col-md-3 col-sm-4 col-xs-6 doc-item")
            for record in records:
                content = record.find("h2").find("a")
                date = ""
                link = content.get("href")
                title = link.split("com/", 1)[1].replace("-"," ")
                title = title.replace(title.split(" ")[-1],"")
                result = Response(title=title,link=link,date=date,source="thuviendethi").dict()
                if req.type in ["MidHK1","MidHK2","HK1", "HK2","Try"]:
                    if req.type == "MidHK1":
                        str1 = "ky i"
                        str2 = "ki i"
                        str3 = "giua"
                        for (key, value) in result.items():
                            if key == "title" and ((str1 in value.lower() or str2 in value.lower()) and str3 in value.lower()):
                                results.append(result)  
                    if req.type == "MidHK2":
                        str1 = "ky ii"
                        str2 = "ki ii"
                        str3 = "giua"
                        for (key, value) in result.items():
                            if key == "title" and ((str1 in value.lower() or str2 in value.lower()) and str3 in value.lower()):
                                results.append(result)  
                    if req.type == "HK1":
                        str1 = "ky i"
                        str2 = "ki i"
                        for (key, value) in result.items():
                            if key == "title" and (str1 in value.lower() or str2 in value.lower()):
                                results.append(result)           
                    if req.type == "HK2":
                        str1 = "ky ii"
                        str2 = "ki ii"
                        for (key, value) in result.items():
                            if key == "title" and (str1 in value.lower() or str2 in value.lower()):
                                results.append(result) 
                    if req.type == "Try":
                        str1 = "thi thu"
                        for (key, value) in result.items():
                            if key == "title" and (str1 in value.lower()):
                                results.append(result) 
                else: results.append(result)
            return results


        except Exception as e:
            print(e)
            return results

    async def process(self,req:RequestSearch):
        results = []
        if req.text is None or req.text == "":

            url = self.rewriteQuery(req)
            print(url)
            if url == None:
                return results
            soup = await self.asyncDoQuery(url)

            if soup == None:
                raise HTTPException(404,"Not found, try again later")
            results = self.parser_html(soup,req)
            print(results)
            return results
        else:
            candidates = []
            page = req.page
            list_soup = []
            for i in range((page-1)*3,page*3):
                if i == 0 :continue
                req.page=i
                url = self.rewriteQuery(req)
                if url == None:
                    continue
                fut = self.asyncDoQuery(url)
                list_soup.append(fut)
            temps = await asyncio.gather(*list_soup)

            for temp in temps:

                if temp == None: continue
                else:
                    candidates.append(temp)
            for x in candidates:
                results+=self.parser_html(x,req)
            results = self.filterQuery(req.text,results)

            return results