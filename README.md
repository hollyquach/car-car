# CarCar
![Our logo](ghi/app/src/images/CCLW.png)

---

## Team
* Lewey - Sales
* Holly- Services

## Overview

---

![home page](ghi/app/src/images/CarCarHome.png)
> [CarCar](http://localhost:3000/) was created as a streamlined solution for storing all of your clunkers and junkers! Do you have more cars than you can count? Have your friends mentioned you might have a problem? Well we have the solution for you, no, this is not an episode of hoarders! It's a comprehensive, easy to maintain car inventory, sales, and mechanic services management web application.

## Key Features

---

### Inventory<br>
- With CarCar you can store all of your vehicles in one place!(and no there is not an overnight storage fee!) <br> Keep vins, makes, models, images, colors and the year of each vehicle together so you no longer need to sift through reams of paper.
### Services<br>
- Have a mechanic business too?<br>
CarCar will help you manage technicians, times of service, and services performed. This will be stored along side the cars information and the customer who brought it in. We know its a VIP if the car was in our inventory before.
### Sales<br>
- ...But wait, there's more!<br>Easily keep track of employees, sales, and yes, even employee's sales. Get rid of that old Incorruptible Cashier and subscribe to CarCar! (only $45.99 a month or save money with our yearly subscription $535/year)


## How To Run It

---

### Requirements:

1. [Python 3](https://www.python.org/downloads/)
2. [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. [VSCode](https://code.visualstudio.com/)

### Start the app:

1. Clone the repository:<br>`git clone https://gitlab.com/leweymelchor/project-beta.git`
2. Change to project diectory:<br>`cd project-beta`
3. Open project<br>`code .`
4. Open Docker app
5. Open VSCode terminal  to top level directory<br>`control + \` `
6. Build docker containers & run:<br>
    `docker-compose up --build`
7. Open in a browser<br> [http://localhost:3000/](http://localhost:3000/)
8. Take a load off and Enjoy, the hard work is over, now it's our turn!


## Archetecture

---

### API Refrerence:
![api diagram](ghi/app/src/images/CarCarAPIs.png)

### Services - Docker
| Service | Image | Notes |
| --- | --- | --- |
| react | node | img tag: 12.2-bullseye |
| | |ports: 3000:3000 |
| database | postgres | img tag: 14.2-bullseye |
| | | ports: 15432:5432 |
| | | volume: beta-data |
| inventory-api | project-beta-inventory-api | ports: 8100:8000 |
| service-api | project-beta-service-api | ports: 8080:8000 |
| service-poller | project-beta-service-poller |  |
| sales-api | project-beta-sales-api | ports: 8090:8000 |
| sales-poller | project-beta-sales-poller |  |

## Design

---

### Inventory
- Input a Vehicle
![Vehicle Input](ghi/app/src/images/Create a Vehicle.png)
http://localhost:8100/api/models/ <br>

    ```{"name": "S800", "picture_url": "https://www.motortrend.com/uploads/sites/5/2020/04/1968-Honda-S800-Restomod-Danny-Wu-40.jpg", "manufacturer_id": 1}```

- Input an Automobile
![Automobile Input](ghi/app/src/images/Create new Automobile.png)<br>
http://localhost:8100/api/automobiles/ <br>
    '''{"color": "red", "year": 2012, "vin": "1C3CC5FB2AN120174", "model_id": 1}'''

- Input a Manufacturer
![Manufacturer Input](ghi/app/src/images/Create a Manufacturer.png)
http://localhost:8100/api/manufacturers/ <br>

    ```{"name": "Honda"}```

- Show a list of Vehicles
![Vehicle List](ghi/app/src/images/Vehicle List.png)
http://localhost:8100/api/models/ <br>

- Show a list of Automobiles
![Automobiles List](ghi/app/src/images/Automobile List.png)
http://localhost:8100/api/automobiles/ <br>

- Show a list of Manufacturers
![Automobiles List](ghi/app/src/images/Manufacturer list.png)
http://localhost:8100/api/manufacturers/ <br>

### Services microservice

- Enter a Technician
![Technician](ghi/app/src/images/Create a Technician.png)
http://localhost:8080/api/techs/ <br>

    ```{"name": "Kurt Lawrence", "employee_number": 40}```

- Enter a Service Appointment
![Service Appointment](ghi/app/src/images/Create an Appointment.png)
http://localhost:8080/api/services/ <br>

    ```{"vin": "ZHWUT4ZF6LLA14649", "owner": "Emilia Seay", "date_time": "2022-10-28 12:00", "tech": 30, "reason": "Tire rotation"}```

- List of Scheduled Service Appointments
![Scheduled Service Appointments](ghi/app/src/images/Service List.png)
http://localhost:8080/api/services/ <br>

- List of Service History on a Specific Vin
![Service History](ghi/app/src/images/Service History.png)
http://localhost:8080/api/services/1  <br>

### Sales microservice

- Add a Sales Rep
![Sales Rep input](ghi/app/src/images/Create a Sales rep.png)
http://localhost:8090/api/sales_rep/ <br>

    '''{
	"name": "Nomar Norman",
	"employee_id": "12"
}'''

- Add a Customer
![Customer Input](ghi/app/src/images/Create a Customer.png)
http://localhost:8090/api/customer/ <br>

    '''{
  "name": "Bargain Bob",
	"address": "123 Sesame St",
	"phone_number": 5672347890
}'''

- Create a Sales Record
![Sales Record Input](ghi/app/src/images/Make a Sale.png)
http://localhost:8090/api/sales/ <br>

    '''{
	"total": 35000,
	"sales_rep": 1,
	"customer": 1,
	"automobile_vo": 1
}'''

- Show a list of Sales
![Vehicle List](ghi/app/src/images/Sales History.png)
http://localhost:8090/api/sales/ <br>

- Show a Sales Reps Performance
![Automobiles List](ghi/app/src/images/Sales Rep History.png)
http://localhost:8090/api/sales_rep_sales/1/ <br>
