import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.

# from sales_rest.models import Something
from sales_rest.models import AutomobileVO


def get_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    # print("contentcontent", content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            href=automobile["href"],
            defaults={
                "color": automobile["color"],
                "year": automobile["year"],
                "vin": automobile["vin"],
                "model": automobile["model"]["name"],
                },
        )


def poll():
    while True:
        try:
            # Write your polling logic, here
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
