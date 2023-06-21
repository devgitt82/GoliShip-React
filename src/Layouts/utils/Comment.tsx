import CommentModel from "../../Models/CommentModel";
import { StarsRating } from "./StarsRating";

export const Comment: React.FC<{ comment: CommentModel }> = (props) => {
    
    const date = new Date(props.comment.date);

    const dateDay = date.getDate();
    const longMonth = date.toLocaleString('en-us', { month: 'long' });    
    const dateYear = date.getFullYear();

    const dateRender = dateDay + ' ' + longMonth + ', ' + dateYear;
    
    return (
        <div>
            <div className='col-sm-8 col-md-8'>
                <h5>{props.comment.userEmail}</h5>
                <div className='row'>
                    <div className='col'>
                        {dateRender}
                    </div>
                    <div className='col'>
                        <StarsRating rating={props.comment.rating} size={16} />
                    </div>
                </div>
                <div className='mt-2'>
                    <p>
                        {props.comment.commentDescription}
                    </p>
                </div>
            </div>
            <hr/>
        </div>
    );
}