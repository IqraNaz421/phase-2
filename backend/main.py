# from src.auth import auth_router
# import ssl
# from contextlib import asynccontextmanager
# from fastapi import FastAPI
# from dotenv import load_dotenv
# import os
# from sqlalchemy.ext.asyncio import create_async_engine
# from src.models import User, Task
# from sqlmodel import SQLModel
# from fastapi.middleware.cors import CORSMiddleware
# from src.tasks import tasks_router

# # Load environment variables from .env file
# load_dotenv()

# # Get database URL from environment variable - no default to ensure Neon DB is used
# DATABASE_URL = os.getenv("DATABASE_URL")
# if not DATABASE_URL:
#     raise ValueError("DATABASE_URL environment variable is required")

# # Create SSL context for Neon PostgreSQL
# ctx = ssl.create_default_context()
# ctx.check_hostname = False
# ctx.verify_mode = ssl.CERT_NONE

# # Create async engine for Neon PostgreSQL with SSL context
# # Remove any query parameters from the URL to avoid conflicts with asyncpg
# async_engine = create_async_engine(
#     DATABASE_URL.split('?')[0],  # This removes any ?sslmode from URL
#     echo=True,  # Set to False in production
#     pool_pre_ping=True,  # Verify connections before use
#     pool_size=5,  # Base number of connections
#     max_overflow=10,  # Max additional connections beyond pool_size
#     pool_recycle=300,  # Recycle connections after 5 minutes
#     connect_args={'ssl': ctx}
# )

# # BetterAuth configuration

# # auth = BetterAuth(
# #     database=async_engine,
# #     secret=os.getenv("AUTH_SECRET", "dev-secret-change-in-production"),  # Use a proper secret in production
# #     base_url="http://localhost:8000",
# #     # Local development ke liye ye settings lazmi hain:
# #     session_cookie_name="better-auth.session_token",
# #     cookie_secure=False,      # Kyunke localhost HTTPS nahi hai
# #     cookie_samesite="lax",    # Localhost par 'lax' zaroori hai
# #     trusted_origins=["http://localhost:3000"] # Frontend origin
# # )


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Create database tables on startup
#     async with async_engine.begin() as conn:
#         # Create all tables
#         await conn.run_sync(SQLModel.metadata.create_all)
#     yield
#     # Shutdown logic can go here if needed


# app = FastAPI(lifespan=lifespan)

# # Add CORS middleware to allow requests from frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000" , "http://127.0.0.1:3000"],  # Only allow localhost:3000
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
#     expose_headers=["Access-Control-Allow-Credentials", "Set-Cookie"],
   
# )


# @app.get("/")
# async def root():
#     return {"message": "Todo API is running!"}


# @app.get("/health")
# async def health_check():
#     return {"status": "healthy", "database": "connected"}


# # Include API routes
# app.include_router(auth_router, prefix="/api")
# app.include_router(tasks_router, prefix="/api", tags=["tasks"])

# # Print all registered routes for debugging
# for route in app.routes:
#     print(f"Registered route: {route.path}")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)



# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from contextlib import asynccontextmanager
# from sqlmodel import SQLModel
# import ssl
# import os
# from dotenv import load_dotenv
# from sqlalchemy.ext.asyncio import create_async_engine

# # 1. Load environment variables
# load_dotenv()

# # Check imports
# try:
#     from src.auth import auth_router
#     from src.tasks import tasks_router
# except ImportError as e:
#     print(f"Import Error: {e}")

# DATABASE_URL = os.getenv("DATABASE_URL")

# # 2. SSL Context setup for Neon
# ctx = ssl.create_default_context()
# ctx.check_hostname = False
# ctx.verify_mode = ssl.CERT_NONE

# # 3. FIXED Engine Setup
# # Humne .split('?')[0] hata diya hai taake ?sslmode=require kaam kare
# async_engine = create_async_engine(
#     DATABASE_URL, 
#     echo=True,
#     pool_pre_ping=True,      
#     pool_size=5,             
#     max_overflow=10,
#     connect_args={
#         "ssl": ctx,
#         "server_settings": {
#             "jit": "off",     
#         }
#     }
# )

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Tables banane wala logic
#     print("Starting up: Connecting to Neon DB...")
#     try:
#         async with async_engine.begin() as conn:
#             await conn.run_sync(SQLModel.metadata.create_all)
#         print("Database is ready!")
#     except Exception as e:
#         print(f"Database connection failed: {e}")
#     yield
#     # Shutdown logic
#     await async_engine.dispose()

# app = FastAPI(lifespan=lifespan)

# # 4. CORS Middleware (Expose Headers for cookies)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
#     expose_headers=["Set-Cookie"],
# )

# # 5. Include API Routes
# app.include_router(auth_router, prefix="/api")
# app.include_router(tasks_router, prefix="/api")

# @app.get("/")
# async def root():
#     return {"message": "Todo API is running!", "status": "online"}

# @app.get("/test-db")
# async def test_db():
#     return {"status": "Database engine is configured", "endpoint": DATABASE_URL.split('@')[-1]}

# if __name__ == "__main__":
#     import uvicorn
#     # Port 8001
#     uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)















# from src.tasks import Task
# from fastapi import FastAPI, Depends, Query
# from fastapi.middleware.cors import CORSMiddleware
# from contextlib import asynccontextmanager
# from sqlmodel import SQLModel, select, func
# from sqlmodel.ext.asyncio.session import AsyncSession # Session import
# import ssl
# import os
# from dotenv import load_dotenv
# from sqlalchemy.ext.asyncio import create_async_engine

