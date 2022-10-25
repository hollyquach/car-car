from django.contrib import admin
from .models import  AutomobileVO, Technician, ServiceAppt

admin.site.register(AutomobileVO)
admin.site.register(Technician)
admin.site.register(ServiceAppt)
