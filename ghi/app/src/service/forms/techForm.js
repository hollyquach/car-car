import React, { useState }  from 'react';
import { Alert, Spinner } from 'react-bootstrap';

/* Parameters for POST api_list_techs
{
    "name": technician's name,
    "employee_number": the technician's employee number,
}
*/

export default function TechForm() {
//> set inital state for properties
    const [tech, setTech] = useState({
        name: "",
        employee_number: "",
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    
//> submit event handler -> POST to api
    const handleSubmit = async (e) => {
        setLoading(true);
        //override GET request
        e.preventDefault();
        console.log("TECH DATA::::", tech)
        // define fetch parameters for POST request
        const techUrl = 'http://localhost:8080/api/techs/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(tech),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(techUrl, fetchConfig);

        if (response.ok) {
            await response.json();
            setTech({
                name: "",
                employee_number: "",
            });
            setSuccess(true);
            window.setTimeout(()=>{setSuccess(false)}, 5000);
        } else {
            console.error("TECHNICIAN FORM SUBMIT ERROR !!")
        }
        setLoading(false);
    }

//> change handler -> update tech properties to form values
    const handleChange = (event) => {
        setTech({
          ...tech,
          [event.target.name]: event.target.value
        });
      };

//> form definition
    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h3>Create new service technician</h3>
                    <form id="create-technician-form" >
                        <div className="form-floating mb-3">
                            <input placeholder="Name" required type="text" className="form-control" name="name" value={ tech.name } onChange={ handleChange } />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Employee Number" required type="text" className="form-control" name="employee_number" value={ tech.employee_number } onChange={ handleChange }/>
                                <label htmlFor="employee_number">Employee Number</label>
                        </div>
                        <div className="d-inline"> 
                            <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
                            { loading ? <Spinner as="span" animation="border" className="mx-2" size="sm" role="status" aria-hidden="true"/> : ""}
                            <Alert variant="success" className="text-center my-3" show={ success }>
                                technician created!
                            </Alert>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
};
