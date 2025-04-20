from backend.app.database import engine, Base  # Update this import based on your folder structure

# Create all tables in the database
Base.metadata.create_all(bind=engine)

print("Database tables created successfully!")
