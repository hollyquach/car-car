import React from 'react';

/*
    Common Fields
        - VIN
        - Customer Name
        - Date
        - Time
        - Technician
        - Reason
        - Appointments List
        - Cancel >> button (hook)
        - Finished >> button (hook)
    Service History (filtered by VIN)
        - Search >> endpoint >> /api/services?vin=<:vin>
*/

//[] def state.status -> disable finish/cancel button if not pending?
//[] function to filter API list

export default class ServiceList extends React.Component {
//> set inital state for properties
    constructor(props) {
        super(props)
        this.state = {
            status: '',
            appts: [],
        };
    }

//> pull data & set state for list
    async componentDidMount() {
        const apptsURL = 'http://localhost:8080/api/services/'
        const response = await fetch(apptsURL);
        if (response.ok) {
            const data = await response.json();
            this.setState({appts: data.Appointments});
        } else {
            console.log("SERVICE TECH DATA FETCH ERROR")   
        }
    }


//> list definition
    render() {
        if (this.state.appts == undefined) {
            return null;
        }
        console.log("REACT::::", this.state.appts)
        return(
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appts.map(appt => {
                            return (
                                <tr key={appt.href}>
                                    <td>{appt.vin}</td>
                                    <td>{appt.owner}</td>
                                    <td>{new Date(appt.date_time).toLocaleString()}</td>
                                    <td>{appt.tech.name}</td>
                                    <td>{appt.reason}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button className="btn btn-success">Complete</button>
                                            <button className="btn btn-danger">Cancel</button>
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
}
