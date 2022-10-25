from django.urls import path
from .views import api_list_techs, api_list_appts, api_view_appts

urlpatterns = [
    path("tech/", api_list_techs, name="api_list_techs"),
    path("services/", api_list_appts, name="api_list_appts"),
    path("services/<str:vin>", api_view_appts, name="api_view_appts"),    
]