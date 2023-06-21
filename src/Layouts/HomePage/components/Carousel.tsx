import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CrewModel from "../../../Models/CrewModel";
import { ReturnCrew } from "./ReturnCrew";
import { SpinnerLoading } from "../../utils/SpinnerLoading";

export const Carousel = () => {

    const [crewMembers, setCrewMembers] = useState<CrewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => { 
        const fetchCrew = async () => {
            const baseUrl: string = "http://localhost:8080/api"            
            const url: string = `${baseUrl}/crew?page=0&size=9`;
            
            const response = await fetch(url );

            if (!response.ok) {
                throw new Error('Something went wrong in carousel!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.crew;
            const loadedCrewMembers: CrewModel[] = [];

            for (const key in responseData) {
                loadedCrewMembers.push({
                    id: responseData[key].id,
                    rank: responseData[key].rank,
                    name: responseData[key].name,
                    description: responseData[key].description,                    
                    department: responseData[key].department,
                    img: responseData[key].img,
                });
            }

            setCrewMembers(loadedCrewMembers);
            setIsLoading(false);

        };
        
        fetchCrew().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

    }, []);

    if (isLoading){
        return(
            <SpinnerLoading/>
        )
    }

    if (httpError){
        return(
            <div className="container m-2">
                <p>{httpError}</p>                
            </div>
        )
    }

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>This is our team! </h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-ride="carousel" data-bs-interval='4000'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {crewMembers.slice(0,3).map( crew => (
                            <ReturnCrew crew={crew} key = {crew.id}/>))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                        {crewMembers.slice(3,6).map( crew => (
                            <ReturnCrew crew={crew} key = {crew.id}/>))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                        {crewMembers.slice(6,9).map( crew => (
                            <ReturnCrew crew={crew} key = {crew.id}/>))}
                        </div>
                    </div>
                </div>
                <button className='carousel-control-prev' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <ReturnCrew crew={crewMembers[0]} key={crewMembers[0].id}/>
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link className="btn btn-outline-secondary btn-lg " to="/search">View more</Link>
            </div>
        </div>
    );
}