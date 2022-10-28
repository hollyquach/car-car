import React from "react";


class VehicleList extends React.Component {
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
            console.log("didmount", Data)
            this.setState({ autos: Data.autos });
        }
    }

    render() {
        // if (Response.ok) {
        if (this.state.autos === undefined) {
            return null;
        }
        console.log("Render", this.state)
        return (
            <div>
                <h1>Vehicle List</h1>
                <table className="table table-striped hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.autos.map(automobile => {
                            return (
                                <tr key={automobile.id}>
                                    <td>{automobile.model.name}</td>
                                    <td>{automobile.model.manufacturer.name}</td>
                                    <td>
                                        <img src={automobile.model.picture_url} alt="car for sale" width="175px" />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default VehicleList;
