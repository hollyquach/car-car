from django.contrib import admin

# Register your models here.
from .models import AutomobileVO, Customer, SalesRep, SalesRecord

admin.site.register(AutomobileVO)
admin.site.register(Customer)
admin.site.register(SalesRep)
admin.site.register(SalesRecord)
