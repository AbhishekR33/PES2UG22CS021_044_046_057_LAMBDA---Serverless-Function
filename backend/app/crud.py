# backend/app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas

def create_function(db: Session, function: schemas.FunctionCreate):
    db_function = models.Function(**function.dict())
    db.add(db_function)
    db.commit()
    db.refresh(db_function)
    return db_function

def get_function(db: Session, function_id: int):
    return db.query(models.Function).filter(models.Function.id == function_id).first()

def get_function_by_name(db: Session, name: str):
    return db.query(models.Function).filter(models.Function.name == name).first()

def get_functions(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Function).offset(skip).limit(limit).all()

def update_function(db: Session, function_id: int, function_update: schemas.FunctionCreate):
    db_function = db.query(models.Function).filter(models.Function.id == function_id).first()
    if db_function:
        for key, value in function_update.dict().items():
            setattr(db_function, key, value)
        db.commit()
        db.refresh(db_function)
    return db_function

def delete_function(db: Session, function_id: int):
    db_function = db.query(models.Function).filter(models.Function.id == function_id).first()
    if db_function:
        db.delete(db_function)
        db.commit()
    return db_function
    