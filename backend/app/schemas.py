# backend/app/schemas.py
from pydantic import BaseModel

class FunctionBase(BaseModel):
    name: str
    route: str
    language: str
    timeout: int
    settings: str = None

class FunctionCreate(FunctionBase):
    pass

class Function(FunctionBase):
    id: int

    class Config:
        orm_mode = True
