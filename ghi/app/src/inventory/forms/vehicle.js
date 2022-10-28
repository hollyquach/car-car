import React from 'react';

class VehicleForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            pictureUrl: '',
            manufacturerID: '',
            manufacturers: [],
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = { ...this.state };
        data.picture_url = data.pictureUrl;
        data.manufacturer_id = data.manufacturerID;
        delete data.pictureUrl;
        delete data.manufacturerID;
        delete data.manufacturers;

        const vehicleUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(vehicleUrl, fetchConfig);
        if (response.ok) {
            const newVehicle = await response.json();
            console.log(newVehicle);  // is this one okay Holly?

            const cleared = {
                name: '',
                pictureUrl: '',
                manufacturerID: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handlePictureUrlChange = (e) => {
        this.setState({
            pictureUrl: e.target.value
        })
    }

    handleManufacturerIDChange = (e) => {
        this.setState({
            manufacturerID: e.target.value
        })
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ manufacturers: data.manufacturers });
        }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h3>Create a Vehicle</h3>
                        <form onSubmit={this.handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={this.state.name} />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePictureUrlChange} placeholder="Picture url" required type="text" name="picture_url" id="picture_url" className="form-control" value={this.state.pictureUrl} />
                                <label htmlFor="picture_url">Image</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleManufacturerIDChange} required name="manufactuer_id" id="manufactuer_id" className="form-select" value={this.state.manufacturerID}>
                                    <option value="">Choose a manufacturer</option>
                                    {this.state.manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
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
        );
    }
}

export default VehicleForm;
