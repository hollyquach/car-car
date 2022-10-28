import React from 'react';

/* Parameters for POST api_list_techs
{
    "name": technician's name,
    "employee_number": the technician's employee number,
}
*/

export default class TechForm extends React.Component {
//> set inital state for properties
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_number: '',
        };
    }

    
//> submit event handler -> POST to api
    handleSubmit = async (e) => {
        //override GET request
        e.preventDefault();
        const data = { ...this.state };

        // define fetch parameters for POST request
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
            await response.json();
            
            // clear form
            const cleared = {
                name: '',
                employee_number: '',
            };
            this.setState(cleared);

        } else {
            console.error("TECHNICIAN FORM SUBMIT ERROR !!")
        }
    }


//> state handling for props
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


//> form definition
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h3>Create new service technician</h3>
                        <form onSubmit={this.handleSubmit} id="create-technician-form" >
                            <div className="form-floating mb-3">
                                <input placeholder="Name" required type="text" className="form-control" value={this.state.name} onChange={this.handleNameChange}/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input placeholder="Name" required type="text" className="form-control" value={this.state.employee_number} onChange={this.handleNumberChange}/>
                                <label htmlFor="employee_number">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};
