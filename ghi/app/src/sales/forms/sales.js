import React from 'react';

class SalesForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: '',
            salesRep: '',
            customer: '',
            automobileVO: '',
            salesReps: [],
            customers: [],
            automobiles: [],
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = { ...this.state };
        data.sales_rep = data.salesRep;
        data.automobile_vo = data.automobileVO;
        delete data.salesRep;
        delete data.automobileVO;
        delete data.salesReps;
        delete data.customers;
        delete data.automobiles;

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            await response.json();

            const cleared = {
                total: '',
                sales_reps: '',
                customer: '',
                automobile_vo: '',
            };
            this.setState(cleared);
        }
    }

    handleTotalChange = (e) => {
        this.setState({
            total: e.target.value
        })
    }

    handleSalesRepChange = (e) => {
        this.setState({
            salesRep: e.target.value
        })
    }

    handleCustomerChange = (e) => {
        this.setState({
            customer: e.target.value
        })
    }

    handleAutomobileVOChange = (e) => {
        this.setState({
            automobileVO: e.target.value
        })
    }

    async componentDidMount() {
        const salesRepUrl = 'http://localhost:8090/api/sales_rep/';
        const customerUrl = 'http://localhost:8090/api/customer/';
        const automobileVOUrl = 'http://localhost:8100/api/automobiles';

        const salesRepResponse = await fetch(salesRepUrl);
        const customerResponse = await fetch(customerUrl);
        const automobileVOResponse = await fetch(automobileVOUrl);

        if (salesRepResponse.ok) {
            const salesRepData = await salesRepResponse.json();
            this.setState({ salesReps: salesRepData.sales_reps });
        }
        if (customerResponse.ok) {
            const customerData = await customerResponse.json();
            this.setState({ customers: customerData.customers });
        }
        if (automobileVOResponse.ok) {
            const automobileData = await automobileVOResponse.json();

            const salesResponse = await fetch("http://localhost:8090/api/sales/");
            if (salesResponse.ok) {
                const Sold = [];
                const notSold = [];
                const salesData = await salesResponse.json();
                console.log(salesData)
                console.log("sold", Sold)
                console.log("not sold", notSold)
                for (let automobile of salesData.sales) {
                    Sold.push(automobile.automobile_vo.vin)
                }
                for (let vehicle of salesData.sales) {
                    if (!Sold.includes(vehicle.vin)) {
                        notSold.push(vehicle)
                    }
                }
                this.setState({ automobiles: notSold })
            }
            this.setState({ automobiles: automobileData.autos });
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h3>Make a Sale</h3>
                        <form onSubmit={this.handleSubmit} id="create-sales-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleTotalChange} placeholder="Total" required type="number" name="total" id="total" className="form-control" value={this.state.total} />
                                <label htmlFor="total">Total</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleSalesRepChange} required name="sales_rep" id="sales_rep" className="form-select" value={this.state.sales_reps}>
                                    <option value="">Choose a sales rep</option>
                                    {this.state.salesReps.map(salesRep => {
                                        return (
                                            <option key={salesRep.id} value={salesRep.id}>
                                                {salesRep.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleCustomerChange} required name="customer" id="customer" className="form-select" value={this.state.customer}>
                                    <option value="">Choose a customer</option>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleAutomobileVOChange} required name="automobile" id="automobile" className="form-select" value={this.state.automobile_vo}>
                                    <option value="">Choose a car</option>
                                    {this.state.automobiles.map(automobile => {
                                        return (
                                            <option key={automobile.id} value={automobile.id}>
                                                {automobile.model.name}
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

export default SalesForm;
