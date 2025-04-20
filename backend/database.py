from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# For MySQL (example):
DATABASE_URL = "postgresql://postgres:Akash%402004@localhost:5432/postgres"

# For SQL Server (example):
# DATABASE_URL = "mssql+pyodbc://username:password@myserver:1433/mydatabase?driver=ODBC+Driver+17+for+SQL+Server"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)