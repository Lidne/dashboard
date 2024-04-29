import sys
import os

sys.path.insert(0, os.path.join(os.getcwd(), "app"))

from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from parsing_news import news_list
from send_EMAIL import send_email

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5713"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/news")
async def 
new_list(from_: str, to_: str = "") -> dict[str, list[dict]]:
    dict_news = {"NEWS": news_list(from_, to_)}
    return dict_news


@app.post("/email")
async def email_send(
    address: str, text: Union[str, None] = None, type_html: Union[str, None] = None
) -> str:
    return send_email(address, text, type_html)


@app.get("/items/{item_id}")
async def read_item(item_id: Union[int, None] = None, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
