"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import sys
from pathlib import Path

# Calculate the path to the 'backend' directory dynamically
BASE_DIR = Path(__file__).resolve().parent.parent

# Inject the 'backend' directory into Python's search paths
if str(BASE_DIR) not in sys.path:
    sys.path.append(str(BASE_DIR))

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = get_wsgi_application()
