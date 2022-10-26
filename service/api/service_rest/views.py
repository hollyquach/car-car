from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import AutomobileVO, Technician, ServiceAppt
from common.json import ModelEncoder


# > Encoders
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "id", "auto_vin"]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "name", "employee_number"]

# same encoder for detail and list since the table display includes everything for both
class ServiceApptEncoder(ModelEncoder):
    model = ServiceAppt
    properties = [
        "id",
        "vin",
        "owner",
        "date_time",
        "tech",
        "status",
        "reason",
        "vip",
    ]
    encoders = {
        "tech": TechnicianEncoder(),
    }

# > Views

# create new techs
@require_http_methods(["GET", "POST"])
def api_list_techs(request):
    """
    Collection API handler for Technicians in service
    ---
    GET | returns a dictionary with a single key "Service Techs"
        which is a list of technicians
        {
            "techs": [
                {
                    "id": database id for the technician,
                    "name": technician's name,
                    "employee_number": the technician's employee number,
                },
                ...
            ]
        }
    ---
    POST | creates a technician resource and returns it detials
        parameters:
        {
            "name": technician's name,
            "employee_number": the technician's employee number,
        }
    """
    if request.method == "GET":
        techs = Technician.objects.all()
        return JsonResponse(
            {"Service Techs": techs},
            encoder=TechnicianEncoder,
        )
    else: # POST method to create technicians
        try:
            content = json.loads(request.body)
            tech = Technician.objects.create(**content)
            return JsonResponse(
                tech,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response

## added to see automobileVO list
@require_http_methods(["GET"])
def api_list_autoVOs(request):
    """
    Collection API handler for AutomobileVO (value object)
    polled from Inventory microservices Automobile
    ---
    GET | returns a dictionary with a single key "techs"
        which is a list of technicians
        {
            "cars": [
                {
                    "import_href": URL to the automobile,
                    "id": database id for the automobile value object,
                    "auto_vin": vin for the automobile value object
                },
                ...
            ]
        }
    """
    if request.method == "GET":
        cars = AutomobileVO.objects.all()
        return JsonResponse(
            {"cars": cars},
            encoder=AutomobileVOEncoder,
        )

# list all service appts & create new appts
@require_http_methods(["GET", "POST"])
def api_list_appts(request):
    """
    Collection API handler for Service Appointments in service
    ---
    GET | returns a dictionary with a single key "Service Appointments"
        which is a list of appointments with optional vin URL parameter
        {
            "Service Appointments": [
                {
                "href": URL to the appointment,
                "id": database id for the appointment,
                "vin": vehicle identification number (vin) of the car,
                "owner": name of the car owner/customer,
                "date_time": date & time of the appointment,
                "tech": {
                    "id": database id for the technician,
                    "name": technician's name,
                    "employee_number": the technician's employee number,
                },
                "status": status of the appointment; defaults to "PENDING",
                "reason": description of the reason for appointment,
                "vip": if the car was purchased from the dealership & requires VIP treatment;
                    references if vin matches Inventory database via AutomobileVO,
                    otherwise defaults to "False"
                },
                ...
            ]
        }
    ---
    POST | creates a service appointment resource and returns it details
        parameters:
        {
            "vin": vehicle identification number (vin) of the car,
            "owner": name of the car owner/customer,
            "date_time": date & time of the appointment,
            "tech": employee_number of the technician performing service,
            "status": *OPTIONAL | status of the appointment; defaults to "PENDING",
            "reason": description of the reason for appointment,
            "vip": *OPTIONAL | if the car was purchased from the dealership
                & requires VIP treatment
        }
    """
    if request.method == "GET":
        # URL parameter to filter list by VIN
        if request.GET.get("vin"):
            appts = ServiceAppt.objects.filter(vin=request.GET.get("vin"))
        else:
            appts = ServiceAppt.objects.all()
        return JsonResponse(
            {"Service Appointments": appts},
            encoder=ServiceApptEncoder
        )
    else: # POST method to create service appointment
        try:
            content = json.loads(request.body)
            # Updates content dict with technician object
            # Matches employee# of request to technician instances
            content["tech"] = Technician.objects.get(employee_number=content["tech"])

            # Update VIP model field if car was purchased from inventory
            # Matches the request vin to the AutomobileVO vins
            content["vip"] = AutomobileVO.objects.filter(auto_vin=content["vin"]).first() != None

            appointment = ServiceAppt.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=ServiceApptEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create service appointment"}
            )
            response.status_code = 400
            return response


# list service appts by VIN & update appt status (cancelled/finished)
@require_http_methods(["GET", "PUT"])
def api_view_appt(request, pk):
    """
    Single-object API for the Service Appointment resource
    ---
        GET | returns a dictionary with a single key "Service Appointments"
        which is a list of appointments with optional vin URL parameter
        {
            "Service Appointments": [
                {
                "href": URL to the appointment,
                "id": database id for the appointment,
                "vin": vehicle identification number (vin) of the car,
                "owner": name of the car owner/customer,
                "date_time": date & time of the appointment,
                "tech": {
                    "id": database id for the technician,
                    "name": technician's name,
                    "employee_number": the technician's employee number,
                },
                "status": status of the appointment; defaults to "PENDING",
                "reason": description of the reason for appointment,
                "vip": if the car was purchased from the dealership & requires VIP treatment;
                    references if vin matches Inventory database via AutomobileVO,
                    otherwise defaults to "False"
                },
                ...
            ]
        }
    ---
    PUT | updates a service appointment resource and returns it details
        used to update the status of service appointment to "CANCELLED" or "FINISHED"
        parameters:
        {
            "id": database id for the appointment,
            "status": status of the appointment,
                options of: "PENDING", "FINISHED", or "CANCELLED"
        }
    """
    if request.method == "GET":
        appointment = ServiceAppt.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=ServiceApptEncoder,
            safe=False,
        )
    else: # PUT method to update appointment status
        content = json.loads(request.body)
        # constraining status to choices defined in model
        if content["status"].upper() in map(lambda x: x[0], ServiceAppt.STATUS_CHOICES):
            content["status"] = content["status"].upper() 
            ServiceAppt.objects.filter(id=pk).update(**content)
            appointment = ServiceAppt.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=ServiceApptEncoder,
                safe=False,
            )
        else:
            response = JsonResponse(
                {"message": "Could not update service appointment"}
            )
            response.status_code = 400
            return response