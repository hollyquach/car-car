import React from 'react';

/* Parameters for POST api_list_appts
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
*/

export default class ServiceForm extends React.Component {
//> set inital state for properties
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            owner: '',
            date_time: '',
            tech: '',
            reason: '',
            techs: [],
        };
    }


//> submit event handler -> POST to api
    handleSubmit = async (e) => {
        //override GET request
        e.preventDefault();
        const data = { ...this.state };
        
        // props.techs delete -> created to fill form options only // not included in POST
        delete data.techs;

        // define fetch parameters for POST request
        const techUrl = 'http://localhost:8080/api/services/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const response = await fetch(techUrl, fetchConfig);
        if (response.ok) {
            await response.json();
            
            // clear form
            const cleared = {
                vin: '',
                owner: '',
                date_time: '',
                tech: '',
                reason: ''
            };
            this.setState(cleared);
        } else {
            console.log("SERVICE APPT FORM SUBMIT ERROR:", response)
        }
    }


//> state handling for props
    handleVINChange = (event) => {
        this.setState({
            vin: event.target.value
        })
    }
    handleOwnerChange = (event) => {
        this.setState({
            owner: event.target.value
        })
    }
    handleDateTimeChange = (event) => {
        this.setState({
            date_time: event.target.value
        })
    }
    handleTechChange = (event) => {
        this.setState({
            tech: event.target.value
        })
    }
    handleReasonChange = (event) => {
        this.setState({
            reason: event.target.value
        })
    }

//> fetch data for Tech form select options
    async componentDidMount() {
        const url = 'http://localhost:8080/api/techs/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({techs: data.techs});
        } else {
            console.log("SERVICE TECH DATA FETCH ERROR !!")
        }
    }

//> form definition
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h3>Create new service appointment</h3>
                        <form onSubmit={this.handleSubmit} id="create-service-form" >
                            <div className="form-floating mb-3">
                                <input placeholder="Appointment Date & Time" required type="datetime-local" className="form-control" value={this.state.date_time} onChange={this.handleDateTimeChange}/>
                                <label htmlFor="date_time">Appointment Date & Time</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input placeholder="Customer Name" required type="text" className="form-control" value={this.state.owner} onChange={this.handleOwnerChange}/>
                                <label htmlFor="owner">Customer Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input placeholder="VIN" required type="text" className="form-control" value={this.state.vin} onChange={this.handleVINChange}/>
                                <label htmlFor="vin">Vehicle Identification Number (VIN)</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea placeholder="Reason for Service" required className="form-control" value={this.state.reason} onChange={this.handleReasonChange} rows="10"/>
                                <label htmlFor="reason">Reason for Service</label>
                            </div>
                            <div className="form-floating mb-3" >
                                <select required className="form-control" value={this.state.tech} onChange={this.handleTechChange} >
                                    <option value=''>Select Service Tech</option>
                                    {this.state.techs.map(tech => {
                                        return (
                                            <option key={tech.employee_number} value={tech.employee_number}>
                                                {tech.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};