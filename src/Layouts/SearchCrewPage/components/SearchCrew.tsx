import { Link } from "react-router-dom";
import CrewModel from "../../../Models/CrewModel"

export const SearchCrew: React.FC<{ crew: CrewModel }> = (props) => {
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.crew.img ?
                            <img src={props.crew.img}
                                width='123'
                                height='196'
                                alt='crew'
                            />
                            :
                            <img src={require('../../../Images/crew-default-img.jpg')}
                                width='123'
                                height='196'
                                alt='crew'
                            />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                        {props.crew.img ?
                            <img src={props.crew.img}
                                width='123'
                                height='196'
                                alt='crew'
                            />
                            :
                            <img src={require('../../../Images/crew-default-img.jpg')}
                                width='123'
                                height='196'
                                alt='crew'
                            />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.crew.rank}
                        </h5>
                        <h4>
                            {props.crew.name}
                        </h4>
                        <p className='card-text'>
                            {props.crew.description}
                        </p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <Link className='btn btn-md btn-success text-white' to={`/details/${props.crew.id}`}>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}