from fastapi.middleware.cors import CORSMiddleware
from fastapi import (
    APIRouter, FastAPI, Request,
    HTTPException,
    Header,
    Depends,
    Response as HttpResponse,
    Query,
)
from fastapi.responses import HTMLResponse
from starlette.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from model.request import RequestSearch
from config import Settings
from worker.get_celery import get_celery, a_get_result
from worker import tasks
import uuid
import uvicorn, celery
import json
from service.factory import FACTORY
from service.SummaryService import SummaryService
import time, random
summaryService = SummaryService()
app = FastAPI()
store_result = {}
data = {}
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)
settings = Settings()
@app.post("/search")
def search(req:RequestSearch):
    final = {}
    for web in settings.list_webpage:
        job_id = str(web)+"-"+ str(uuid.uuid4())
        result = tasks.run_session.apply_async(
                args=[
                    req.dict(),
                    web
                ],
                task_id=job_id,
            )
        final[web] = job_id
        print("job id", job_id)
        store_result[job_id]=result
    return {"result":final}
    
@app.post("/search/{web}")
async def search_one_web(req:RequestSearch,web:str):
    
    engine = FACTORY[web]()
    #result = tasks.run_session(req.dict(),web) 
    result =await engine.process(req)
    return result
@app.get("/list-web-pages")
async def get_list_web_pages():
    return settings.list_webpage


@app.get(
    "/result/{task_id}"
)
def get_annotate_result(task_id:str):
    time.sleep(random.random())
    # with open('result.json', 'r') as fp:
    #     data = json.load(fp)
    if task_id in data.keys():
        return data[task_id]
    else:
        #try:
            task= store_result[task_id] #celery.result.AsyncResult(task_id)
            res =  a_get_result(task)
            data[task_id] = res
            # with open('result.json', 'w') as fp:
            #     json.dump(data, fp,indent=4,ensure_ascii=False)
            return res
        #except:
        #    raise HTTPException(status_code=422, detail=f"No tasks found")
@app.post("/summary")
async def summary(req:dict):
    result = []
    for k,v in req.items():
        result+=get_annotate_result(v)
    #result = demo()
    result = await summaryService.summary(result)
    return result
class SPAStaticFiles(StaticFiles):
	async def get_response(self, path: str, scope):
		response = await super().get_response(path, scope)
		if response.status_code == 404:
			response = await super().get_response('.', scope)
		return response
def demo():
    with open('result.json', 'r') as fp:
        data = json.load(fp)
    i = 0
    res = []
    for u,v in data.items():
        if i == 5: break
        i+=1
        res += data[u]
    return res

app.mount('/', SPAStaticFiles(directory='build', html=True), name='build')
"""
@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
	return templates.TemplateResponse("index.html", {"request": request})
"""
if __name__ == "__main__":
    uvicorn.run(app, host=settings.host,port=settings.port)