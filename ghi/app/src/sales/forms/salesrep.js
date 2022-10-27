import React from 'react';

class SalesRepForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employeeID: '',
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = { ...this.state };
        data.employee_id = data.employeeID;
        delete data.employeeID;

        const salesRepUrl = 'http://localhost:8090/api/sales_rep/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salesRepUrl, fetchConfig);
        if (response.ok) {
            const newSalesRep = await response.json();
            console.log(newSalesRep);

            const cleared = {
                name: '',
                employee_id: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleEmployeeIDChange = (e) => {
        this.setState({
            employeeID: e.target.value
        })
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a sales rep</h1>
                        <form onSubmit={this.handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={this.state.name} />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEmployeeIDChange} placeholder="Employee ID" required type="number" name="employee_id" id="employee_id" className="form-control" value={this.state.employee_id} />
                                <label htmlFor="employee_id">Employee ID</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesRepForm;
