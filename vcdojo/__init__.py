import uvicorn

# project imports
from .main import create_app


def run_app():
    uvicorn.run('vcdojo:create_app',
                port=8080,
                reload=True,
                factory=True,
                log_level='debug',
                reload_dirs=['vcdojo/static', 'vcdojo/templates'])
