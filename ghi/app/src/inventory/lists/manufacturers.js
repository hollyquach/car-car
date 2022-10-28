import React, { useEffect, useState } from 'react';

export default function Manufacturers() {
    const[ mfgs, setMFGs ] = useState ([]);

    const getData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            setMFGs(data.manufacturers);
        } else {
            console.error("ERROR FETCHING MFGS DATA !!")    
        }
    }
    useEffect(() => {getData()}, []);

    return (
        <>
            <h3 className="my-3">Manufacturers List</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {mfgs.map(mfg=> {
                        return (
                            <tr key={mfg.href}>
                                <td>{mfg.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}
