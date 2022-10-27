import React from 'react';

class SalesRepSalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salesRep: '',
            sales: [],
            salesReps: [],
        };
    }

    // handleSalesRepChange = (e) => {
    //     this.setState({
    //         salesRep: e.target.value
    //     })
    // }

    handleSalesRepChange = async (e) => {
        const id = e.target.value;
        console.log("id", id)
        const salesRepSalesResponse = await fetch(`http://localhost:8090/api/sales_rep_sales/${id}`);

        if (salesRepSalesResponse.ok) {
            const salesRepSalesData = await salesRepSalesResponse.json();
            this.setState({ sales: salesRepSalesData.sales })
        }
    }

    async componentDidMount() {
        const salesRepUrl = 'http://localhost:8090/api/sales_rep/';

        const salesRepResponse = await fetch(salesRepUrl);

        if (salesRepResponse.ok) {
            const salesRepData = await salesRepResponse.json();
            this.setState({ salesReps: salesRepData.sales_reps });
        }

    }

    render() {
        console.log("render", this.state.sales)
        return (
            <div className="shadow p-4 mt-4">
                <h1>Sales Rep History</h1>
                <form id="create-sales-form">
                    <div className="mb-3">
                        <select onChange={this.handleSalesRepChange} required name="sales_rep" id="sales_rep" className="form-select" value={this.state.salesRep}>
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
                    {/* <button className="btn btn-primary">Select</button> */}
                </form>
                <h1>Sales History</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sales Rep</th>
                            <th>Employee ID</th>
                            <th>Customer</th>
                            <th>Vin</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.sales_rep.name}</td>
                                    <td>{sale.sales_rep.employee_id}</td>
                                    <td>{sale.customer.name}</td>
                                    <td>{sale.automobile_vo.vin}</td>
                                    <td>{sale.total}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SalesRepSalesList;

//Pseudocode/reminders for tomorrow
// make a Form to select a sales rep
// get the sales history from the sales rep

// use this url to get sales rep data based on sales rep id
// http://localhost:8090/api/sales_rep_sales/2/

// then display a table of data for their sales
// include:
// sales rep
// Customer
// Vin
// sales price/ total

// for react main page
//localhost:3000
// for Inventory admin
//localhost:8100/admin
// for Sales admin
// localhost:8090/admin

// https://gitlab.com/leweymelchor/project-beta.git
