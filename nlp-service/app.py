import httpx
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from contextlib import asynccontextmanager

HF_API_TOKEN = os.environ.get("HF_TOKEN")
HF_ENDPOINT_URL = "https://router.huggingface.co/hf-inference/models/tabularisai/multilingual-sentiment-analysis"

@asynccontextmanager
async def lifespan(app: FastAPI):
    if not HF_API_TOKEN:
        raise RuntimeError("HF_TOKEN environment variable not set!")
    
    app.state.client = httpx.AsyncClient(timeout=30.0)
    
    yield
    
    await app.state.client.aclose()

app = FastAPI(lifespan=lifespan)

# Pydantic models
class SentimentRequest(BaseModel):
    text: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "text": "I love this product! It's amazing!"
            }
        }

class SentimentResponse(BaseModel):
    sentiment: str
    score: float

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "nlp-service"}

@app.post("/sentiment", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    
    # Validate input
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    headers = {
        "Authorization": f"Bearer {HF_API_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "inputs": request.text,
        "options": {"wait_for_model": True}
    }
    
    try:
        response = await app.state.client.post(
            HF_ENDPOINT_URL,
            headers=headers,
            json=payload
        )
        response.raise_for_status()
    
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Hugging Face API timeout")
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code, 
            detail=f"Hugging Face API Error: {e.response.text}"
        )
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Network Error: {str(e)}")
    
    try:
        data = response.json()
        
        if not data or not isinstance(data, list) or not data[0]:
            raise ValueError("Unexpected response format")
        
        best_sentiment = max(data[0], key=lambda x: x['score'])
        
        return SentimentResponse(
            sentiment=best_sentiment['label'],
            score=round(best_sentiment['score'], 4)  
        )
        
    except (KeyError, ValueError, IndexError) as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to parse model output: {str(e)}"
        )
