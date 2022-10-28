import React from "react";


class SalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allSalesList: [],
        }
    }

    async componentDidMount() {
        const allSalesUrl = 'http://localhost:8090/api/sales/';

        const allSalesResponse = await fetch(allSalesUrl);

        if (allSalesResponse.ok) {
            const allSalesData = await allSalesResponse.json();
            this.setState({ sales: allSalesData.sales });
        }
    }

    render() {
        // if (Response.ok) {
        if (this.state.sales === undefined) {
            return null;
        }
        return (
            <div>
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
            </div>
        );
    }
}
// }
export default SalesList;
