from sqlalchemy import create_engine

# Replace with your DATABASE_URL
DATABASE_URL = "postgresql://postgres:ARSI2003@localhost/MesimAI"

try:
    # Create an engine to connect to the database
    engine = create_engine(DATABASE_URL)
    # Try to connect to the database
    with engine.connect() as connection:
        print("Connected to the database successfully!")
except Exception as e:
    print(f"Failed to connect to the database: {e}")
