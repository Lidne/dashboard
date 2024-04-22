from typing import Union
from fastapi import FastAPI

from backend.app.send_EMAIL import send_email
from parsing_news import news_list

app = FastAPI()


@app.get("/news")
async def new_list(from_: str, to_: str = "") -> dict:
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


@app.get("/iss/engines.json")
async def read_root():
    """"""
    return {"engines"}
