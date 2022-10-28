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

    handleSalesRepChange = async (e) => {
        const id = e.target.value;
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
        return (
            <div className="shadow p-4 mt-4">
                <h3 className="my-3">Sales Rep History</h3>
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
                <h3 className="my-3">Sales History</h3>
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
