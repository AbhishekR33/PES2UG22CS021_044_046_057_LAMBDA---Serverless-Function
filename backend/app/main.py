from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List  # Needed for Python 3.8 or below
from . import models, schemas, crud
from .database import SessionLocal, engine

# Initialize FastAPI app
app = FastAPI(title="Lambda Serverless Function API")

# Root endpoint to avoid 404 errors
@app.get("/")
def read_root():
    return {"message": "Welcome to the Lambda Serverless Function API"}

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CRUD Endpoints

@app.post("/functions/", response_model=schemas.Function)
def create_function(function: schemas.FunctionCreate, db: Session = Depends(get_db)):
    db_function = crud.get_function_by_name(db, name=function.name)
    if db_function:
        raise HTTPException(status_code=400, detail="Function already registered")
    return crud.create_function(db=db, function=function)

@app.get("/functions/", response_model=List[schemas.Function])  # Fixed list syntax
def read_functions(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_functions(db, skip=skip, limit=limit)

@app.get("/functions/{function_id}", response_model=schemas.Function)
def read_function(function_id: int, db: Session = Depends(get_db)):
    db_function = crud.get_function(db, function_id=function_id)
    if db_function is None:
        raise HTTPException(status_code=404, detail="Function not found")
    return db_function

@app.put("/functions/{function_id}", response_model=schemas.Function)
def update_function(function_id: int, function: schemas.FunctionCreate, db: Session = Depends(get_db)):
    db_function = crud.update_function(db, function_id, function)
    if db_function is None:
        raise HTTPException(status_code=404, detail="Function not found")
    return db_function

@app.delete("/functions/{function_id}")
def delete_function(function_id: int, db: Session = Depends(get_db)):
    db_function = crud.delete_function(db, function_id)
    if db_function is None:
        raise HTTPException(status_code=404, detail="Function not found")
    return {"message": "Function deleted successfully"}