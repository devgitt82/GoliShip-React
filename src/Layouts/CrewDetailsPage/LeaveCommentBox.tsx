import CrewModel from "../../Models/CrewModel";
import { LeaveAComment } from "../utils/LeaveAComment";

export const LeaveCommentBox: React.FC<{ crew: CrewModel | undefined, mobile: boolean, 
    isAuthenticated: any,  isCommentLeft: boolean, submitComment: any }> = (props) => {


    function CommentBoxRender() {
        if (props.isAuthenticated && !props.isCommentLeft) {
            return(
            <div>
                <LeaveAComment submitComment={props.submitComment}/>
            </div>
            )
        } else if (props.isAuthenticated && props.isCommentLeft) {
            return(
            <p>
                <b>Thank you for your comment!</b>
            </p>
            )
        }
        return (
        <div>
            <hr/>
            <p>Sign in to be able to leave a comment.</p>
        </div>
        )
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>               
                {CommentBoxRender()}
            </div>
        </div>
    );
}