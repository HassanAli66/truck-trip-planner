from django.urls import path

from .views import GenerateRouteView

urlpatterns = [
    path(
        "generate-route/",
        GenerateRouteView.as_view(),
        name="generate-route",
    ),
]
