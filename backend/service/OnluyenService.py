import string
from .Base import BaseService
from model.request import RequestSearch
from model.responses import Response
import asyncio
from fastapi import HTTPException
import http3, string, random, requests
from bs4 import BeautifulSoup

class OnluyenService(BaseService):
    def __init__(self):
        super(OnluyenService,self).__init__()
    def doQuery(self,url,sleep_range:float=0):
        
        htmlText = requests.get(url, verify=False,headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"}).text
        soup = BeautifulSoup(htmlText, 'html.parser')
       # print(soup)
        return soup
    def rewriteQuery(self, req: RequestSearch) -> str:
        url = None
        if req.grade == None or int(req.grade) < 6:
            return url
        if req.subject in ["MATH", "PHYSIC", "CHEMISTRY", "BIOLOGY"]: 
            grade = str(req.grade)
            if req.subject == "MATH":
                url = f"https://www.onluyen.vn/thu-vien-tai-lieu/toan-{grade}/" 
            if req.subject == "PHYSIC":
                if int(req.grade) == 12:
                    url = None
                    return url
                else:
                    url = f"https://www.onluyen.vn/thu-vien-tai-lieu/vat-ly-{grade}/"
            if req.subject == "CHEMISTRY":
                if int(req.grade) < 8:
                    url = None
                    return url
                else:
                    url = f"https://www.onluyen.vn/thu-vien-tai-lieu/hoa-{grade}/"
            if req.subject == "BIOLOGY":
                url = f"https://www.onluyen.vn/thu-vien-tai-lieu/sinh-{grade}/"
        else: return url
        if req.page > 1 and url != None:
            url += "page/" +str(req.page)
        print(url)
        return url
    
    def parser_html(self,soup, req: RequestSearch):
        results = []
        try:
            records = soup.find_all('h5',class_ = "entry-title")
            #print(records)
            for record in records:
                date = ""
                content = record.find('a')
                #print(content)
                title = content.getText()
                link = content.get("href")
                result = Response(title=title,link=link,date=date,source="onluyen").dict()
               # print(result)
                if req.type in ["MidHK1", "MidHK2", "HK1", "HK2"]:
                    if req.type == "MidHK1":
                        str1 = "giữa kỳ 1"
                        str2 = "giữa học kỳ 1"
                        for (key, value) in result.items():
                            if key == "title" and (str1 in value.lower() or str2 in value.lower()):
                                results.append(result)
                    if req.type == "MidHK2":
                        str1 = "giữa kỳ 2"
                        str2 = "giữa học kỳ 2"
                        for (key, value) in result.items():
                            if key == "title" and (str1 in value.lower() or str2 in value.lower()):
                                results.append(result)
                    if req.type == "HK1":
                        str1 = "cuối kỳ 1"
                        str2 = "cuối học kỳ 1"
                        for (key, value) in result.items():
                            if key == "title" and (str1 in value.lower() or str2 in value.lower()):
                                results.append(result)           
                    if req.type == "HK2":
                        str1 = "cuối kỳ 2"
                        str2 = "cuối học kỳ 2"
                        for (key, value) in result.items():
                            if key == "title" and (str1 in value.lower() or str2 in value.lower()):
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
            if url == None:
                return results
            soup = await self.asyncDoQuery(url)
        
            if soup == None:
                raise HTTPException(404,"Not found, try again later")
            results = self.parser_html(soup,req)
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
                results+=self.parser_html(x,req)
           # candidates = [ for x in candidates]
            results = self.filterQuery(req.text,results)
            
            return results