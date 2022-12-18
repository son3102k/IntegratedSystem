from .Base import BaseService
from model.request import RequestSearch
from model.responses import Response
import asyncio
from fastapi import HTTPException

class ToanMathService(BaseService):
    def __init__(self,):
        super(ToanMathService, self).__init__()

    def rewriteQuery(self,req:RequestSearch)-> str:
        url = None
        if (req.level == "3" or (int(req.grade)>=10 and req.level==""))and req.subject == "MATH":
            if req.type == "Try":
                url = "https://toanmath.com/de-thi-thu-mon-toan"
            elif req.type in ["MidHK1","MidHK2","HK1","HK2"]:
                if req.type in ["MidHK1","MidHK2"]:
                    phase = "-giua"
                else:
                    phase = ""
                url = f"https://toanmath.com/de-thi{phase}-hk1-toan-{req.grade}" if "1" in req.type else f"https://toanmath.com/de-thi{phase}-hk2-toan-{req.grade}"
            elif req.type == "HSG":
                url = f"https://toanmath.com/de-thi-hsg-toan-{req.grade}" 
        if req.page > 1 and url != None:
            url += "/page/"+str(req.page)
        print("url",url)
        return url

    def parser_html(self,soup):
        
        results=[]
        try:
            #print(type(soup))
            records = soup.find_all('div', class_='mh-col-1-2 mh-posts-grid-col clearfix')
            for record in records:
                date = record.find("div",class_='mh-meta entry-meta').find("a")
                #print(date)
                date = date.contents[0]
                content = record.find('h3',class_='entry-title mh-posts-grid-title').find("a")
                title = content.get("title")
                link = content.get("href")
                result = Response(title=title,link=link,date=date,source="toanmath").dict()
                results.append(result)
            return results
        except Exception as e:
            print(e)
            return results

    async def process(self,req:RequestSearch):
        results = []
        if req.text is None or req.text == "":
            
            url = self.rewriteQuery(req)
            if url == None:
                return results
            soup = await self.asyncDoQuery(url)
            if soup == None:
                raise HTTPException(404,"Not found, try again later")
            results = self.parser_html(soup)
            return results
        else:
            candidates = []
            page = req.page
            list_soup = []
            for i in range((page-1)*5,page*5):
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
                #print(type(x))
                results+=self.parser_html(x)
           # candidates = [ for x in candidates]
            results = self.filterQuery(req.text,results)

            return results