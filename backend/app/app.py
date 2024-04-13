from typing import Any, Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def read_root():
    return {"name": "astra"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None) -> dict[str, Any]:
    return {"item_id": item_id, "q": q}


@app.get(f"/asnsn/asdasd/{id}")
async def id(id: int, aas: str):

    return {"name": "astra"}
