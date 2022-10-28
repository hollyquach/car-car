import React, { useState, useEffect } from 'react';

export default function ServiceList() {
//> set state for list & get data
    const [appts, setAppts] = useState([]);
    useEffect(() => { getData() }, [])


//> handling for list buttons to change status 
    const changeStatus = async (id, status) => {
        const url = `http://localhost:8080/api/services/${id}/`

        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify({ "status": status }),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            await response.json();
        } else {
            console.log("STATUS UPDATE ERROR");
        }
        getData();
    }


//> pull data & set state for list
    const getData = async () => {
        const apptsURL = 'http://localhost:8080/api/services/'
        const response = await fetch(apptsURL);
        if (response.ok) {
            const data = await response.json();
            setAppts(data.Appointments);
        } else {
            console.log("SERVICE TECH DATA FETCH ERROR")
        }
    }


    //> list definition
    return (
        <div>
            <h3 className="my-3">Service Appointments</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>VIP</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appts.map(appt => {
                        if (appt.vip === true) {
                            appt.vip = "⭐"
                        } else {
                            appt.vip = ""
                        }
                        return (
                            <tr key={appt.href}>
                                <td>{appt.vin}</td>
                                <td>{appt.vip}</td>
                                <td>{appt.owner}</td>
                                <td>{new Date(appt.date_time).toLocaleDateString()}</td>
                                <td>{new Date(appt.date_time).toLocaleTimeString()}</td>
                                <td>{appt.tech.name}</td>
                                <td>{appt.reason}</td>
                                <td>{appt.status}</td>
                                <td>
                                    <div className="btn-group">
                                        <button className="btn btn-success btn-sm" onClick={() => changeStatus(appt.id, "FINISHED")} disabled={appt.status !== "PENDING"}>Finished</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => changeStatus(appt.id, "CANCELLED")} disabled={appt.status !== "PENDING"}>Cancel</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
 
}