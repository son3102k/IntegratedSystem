from .Base import BaseService
from model.request import RequestSearch
from model.responses import Response
import asyncio
from fastapi import HTTPException
import http3, string, random, requests
from bs4 import BeautifulSoup
class TracNghiemService(BaseService):
    def __init__(self,):
        super(TracNghiemService, self).__init__()
    async def asyncDoQuery(self,url,sleep_range:float=0):
        
        htmlText = requests.get(url, verify=False).text
        soup = BeautifulSoup(htmlText, 'html.parser')
       # print(soup)
        return soup
    def rewriteQuery(self,req:RequestSearch)-> str:
        url = None
        if int(req.grade) >= 10:
            if req.subject == "MATH":
                url = f"https://tracnghiem.net/de-kiem-tra/toan-hoc-lop-{req.grade}/"
            if req.subject == "PHYSIC":
                url = f"https://tracnghiem.net/de-kiem-tra/vat-ly-lop-{req.grade}/"
            if req.subject == "CHEMISTRY":
                url = f"https://tracnghiem.net/de-kiem-tra/hoa-hoc-lop-{req.grade}/"
            if req.subject == "BIOLOGY":
                url = f"https://tracnghiem.net/de-kiem-tra/sinh-hoc-lop-{req.grade}/"
        return url

    def parser_html(self,soup, req:RequestSearch):
        
        results=[]
        try:
            #print(type(soup))
            records = soup.find_all('div', class_='d9Box part-item')
            # print(records)
            for record in records:
                first_title = record.find('a').find('h2').text
                if ((req.type in ["HK1","HK2"]) and ("giữa" not in first_title)) or ((req.type in ["MidHK1","MidHK2"]) and ("giữa" in first_title)):
                    if ((req.type in ["HK1", "MidHK1"]) and ("HK1" in first_title)) or((req.type in ["HK2", "MidHK2"]) and ("HK2" in first_title)):
                        second_title = record.find('p').text
                        title = f"{first_title} {second_title}"
                        date = record.find('div', class_= 'view-detail').find('div', 'num-exam').text
                        link = record.find('a').get('href')
                        result = Response(title=title,link=link,date=date,source="tracnghiem").dict()
                        results.append(result)
            return results
        except Exception as e:
            print(e)
            return results

    async def process(self,req:RequestSearch):
        # return self.rewriteQuery(req)
        results = []
        if req.text is None or req.text == "":
            
            url = self.rewriteQuery(req)
            if url == None:
                return results
            soup = await self.asyncDoQuery(url)
            # print(soup)
            if soup == None:
                raise HTTPException(404,"Not found, try again later")
            results = self.parser_html(soup, req)
            return results
        else:
            candidates = []
            page = req.page
            list_soup = []
            for i in range(2):
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
                results+=self.parser_html(x, req)
           # candidates = [ for x in candidates]
            results = self.filterQuery(req.text,results)
            return results