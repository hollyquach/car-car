import React, { useState, useEffect } from 'react';

export default function ServiceList() {
//> set state for list & get data
    const [appts, setAppts] = useState([]);
    const [searchVIN, setSearchVIN] = useState('');
    const [searchBar, setSearchBar] = useState('');

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
    const getData = async (params) => {
        let urlParam = `/`
        if (params !== undefined) {
            urlParam = `?vin=${params.searchVIN}`
        }
        try {
            let url = `http://localhost:8080/api/services${urlParam}`
            const response = await fetch(url);
            let data = await response.json();
            
            if (data.Appointments.length === 0) {
                url = 'http://localhost:8080/api/services/'
                const response = await fetch(url);
                data = await response.json();
            }
            setAppts(data.Appointments);
        } catch {
            console.log("ERROR FETCH MFGS DATA !!")
        }
    }


    //> list definition
    return (
        <div>
            <h3 className="my-3">Service Appointments</h3>
            <div className="input-group my-3">
                <input type="text" name="search" className="form-control" value={searchBar} onChange={(event) => setSearchVIN(event.target.value) & setSearchBar(event.target.value)}/>
                <div className="input-group-append">
                    <button className="btn btn-secondary" onClick={() => getData({searchVIN})}>Search</button>
                    <button className="btn btn-secondary" onClick={() => {setSearchVIN(''); setSearchBar(''); getData()}}>Clear</button>
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