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
import
# from sales_rest.models import Something
import sales_rest.models import AutomobileVO


def get_automobiles():
    response = requests.get("http://inventory/api:8000/api/automobiles/")
    content = json.loads(response.content)
    for location in content["locations"]:

        LocationVO.objects.update_or_create(
            import_href=location["href"],
            defaults={
                "closet_name": location["closet_name"],
                "section_number": location["section_number"],
                "shelf_number": location["shelf_number"],
                },
        )


def poll():
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
