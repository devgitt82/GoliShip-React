import { useState } from 'react';
import { AddNewCrew } from './components/AddNewCrew';
import { RemoveCrew } from './components/RemoveCrew';
import { AdminMessages } from './components/AdminMessages';
import { useOktaAuth } from '@okta/okta-react';
import { Navigate } from 'react-router-dom';

export const AdminPage = () => {

    
    const {authState} = useOktaAuth();
    const [removeCrewClick, setRemoveCrewClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);

    function addCrewClickFunction() {
        setRemoveCrewClick(false);
        setMessagesClick(false);
    }

    function removeCrewClickFunction() {
        setRemoveCrewClick(true);
        setMessagesClick(false);
    }

    function messagesClickFunction() {
        setRemoveCrewClick(false);
        setMessagesClick(true);
    }

    if (authState?.accessToken?.claims?.userType !== 'admin') {
        return <Navigate to='/home'/>
    }

    return (
        <div className='container'>
            <div className='mt-5'>
                <h3>Manage Crew</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button onClick={addCrewClickFunction} className='nav-link active' id='nav-add-book-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-add-crew' type='button' role='tab' aria-controls='nav-add-crew' 
                            aria-selected='false'
                        >
                            Add New
                        </button>
                        <button onClick={removeCrewClickFunction} className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity' 
                            aria-selected='true'
                        >
                            Remove
                        </button>
                        <button onClick={messagesClickFunction} className='nav-link' id='nav-messages-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-messages' type='button' role='tab' aria-controls='nav-messages' 
                            aria-selected='false'
                        >
                            Messages
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'> 
                    <div className='tab-pane fade show active' id='nav-add-crew' role='tabpanel'
                        aria-labelledby='nav-add-book-tab'>
                           <AddNewCrew/>
                    </div>
                    <div className='tab-pane fade' id='nav-quantity' role='tabpanel' aria-labelledby='nav-quantity-tab'>
                       {removeCrewClick ? <RemoveCrew/> : <></>}
                    </div>
                    <div className='tab-pane fade' id='nav-messages' role='tabpanel' aria-labelledby='nav-messages-tab'>
                        {messagesClick ? <AdminMessages/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}