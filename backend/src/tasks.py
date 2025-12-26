# from fastapi import APIRouter, Depends, HTTPException, status, Request
# from sqlmodel import select
# from sqlalchemy.ext.asyncio import AsyncSession
# from typing import List
# from datetime import datetime, timezone
# from src.models import Task, TaskCreate, TaskUpdate, TaskRead
# from src.database import get_async_session
# from src.auth import verify_token
# import uuid

# # Create the tasks router
# tasks_router = APIRouter(prefix="/tasks", tags=["tasks"])

# # --- Helper Function: Token se user data nikalne ke liye ---
# async def get_current_user(request: Request):
#     """
#     Check if user is logged in by verifying the cookie
#     """
#     token = request.cookies.get("better-auth.session_token")
#     if not token:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED, 
#             detail="Session not found. Please login again."
#         )
    
#     payload = verify_token(token)
#     if not payload:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED, 
#             detail="Invalid or expired session."
#         )
    
#     return payload

# @tasks_router.get("/", response_model=List[TaskRead])
# async def get_tasks(
#     session: AsyncSession = Depends(get_async_session),
#     user_data=Depends(get_current_user)
# ):
#     """Get all tasks for the currently logged-in user"""
#     user_id = user_data.get("sub")
#     result = await session.execute(select(Task).where(Task.user_id == user_id))
#     tasks = result.scalars().all()
#     return tasks

# @tasks_router.get("/{task_id}", response_model=TaskRead)
# async def get_task(
#     task_id: uuid.UUID, 
#     session: AsyncSession = Depends(get_async_session),
#     user_data=Depends(get_current_user)
# ):
#     """Get a specific task"""
#     user_id = user_data.get("sub")
#     task = await session.get(Task, task_id)
    
#     if not task or task.user_id != user_id:
#         raise HTTPException(status_code=404, detail="Task not found")
    
#     return task

# @tasks_router.post("/", response_model=TaskRead)
# async def create_task(
#     task: TaskCreate, 
#     session: AsyncSession = Depends(get_async_session),
#     user_data=Depends(get_current_user)
# ):
#     """Create a new task linked to the logged-in user"""
#     user_id = user_data.get("sub")
    
#     # Note: created_at aur updated_at models.py mein auto-generate ho jayenge
#     db_task = Task(
#         title=task.title,
#         description=task.description,
#         user_id=user_id 
#     )
#     session.add(db_task)
#     await session.commit()
#     await session.refresh(db_task)
#     return db_task

# @tasks_router.put("/{task_id}", response_model=TaskRead)
# async def update_task(
#     task_id: uuid.UUID, 
#     task_update: TaskUpdate, 
#     session: AsyncSession = Depends(get_async_session),
#     user_data=Depends(get_current_user)
# ):
#     """Update a specific task"""
#     user_id = user_data.get("sub")
#     db_task = await session.get(Task, task_id)
    
#     if not db_task or db_task.user_id != user_id:
#         raise HTTPException(status_code=404, detail="Task not found or unauthorized")

#     # Update fields
#     task_data = task_update.dict(exclude_unset=True)
#     for field, value in task_data.items():
#         setattr(db_task, field, value)

#     # FIX: Update the timestamp with timezone-aware UTC
#     db_task.updated_at = datetime.now(timezone.utc)

#     session.add(db_task)
#     await session.commit()
#     await session.refresh(db_task)
#     return db_task

# @tasks_router.delete("/{task_id}")
# async def delete_task(
#     task_id: uuid.UUID, 
#     session: AsyncSession = Depends(get_async_session),
#     user_data=Depends(get_current_user)
# ):
#     """Delete a specific task"""
#     user_id = user_data.get("sub")
#     task = await session.get(Task, task_id)
    
#     if not task or task.user_id != user_id:
#         raise HTTPException(status_code=404, detail="Task not found or unauthorized")

#     await session.delete(task)
#     await session.commit()
#     return {"message": "Task deleted successfully"}


















# from fastapi import APIRouter, Depends, HTTPException, status, Request, Query
# from sqlmodel import select
# from sqlalchemy.ext.asyncio import AsyncSession
# from typing import List, Optional
# from datetime import datetime, timezone
# from src.models import Task, TaskCreate, TaskUpdate, TaskRead
# from src.database import get_async_session
# from src.auth import verify_token
# import uuid

# tasks_router = APIRouter(prefix="/tasks", tags=["tasks"])

# # --- Modified Auth Helper ---
# async def get_current_user_optional(request: Request):
#     token = request.cookies.get("better-auth.session_token")
#     if not token:
#         return None
#     try:
#         payload = verify_token(token)
#         return payload
#     except:
#         return None

# # 1. GET ALL TASKS
# @tasks_router.get("/", response_model=List[TaskRead])
# async def get_tasks(
#     user_id: Optional[str] = Query(None),
#     session: AsyncSession = Depends(get_async_session),
#     user_data = Depends(get_current_user_optional)
# ):
#     # Priority: 1. Cookie Session, 2. Query Parameter
#     final_id = user_data.get("sub") if user_data else user_id
    
