import React from "react";


class SalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allSalesList: [],
        }
    }

    //     async function loadSales() {
    //     const response = await fetch('http://localhost:8090/api/sales/');
    //     if (response.ok) {
    //         const data = await response.json();
    //         root.render(
    //             <React.StrictMode>
    //                 <App sales={data.sales} />
    //             </React.StrictMode>
    //         );
    //     } else {
    //         console.error(response);
    //     }
    // }
    // loadSales();

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
        console.log("HERE", this.state)
        return (
            <div>
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
// }
export default SalesList;
