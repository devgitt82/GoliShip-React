import { Link } from "react-router-dom";
import { Comment } from "../utils/Comment";
import CommentModel from "../../Models/CommentModel";

export const LatestComments: React.FC<{
    comments: CommentModel[], crewId: number | undefined, mobile: boolean
}> = (props) => {

    return (
        <div className={props.mobile ? 'mt-3' : 'row mt-5'}>
            <div className={props.mobile ? '' : 'col-sm-2 col-md-2'}>
                <h2>Latest Comments: </h2>
            </div>
            <div className='col-sm-10 col-md-10'>
                {props.comments.length > 0 ?
                    <>
                        {props.comments.slice(0, 3).map(eachComment => (
                           <Comment comment={eachComment} key={eachComment.id}></Comment>
                        ))}    
                        <div className='m-3'>
                            <Link type='button' className='btn btn-primary btn-md text-white'
                                to={`/commentslist/${props.crewId}`}>
                                Reach all comments.
                            </Link>
                        </div>                    
                    </>
                    :
                    <div className='m-3'>
                        <p className='lead'>
                            Currently there are no comments
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}