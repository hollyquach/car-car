from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from .encoders import (
    AutomobileVOEncoder,
    CustomerEncoder,
    SalesRepEncoder,
    SalesRecordEncoder,
)

from .models import (
    AutomobileVO,
    Customer,
    SalesRep,
    SalesRecord,
)
# Create your views here.

@require_http_methods(["POST"])
def api_automobile_vo(request):
    content = json.loads(request.body)
    automobile_vo = AutomobileVO.objects.create(**content)
    return JsonResponse(
        automobile_vo,
        encoder=AutomobileVOEncoder,
        safe=False,
    )


@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_sales_rep(request):
    if request.method == "GET":
        sales_reps = SalesRep.objects.all()
        return JsonResponse(
            {"sales_reps": sales_reps},
            encoder=SalesRepEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        sales_rep = SalesRep.objects.create(**content)
        return JsonResponse(
            sales_rep,
            encoder=SalesRepEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_sales_record(request, sales_rep_id=None):
    if request.method == "GET":
        if sales_rep_id is not None:
            sales = SalesRecord.objects.filter(sales_rep=sales_rep_id)
        else:
            sales = SalesRecord.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesRecordEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            sales_rep = SalesRep.objects.get(id=content['sales_rep'])
            content['sales_rep'] = sales_rep
        except SalesRep.DoesNotExist:
            return JsonResponse(
                {"message": "failed on input of sales rep"},
                status=400,
            )
        try:
            customer = Customer.objects.get(id=content['customer'])
            content['customer'] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "failed on input of customer"},
                status=400,
            )
        try:
            automobile_vo = AutomobileVO.objects.get(id=content['automobile_vo'])
            content['automobile_vo'] = automobile_vo
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "failed on input of automobile_vo"},
                status=400,
            )

        sale = SalesRecord.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SalesRecordEncoder,
            safe=False,
        )
