from typing import Union
import json

from fastapi import FastAPI

app = FastAPI()


@app.get("/iss/engines.json")
async def read_root():
    """"""
    return {"engines"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
