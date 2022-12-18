FROM python:3.7-buster 


WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

ENV C_FORCE_ROOT=true

COPY . /app
CMD uvicorn server:app --host 0.0.0.0