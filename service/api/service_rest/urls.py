from django.urls import path
from .views import api_list_techs, api_list_appts, api_view_appt, api_list_autoVOs

urlpatterns = [
    path("techs/", api_list_techs, name="api_list_techs"),
    path("services/", api_list_appts, name="api_list_appts"),
    path("services/<int:pk>/", api_view_appt, name="api_view_appt"),
    path("autoVOs/", api_list_autoVOs, name="api_list_autoVOs"),    
]