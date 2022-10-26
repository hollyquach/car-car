from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    href = models.CharField(max_length=200)
    vin = models.CharField(max_length=17, unique=True)
    year = models.PositiveSmallIntegerField()
    model = models.CharField(max_length=250)
    color = models.CharField(max_length=50)


    def __str__(self):
        return self.vin

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address= models.CharField(max_length=200)
    phone_number = models.PositiveBigIntegerField()

    def __str__(self):
        return self.name

class SalesRep(models.Model):
    name = models.CharField(max_length=100)
    employee_id = models.IntegerField()

    def __str__(self):
        return self.name

class SalesRecord(models.Model):
    total = models.IntegerField()

    sales_rep = models.ForeignKey(
        SalesRep,
        related_name='+',
        on_delete=models.PROTECT
        )

    customer = models.ForeignKey(
        Customer,
        related_name='+',
    on_delete=models.PROTECT
    )

    automobile_vo = models.ForeignKey(
        AutomobileVO,
        related_name="sales_record",
        on_delete = models.CASCADE #WILL CASCADE DELETE vin VO or vin in models.py class Automobile?
    )
