import React, { useParams } from 'react';

export default function Manufacturers() {
    // > non-functional draft!
    return (
        <><h3>PLACEHOLDER FOR MANUFACTURERS LIST</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {props.mfgs.map(mfg=> {
                        return (
                            <tr key={mfg.href}>
                                <td>{mfg.name}</td>
                            </tr>
                        );
                    })} */}
                </tbody>
            </table>
        </>
    )
    console.log("MFGLIST::::::")
}