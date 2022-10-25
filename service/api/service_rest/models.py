from asyncio.base_futures import _FINISHED
from django.db import models

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length = 200, unique = True)
    auto_vin = models.CharField(max_length = 20)


class Technician(models.Model):
    name = models.CharField(max_length = 100)
    employee_number = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class ServiceAppt(models.Model):
    vin = models.CharField(max_length = 20)
    owner = models.CharField(max_length = 100)
    date_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    tech = models.ManyToManyField(Technician, related_name= "ServiceAppt")
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('FINISHED', 'Finished'),
        ('CANCELLED', 'Cancelled')
    ]
    status = models.CharField(max_length = 10, choices = STATUS_CHOICES, default = 'PENDING')
    reason = models.TextField()
    vip = models.BooleanField(default = False)

    def __str__(self):
        return f'({self.vin} | {date_time} | status)'


