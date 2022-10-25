from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import AutomobileVO, Technician, ServiceAppt
from common.json import ModelEncoder


# > Encoders
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "id", "vin"]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["href", "id", "name", "employee_number"]

#?? same encoder for detail and list since the table display includes everything for both
class ServiceApptEncoder(ModelEncoder):
    model = ServiceAppt
    properties = [
        "href",
        "id",
        "vin",
        "owner",
        "date_time",
        "tech",
        "status",
        "reason",
        "vip",
    ]

# > Views

# create new techs
@require_http_methods(["GET", "POST"])
def api_list_techs(request):
    """
    # [] update docstring description
    """
    pass

# list all service appts & create new appts
@require_http_methods(["GET", "POST"])
def api_list_appts(request, automobile_vo_id = None):
    """
    # [] update docstring description
    """
    pass


# list service appts by VIN & update appt status (cancelled/finished)
@require_http_methods(["GET", "PUT"])
def api_view_appts(request, automobile_vo_vin = None):
    """
    # [] update docstring description
    """
    pass
