import os
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class Database:
    client: Optional[AsyncIOMotorClient] = None
    database = None

# Database instance
db_instance = Database()

async def connect_to_mongo():
    """Create database connection"""
    db_instance.client = AsyncIOMotorClient(os.environ["MONGO_URL"])
    db_instance.database = db_instance.client[os.environ.get("DB_NAME", "snapcast")]
    
    # Test connection
    try:
        await db_instance.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise

async def close_mongo_connection():
    """Close database connection"""
    if db_instance.client:
        db_instance.client.close()
        logger.info("MongoDB connection closed")

def get_database():
    """Get database instance"""
    return db_instance.database

# Collection helpers
def get_users_collection():
    return get_database().users

def get_snapcasts_collection():
    return get_database().snapcasts

def get_likes_collection():
    return get_database().likes

def get_follows_collection():
    return get_database().follows

def get_comments_collection():
    return get_database().comments