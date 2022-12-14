from fastapi import FastAPI, UploadFile, Response
from fastapi.middleware.cors import CORSMiddleware
from utils import *
from ml import k_means


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/uploadImage/{k}")
async def upload_image(k: int, file: UploadFile, response: Response):
    # Saves the image
    filename = file.filename
    save_image(file.file.read(), filename)

    # Process image
    stats: dict = k_means(filename, k)

    # note: size is in bytes
    return {
        "filename": filename,
        "height": stats["height"],
        "width": stats["width"],
        "size": stats["size"]
    }