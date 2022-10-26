import React, { useState } from 'react';

export default class TechForm extends React.Component{

    Form = (props) => {
        const [ name, setName ] = useState('');
        const [ employee_id, setEmployeeID ] = useState('');

        return (
            <div>
                <form id="form" >
                    <span>Name : <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)}/></span>
                    <span>Employee ID: <input type="text" name="employee_id" value={employee_id} onChange={(event) => setEmployeeID(event.target.value)}/></span>
                    <input type="submit" id="submit"/>
                </form>
            </div>
        )
    }
    
    render() {
        
        return (
            <div className="my-5 container">
            <div className="row">
            <div className="col">
                <div className="card shadow">
                <div className="card-body">
                    <form className="form" id="create-technician-form">
                    <h3 className="card-title">NEW TECHNICIAN FORM PLACEHOLDER</h3>
                    <p className="mb-3">
                        BLAH BLAH BLAH
                    </p>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}