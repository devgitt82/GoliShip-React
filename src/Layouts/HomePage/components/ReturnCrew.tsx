import { Link } from "react-router-dom"
import CrewModel from "../../../Models/CrewModel"

export const ReturnCrew: React.FC<{crew:CrewModel}> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {props.crew.img ? <img src={props.crew.img}
                    width='151'
                    height='233'
                    alt='crew'>
                </img>:
                
                <img src={require('./../../../Images/crew-default-img.jpg')}
                    width='151'
                    height='233'
                    alt='crew'>
                </img>
                }
                <h6 className="mt-2"> {props.crew.rank}</h6>
                <p>{props.crew.name}</p>                
                <Link className="btn btn-primary text-white" to={`../details/${props.crew.id}`}>See more</Link>
            </div>
        </div>
    )
}