import CrewModel from "../../../Models/CrewModel";
import { useOktaAuth } from '@okta/okta-react';

export const EraseCrew: React.FC<{ crew: CrewModel, deleteCrew: any }> = (props, key) => {
    
    const { authState } = useOktaAuth();      

    async function deleteCrew() {
        const url = `http://localhost:8080/api/admin/secure/delete/crew?crewId=${props.crew?.id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const updateResponse = await fetch(url, requestOptions);
        if (!updateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        props.deleteCrew();
    }
    
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.crew.img ?
                            <img src={props.crew.img} width='123' height='196' alt='Crew' />
                            :
                            <img src={require('./../../../Images/crew-default-img.jpg')} 
                                width='123' height='196' alt='Crew' />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                        {props.crew.img ?
                            <img src={props.crew.img} width='123' height='196' alt='Crew' />
                            :
                            <img src={require('./../../../Images/crew-default-img.jpg')} 
                                width='123' height='196' alt='Crew' />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>{props.crew.name}</h5>
                        <h4>{props.crew.name}</h4>
                        <p className='card-text'> {props.crew.description} </p>
                    </div>
                </div>
               
                
                   
                <div className='mt-3 col-md-1'>
                    <div className='d-flex justify-content-start'>
                        <button className='m-1 btn btn-md btn-danger' onClick={deleteCrew}>Delete</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}