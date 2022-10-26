from asyncio.base_futures import _FINISHED
from django.db import models
from django.urls import reverse

import datetime

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length = 200, unique = True)
    auto_vin = models.CharField(max_length = 20)

    def __str__(self):
        return f"VIN: {self.auto_vin}"


class Technician(models.Model):
    name = models.CharField(max_length = 100)
    employee_number = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class ServiceAppt(models.Model):
    vin = models.CharField(max_length = 20)
    owner = models.CharField(max_length = 100)
    date_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    tech = models.ForeignKey(Technician, related_name= "ServiceAppt", on_delete=models.PROTECT)
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('FINISHED', 'Finished'),
        ('CANCELLED', 'Cancelled')
    ]
    status = models.CharField(max_length = 10, choices = STATUS_CHOICES, default = 'PENDING')
    reason = models.TextField()
    vip = models.BooleanField(default = False)
    
    def get_api_url(self):
        return reverse("api_view_appt", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.vin} | {self.date_time.isoformat(timespec='hours')} | {self.status}"
