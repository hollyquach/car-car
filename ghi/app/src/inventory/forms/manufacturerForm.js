import React from 'react';

export default class MfgForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
        };
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...this.state };

        const mfgURL = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(mfgURL, fetchConfig);
        if (response.ok) {
            await response.json();
            this.setState({name: ''});
        } else {
            console.error("MANUFACTURER FORM SUBMIT ERROR !!")
        }
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h3 className="card-title">Create new Manufacturer</h3>
                        <form onSubmit={this.handleSubmit} className="form" id="create-manufacturer-form">
                            <div className="form-floating mb-3">
                                <input placeholder="name" name="name" required type="name" className="form-control" value={this.state.name} onChange={this.handleNameChange}/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}