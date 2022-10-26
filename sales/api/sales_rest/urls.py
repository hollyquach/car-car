from django.urls import path
from sales_rest.views import (
    api_sales_record,
    api_customer,
    api_sales_rep,
    # sales_rep_sales,
)

urlpatterns = [
     path("sales/", api_sales_record, name="api_sales_record"),
     path("sales_rep_sales/<int:sales_rep_id>/", api_sales_record, name="sales_rep_sales"),
     path("customer/", api_customer, name="api_customer"),
     path("sales_rep/", api_sales_rep, name="api_sales_rep"),
]
