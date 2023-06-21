import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import AddCrewRequest from '../../../Models/AddCrewRequest';

export const AddNewCrew = () => {

    const { authState } = useOktaAuth();

    // New Crew
    const [rank, setRank] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('Dept');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function departmentField(value: string) {
        setDepartment(value);
    }

    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    async function submitNewCrew() {
        const url = `http://localhost:8080/api/admin/secure/add/crew`;
        if (authState?.isAuthenticated && rank !== '' && name !== '' && department !== 'Dept' 
            && description !== '' ) {
                const crew: AddCrewRequest = new AddCrewRequest(rank, name, description, department);
                crew.img = selectedImage;
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(crew)
                };

                const submitNewCrewResponse = await fetch(url, requestOptions);
                if (!submitNewCrewResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                setRank('');
                setName('');
                setDescription('');
                setDepartment('Dept');
                setSelectedImage(null);
                setDisplayWarning(false);
                setDisplaySuccess(true);
            } else {
                setDisplayWarning(true);
                setDisplaySuccess(false);
            }
    }

    return (
        <div className='container mt-5 mb-5'>
            {displaySuccess && 
                <div className='alert alert-success' role='alert'>
                    Crew added successfully
                </div>
            }
            {displayWarning && 
                <div className='alert alert-danger' role='alert'>
                    All fields must be filled out
                </div>
            }
            <div className='card'>
                <div className='card-header'>
                    Add a new crew
                </div>
                <div className='card-body'>
                    <form method='POST'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Rank</label>
                                <input type="text" className='form-control' name='rank' required 
                                    onChange={e => setRank(e.target.value)} value={rank} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Name </label>
                                <input type="text" className='form-control' name='name' required 
                                    onChange={e => setName(e.target.value)} value={name}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Department</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button' 
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {department}
                                </button>
                                <div id='addNewCrewId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <button type='button' onClick={() => departmentField('Elec')} className='dropdown-item'>Elec</button>
                                    <button type='button' onClick={() => departmentField('Deck')} className='dropdown-item'>Deck</button>
                                    <button type='button' onClick={()  => departmentField('E/R')} className='dropdown-item'>E/R</button>
                                    <button type='button' onClick={() => departmentField('Hotel')} className='dropdown-item'>Hotel</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} 
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <input className='form-control'type='file' onChange={e => base64ConversionForImages(e)}/>
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitNewCrew}>
                                Add Crew
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}