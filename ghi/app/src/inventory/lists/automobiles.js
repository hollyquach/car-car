import React from "react";


class AutomobilesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            autos: [],
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/automobiles';

        const response = await fetch(url);

        if (response.ok) {
            const Data = await response.json();
            this.setState({ autos: Data.autos });
        }
    }

    render() {
        // if (Response.ok) {
        if (this.state.autos === undefined) {
            this.setState({ autos: [], });
        }
        return (
            <div>
                <h3 className="my-3">Automobiles List</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vin</th>
                            <th>Color</th>
                            <th>Year</th>
                            <th>Model</th>
                            <th>Manufacturer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.autos.map(automobile => {
                            return (
                                <tr key={automobile.id}>
                                    <td>{automobile.vin}</td>
                                    <td>{automobile.color}</td>
                                    <td>{automobile.year}</td>
                                    <td>{automobile.model.name}</td>
                                    <td>{automobile.model.manufacturer.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default AutomobilesList;
