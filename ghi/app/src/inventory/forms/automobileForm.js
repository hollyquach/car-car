import React from 'react';

export default class AutomobileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '',
            year: '',
            vin: '',
            model_id: '',
            modelopts: [],
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = { ...this.state };
        delete data.modelopts;
        console.log("DATA:::::", data)

        const autoURL = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(autoURL, fetchConfig);
        if (response.ok) {
            const newauto = await response.json();
            console.log("POST RESPONSE:::", newauto);  // is this one okay Holly?

            const cleared = {
                color: '',
                year: '',
                vin: '',
                model: '',
            };
            this.setState(cleared);
        }
    }

    // pulling data for model select options
    async componentDidMount() {
        const modelsURL = `http://localhost:8100/api/models/`
        const response = await fetch(modelsURL);
        const data = await response.json();
        this.setState({modelopts: data.models})
    }

    handleVINChange = (event) => {
        this.setState({
            vin: event.target.value
        })
    }
    handleModelChange = (event) => {
        this.setState({
            model_id: event.target.value
        })
    }
    handleYearChange = (event) => {
        this.setState({
            year: event.target.value
        })
    }
    handleColorChange = (event) => {
        this.setState({
            color: event.target.value
        })
    }

    render() {
        return (
            <div className="my-5 container">
                <div className="row">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} className="form" id="create-automobile-form">
                                    <h3 className="card-title">Create new Automobile</h3>
                                    <div className="mb-3">
                                        <select name="model" required className="form-control" value={this.state.model_id} onChange={this.handleModelChange} >
                                            <option value=''>Choose a model</option>
                                            {this.state.modelopts.map(opt => {
                                                return (
                                                    <option key={opt.id} value={opt.id}>
                                                        {opt.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input placeholder="Year" name="year" required type="number" className="form-control" value={this.state.year} onChange={this.handleYearChange}/>
                                        <label htmlFor="year">Year</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input placeholder="Color" name="color" required type="text" className="form-control" value={this.state.color} onChange={this.handleColorChange}/>
                                        <label htmlFor="color">Color</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input placeholder="VIN" name="vin" required type="text" className="form-control" value={this.state.vin} onChange={this.handleVINChange}/>
                                        <label htmlFor="vin">Vehicle Identification Number (VIN)</label>
                                    </div>
                                    <button className="btn btn-primary">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}