import { Link } from "react-router-dom";


export const Header = () => {
    return (
        <header className='p-5 mb-4 bg-dark header'>
            <div className='container-fluid py-5 text-white d-flex justify-content-center align-items-center'>
                <div>
                    <h5 className='display-3 fw-bold'>Welcome to Goli Ship </h5>
                    <p className='col-md-8 fs-1'>Do you want to see who is currently on board?</p>
                    <Link type='button' className='btn btn-danger btn-lg text-white' to='/search'>Check crew list</Link>
                </div>
            </div>
        </header>
    );
}