# # 1. Load environment variables
# load_dotenv()

# # Check imports
# try:
#     from src.auth import auth_router
#     from src.tasks import tasks_router
#     # Yahan hum Task model ko import kar rahe hain query karne ke liye
#     from src.tasks.models import Task 
# except ImportError as e:
#     print(f"Import Error: {e}")

# DATABASE_URL = os.getenv("DATABASE_URL")

# # 2. SSL Context setup for Neon
# ctx = ssl.create_default_context()
# ctx.check_hostname = False
# ctx.verify_mode = ssl.CERT_NONE

# # 3. FIXED Engine Setup
# async_engine = create_async_engine(
#     DATABASE_URL, 
#     echo=True,
#     pool_pre_ping=True,      
#     pool_size=5,             
#     max_overflow=10,
#     connect_args={
#         "ssl": ctx,
#         "server_settings": {
#             "jit": "off",     
#         }
#     }
# )

# # Database Session Getter
# async def get_session() -> AsyncSession:
#     async with AsyncSession(async_engine) as session:
#         yield session

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     print("Starting up: Connecting to Neon DB...")
#     try:
#         async with async_engine.begin() as conn:
#             await conn.run_sync(SQLModel.metadata.create_all)
#         print("Database is ready!")
#     except Exception as e:
#         print(f"Database connection failed: {e}")
#     yield
#     await async_engine.dispose()

# app = FastAPI(lifespan=lifespan)

# # 4. CORS Middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
#     expose_headers=["Set-Cookie"],
# )

# # --- NAYA DASHBOARD ENDPOINT ---
# @app.get("/api/tasks/stats")
# async def get_task_stats(user_id: str, session: AsyncSession = Depends(get_session)):
#     # Total Tasks Count
#     total_query = select(func.count(Task.id)).where(Task.user_id == user_id)
#     total_res = await session.execute(total_query)
#     total_count = total_res.scalar() or 0

#     # Completed Tasks Count
#     done_query = select(func.count(Task.id)).where(Task.user_id == user_id, Task.completed == True)
#     done_res = await session.execute(done_query)
#     done_count = done_res.scalar() or 0

#     pending_count = total_count - done_count
#     efficiency = f"{(done_count / total_count * 100) if total_count > 0 else 0:.0f}%"

#     return {
#         "totalTasks": total_count,
#         "completed": done_count,
#         "pending": pending_count,
#         "efficiency": efficiency,
#         "weeklyStats": [
#             {"name": "Mon", "tasks": 2},
#             {"name": "Tue", "tasks": 5},
#             {"name": "Wed", "tasks": 3},
#             {"name": "Thu", "tasks": done_count},
#             {"name": "Fri", "tasks": total_count},
#         ]
#     }

# # 5. Include API Routes
# app.include_router(auth_router, prefix="/api")
# app.include_router(tasks_router, prefix="/api")

# @app.get("/")
# async def root():
#     return {"message": "Todo API is running!", "status": "online"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
















from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from sqlmodel import SQLModel, select, func
from sqlmodel.ext.asyncio.session import AsyncSession
import ssl
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine
from typing import List

# 1. Load env
load_dotenv()

# --- Imports (Ensure models.py has Task class) ---
try:
    from src.auth import auth_router
    from src.tasks import tasks_router
    from src.models import Task 
except ImportError as e:
    print(f"❌ Import Error: {e}")

# 2. Database Config
DATABASE_URL = os.getenv("DATABASE_URL")

# Clean URL for asyncpg
if DATABASE_URL and "sslmode=" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.split("?")[0]

# SSL for Neon
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Optimized Engine to prevent hanging
async_engine = create_async_engine(
    DATABASE_URL, 
    echo=True,
    pool_pre_ping=True,
    pool_recycle=300,
    connect_args={
        "ssl": ctx,
        "server_settings": {
            "jit": "off",
            "statement_timeout": "20000" # 20 seconds timeout
        }
    }
)

async def get_session() -> AsyncSession:
    async with AsyncSession(async_engine) as session:
        yield session

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Connecting to Neon DB...")
    try:
        async with async_engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)
        print("✅ Database Ready!")
    except Exception as e:
        print(f"❌ Connection Failed: {e}")
    yield
    await async_engine.dispose()

app = FastAPI(lifespan=lifespan)

# 3. CORS Fix
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. FIXED DASHBOARD ENDPOINT
@app.get("/api/tasks/stats")
async def get_task_stats(user_id: str, session: AsyncSession = Depends(get_session)):
    try:
        # User ke tasks fetch karo
        statement = select(Task).where(Task.user_id == user_id)
        result = await session.execute(statement)
        tasks = result.scalars().all()
        
        total = len(tasks)
        completed = len([t for t in tasks if t.completed])
        pending = total - completed
        
        efficiency = f"{(completed / total * 100) if total > 0 else 0:.0f}%"

        # Graph ke liye data
        return {
            "totalTasks": total,
            "completed": completed,
            "pending": pending,
            "efficiency": efficiency,
            "weeklyStats": [
                {"name": "Mon", "tasks": total},
                {"name": "Tue", "tasks": 0},
                {"name": "Wed", "tasks": 0},
                {"name": "Thu", "tasks": completed},
                {"name": "Fri", "tasks": total},
            ]
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        return {"totalTasks": 0, "completed": 0, "pending": 0, "efficiency": "0%", "weeklyStats": []}

app.include_router(auth_router, prefix="/api")
app.include_router(tasks_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)