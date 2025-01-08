from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pathlib import Path


def create_app():
    app = FastAPI()
    app.mount("/static", StaticFiles(directory='vcdojo/static'), name='static')

    @app.get("/", response_class=HTMLResponse)
    def read_root():
        html_path = Path('vcdojo/templates/index.html').read_text()
        return HTMLResponse(content=html_path)

    @app.get('/lab00', response_class=HTMLResponse)
    def read_lab00():
        html_path = Path('vcdojo/templates/lab00.html').read_text()
        return HTMLResponse(content=html_path)

    return app
