from common.json import ModelEncoder

from .models import (
    AutomobileVO,
    Customer,
    SalesRep,
    SalesRecord,
)

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]


class SalesRepEncoder(ModelEncoder):
    model = SalesRep
    properties = [
        "id",
        "name",
        "employee_id",
    ]


class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "id",
        "total",
        "sales_rep",
        "customer",
        "automobile_vo",
    ]
    encoders = {
        "sales_rep": SalesRepEncoder(),
        "customer": CustomerEncoder(),
        "automobile_vo": AutomobileVOEncoder(),
    }
