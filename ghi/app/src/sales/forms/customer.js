import React from 'react';

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = { ...this.state };
        data.phone_number = data.phoneNumber;
        delete data.phoneNumber;

        const customerUrl = 'http://localhost:8090/api/customer/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);

            const cleared = {
                name: '',
                address: '',
                phoneNumber: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleAddressChange = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    handlePhoneNumberChange = (e) => {
        this.setState({
            phoneNumber: e.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new customer</h1>
                        <form onSubmit={this.handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={this.state.name} />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleAddressChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" value={this.state.address} />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePhoneNumberChange} placeholder="Phone number" required type="text" name="phone_number" id="phone_number" className="form-control" value={this.state.phoneNumber} />
                                <label htmlFor="phone_number">Phone number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerForm;
