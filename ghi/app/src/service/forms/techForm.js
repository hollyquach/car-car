import React, { useState } from 'react';

/* Parameters for POST api_list_techs
{
    "name": technician's name,
    "employee_number": the technician's employee number,
}
*/

export default class TechForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_number: '',
        };
    }
//> Event handler for submit -> POST to api
    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)

        const data = { ...this.state };
        console.log("FORM DATA STATE ::::", data);

        const techUrl = 'http://localhost:8080/api/techs/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const response = await fetch(techUrl, fetchConfig);
        if (response.ok) {
            const technician = await response.json();
            console.log("POST tech (JSON) ::::", technician);
            
            const cleared = {
                name: '',
                employee_number: '',
            };
            this.setState(cleared);
            console.log("CLEARED:::", cleared);
        }
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleNumberChange = (event) => {
        this.setState({
            employee_number: event.target.value
        })
    }

    render(){
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create new service technician</h1>
                        <form onSubmit={this.handleSubmit} id="create-technician=form" >
                            <div className="form-floating mb-3">
                                <input placeholder="Name" required type="text" className="name" value={this.state.name} onChange={this.handleNameChange}/>
                            </div>
                            <div className="form-floating mb-3">
                                <input placeholder="Employee #" required type="text" className="employee_number" value={this.state.employee_number} onChange={this.handleNumberChange}/>
                            </div>
                            <input type="submit" id="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};