#     if not final_id:
#         raise HTTPException(status_code=401, detail="Authentication required")

#     result = await session.execute(select(Task).where(Task.user_id == final_id))
#     return result.scalars().all()

# # 2. CREATE TASK
# @tasks_router.post("/", response_model=TaskRead)
# async def create_task(
#     task: TaskCreate, 
#     user_id: Optional[str] = Query(None),
#     session: AsyncSession = Depends(get_async_session),
#     user_data = Depends(get_current_user_optional)
# ):
#     final_id = user_data.get("sub") if user_data else user_id
#     if not final_id:
#         raise HTTPException(status_code=401, detail="Unauthorized")

#     db_task = Task(
#         title=task.title,
#         description=task.description,
#         user_id=final_id 
#     )
#     session.add(db_task)
#     await session.commit()
#     await session.refresh(db_task)
#     return db_task

# # 3. DASHBOARD STATS (Charts ke liye)
# @tasks_router.get("/stats")
# async def get_task_stats(
#     user_id: str,
#     session: AsyncSession = Depends(get_async_session)
# ):
#     res = await session.execute(select(Task).where(Task.user_id == user_id))
#     all_tasks = res.scalars().all()
    
#     total = len(all_tasks)
#     completed = len([t for t in all_tasks if t.completed])
#     pending = total - completed
#     efficiency = f"{(completed / total * 100) if total > 0 else 0:.0f}%"

#     return {
#         "totalTasks": total,
#         "completed": completed,
#         "pending": pending,
#         "efficiency": efficiency,
#         "weeklyStats": [{"name": "Tasks", "tasks": total}]
#     }




from fastapi import APIRouter, Depends, HTTPException, status, Request, Query
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from src.models import Task, TaskCreate, TaskUpdate, TaskRead
from src.database import get_async_session
from src.auth import verify_token

tasks_router = APIRouter(prefix="/tasks", tags=["tasks"])

# --- Auth Helper ---
async def get_current_user_optional(request: Request):
    token = request.cookies.get("better-auth.session_token")
    if not token:
        return None
    try:
        payload = verify_token(token)
        return payload
    except:
        return None

# 1. GET ALL TASKS
@tasks_router.get("/", response_model=List[TaskRead])
async def get_tasks(
    user_id: Optional[str] = Query(None),
    session: AsyncSession = Depends(get_async_session),
    user_data = Depends(get_current_user_optional)
):
    final_id = user_data.get("sub") if user_data else user_id
    
    if not final_id:
        raise HTTPException(status_code=401, detail="Authentication required")

    # Order by ID descending taake naya task sabse upar aaye
    result = await session.execute(
        select(Task).where(Task.user_id == final_id).order_by(Task.id.desc())
    )
    return result.scalars().all()

# 2. CREATE TASK
@tasks_router.post("/", response_model=TaskRead)
async def create_task(
    task: TaskCreate, 
    user_id: Optional[str] = Query(None),
    session: AsyncSession = Depends(get_async_session),
    user_data = Depends(get_current_user_optional)
):
    final_id = user_data.get("sub") if user_data else user_id
    if not final_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    db_task = Task(
        title=task.title,
        description=task.description or "",
        user_id=final_id,
        completed=False
    )
    session.add(db_task)
    await session.commit()
    await session.refresh(db_task)
    return db_task

# 3. UPDATE TASK (Fixed: UUID/String ID support)
@tasks_router.put("/{task_id}", response_model=TaskRead)
async def update_task(
    task_id: str,  # Changed from int to str to support UUID
    task_update: TaskUpdate,
    session: AsyncSession = Depends(get_async_session)
):
    db_task = await session.get(Task, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Sirf wahi data update karo jo frontend se aaya hai
    task_data = task_update.model_dump(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)
    
    session.add(db_task)
    await session.commit()
    await session.refresh(db_task)
    return db_task

# 4. DELETE TASK (Fixed: UUID/String ID support)
@tasks_router.delete("/{task_id}")
async def delete_task(
    task_id: str,  # Changed from int to str to support UUID
    session: AsyncSession = Depends(get_async_session)
):
    db_task = await session.get(Task, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    await session.delete(db_task)
    await session.commit()
    return {"status": "success", "message": f"Task {task_id} deleted"}

# 5. DASHBOARD STATS
@tasks_router.get("/stats")
async def get_task_stats(
    user_id: str,
    session: AsyncSession = Depends(get_async_session)
):
    res = await session.execute(select(Task).where(Task.user_id == user_id))
    all_tasks = res.scalars().all()
    
    total = len(all_tasks)
    completed = len([t for t in all_tasks if t.completed])
    pending = total - completed
    efficiency = f"{(completed / total * 100) if total > 0 else 0:.0f}%"

    return {
        "totalTasks": total,
        "completed": completed,
        "pending": pending,
        "efficiency": efficiency,
        "weeklyStats": [{"name": "Tasks", "tasks": total}]
    }