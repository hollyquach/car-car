import React, { useState, useEffect } from 'react';

export default function ServiceList() {
    //> set state for list & get data
    const [appts, setAppts] = useState([]);
    const [searchVIN, setSearchVIN] = useState('');
    const [displayAll, setDisplayAll] = useState(false);

    useEffect(() => {
        setSearchVIN('');
        getData()
    }, []);


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
            console.error("STATUS UPDATE ERROR");
        }
        getData();
    }

    //> handling getting data, includes logic with url parameter to filter list
    const getData = async () => {
        try {
            const url = 'http://localhost:8080/api/services/'
            const response = await fetch(url);
            let data = await response.json();
            setAppts(data.Appointments);
        } catch {
            console.error("ERROR FETCH MFGS DATA !!")
        }
    }

    const handleClear = () => {
        setSearchVIN('');
        setDisplayAll(false);
    }

    const handleSearch = () => {
        setDisplayAll(true);
    }

    //> list definition
    return (
        <div>
            <h3 className="my-3">Service Appointments</h3>
            <div className="input-group my-3">
                <input type="text" name="search" className="form-control" value={searchVIN} onChange={(event) => setSearchVIN(event.target.value)} />
                <div className="input-group-append">
                    <button className="btn btn-secondary" onClick={handleSearch}>Search</button>
                    <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
                </div>
            </div>
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
                    </tr>
                </thead>
                <tbody>
                    {appts.filter(appt => displayAll === true ? appt.vin === searchVIN : appt.status === "PENDING").map(appt => {
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
                                <td>
                                    <div className="btn-group">
                                        <button className="btn btn-success btn-sm" onClick={() => changeStatus(appt.id, "FINISHED")}>Finished</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => changeStatus(appt.id, "CANCELLED")}>Cancel</button>
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
