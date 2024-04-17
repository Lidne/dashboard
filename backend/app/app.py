from typing import Union
from fastapi import FastAPI
from parsing_news import news_list

app = FastAPI()


@app.get("/news")
async def new_list(from_: str, to_: str = "") -> dict:
    dict_news = {"NEWS": news_list(from_, to_)}
    return dict_news


@app.get("/items/{item_id}")
async def read_item(item_id: Union[int, None] = None, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
