import { useEffect, useState } from "react";
import CrewModel from "../../Models/CrewModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { StarsRating } from "../utils/StarsRating";
import CommentModel from "../../Models/CommentModel";
import { LatestComments } from "./LatestComments";
import { useOktaAuth } from "@okta/okta-react";
import CommentRequestModel from "../../Models/CommentRequestModel";
import { LeaveCommentBox } from "./LeaveCommentBox";
import { useParams } from "react-router-dom";

export const CrewDetailsPage = () => {
    
    
    const { authState } = useOktaAuth();

    console.log(authState?.accessToken);
    const [crew, setCrew] = useState<CrewModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Comment State
   const [comments, setComments] = useState<CommentModel[]>([])
   const [totalStars, setTotalStars] = useState(0);
   const [isLoadingComment, setIsLoadingComment] = useState(true);

   const [isCommentLeft, setIsCommentLeft] = useState(false);
   const [isLoadingUserComment, setIsLoadingUserComment] = useState(true);

   
   const { crewId } = useParams(); 

    useEffect(() => {
        const fetchCrew = async () => {
            const baseUrl: string = `http://localhost:8080/api/crew/${crewId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went incredibly wrong!');
            }

            const responseJson = await response.json();

            const loadedCrewMember: CrewModel = {
                id: responseJson.id,
                rank: responseJson.rank,
                name: responseJson.name,
                description: responseJson.description,
                department: responseJson.department,
                img: responseJson.img,
            };

            setCrew(loadedCrewMember);
            setIsLoading(false);
        };
        fetchCrew().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [crewId]);


    useEffect(() => {
        const fetchCrewComments = async () => {
            const reviewUrl: string = `http://localhost:8080/api/comments/search/findByCrewId?crewId=${crewId}`;

            const responseComments = await fetch(reviewUrl);

            if (!responseComments.ok) {
                throw new Error('Something went super wrong!');
            }

            const responseJsonReviews = await responseComments.json();

            const responseData = responseJsonReviews._embedded.comments;

            const loadedComments: CommentModel[] = [];

            let weightedStarComments: number = 0;

            for (const key in responseData) {
                loadedComments.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    crew_id: responseData[key].crewId,
                    commentDescription: responseData[key].commentDescription,
                });
                weightedStarComments = weightedStarComments + responseData[key].rating;
            }

            if (loadedComments) {
                const round = (Math.round((weightedStarComments / loadedComments.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setComments(loadedComments);
            setIsLoadingComment(false);
        };

        fetchCrewComments().catch((error: any) => {
            setIsLoadingComment(false);
            setHttpError(error.message);
        })
    }, [isCommentLeft, crewId]);

    useEffect(() => {
        const fetchUserLeftComment = async () => {
            if (authState?.isAuthenticated) {
                const url = `http://localhost:8080/api/comments/secure/user/crew?crewId=${crewId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const userComment = await fetch(url,requestOptions);
                if (!userComment.ok) {
                    throw new Error('Something went very wrong');
                }
                const userReviewResponseJson = await userComment.json();
                setIsCommentLeft(userReviewResponseJson);
            }
            setIsLoadingUserComment(false);
        }
        fetchUserLeftComment().catch((error: any) => {
            setIsLoadingUserComment(false);
            setHttpError(error.message);
        })
    }, [crewId, authState?.accessToken?.accessToken, authState?.isAuthenticated]);

    if (isLoading || isLoadingComment || isLoadingUserComment) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    async function submitComment(starInput: number, commentDescription: string) {
        let crewId: number = 0;
        if (crew?.id) {
            crewId = crew.id;
        }

        const commentRequestModel = new CommentRequestModel(starInput, crewId, commentDescription);
        const url = `http://localhost:8080/api/comments/secure`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentRequestModel)
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setIsCommentLeft(true);
    }
    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {crew?.img ?
                            <img src={crew?.img} width='226' height='349' alt='Crew' />
                            :
                            <img src={require('./../../Images/crew-default-img.jpg')} width='226'
                                height='349' alt='Crew' />}
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{crew?.rank}</h2>
                            <h5 className='text-primary'>{crew?.name}</h5>
                            <p className='lead'>{crew?.description}</p>
                            <StarsRating rating={totalStars} size={32} />
                        </div>
                    </div>
                    <LeaveCommentBox crew={crew} mobile={false} isAuthenticated={authState?.isAuthenticated} 
                     isCommentLeft={isCommentLeft} submitComment={submitComment}/>
                </div>                
                <hr />
                <LatestComments comments={comments} crewId={crew?.id} mobile={false} />
            </div>
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center alighn-items-center'>
                    {crew?.img ?
                        <img src={crew?.img} width='226' height='349' alt='Crew' />
                        :
                        <img src={require('./../../Images/crew-default-img.jpg')} width='226'
                            height='349' alt='Crew' />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{crew?.rank}</h2>
                        <h5 className='text-primary'>{crew?.name}</h5>
                        <p className='lead'>{crew?.description}</p>
                        <StarsRating rating={totalStars} size={32} />
                    </div>
                    <LeaveCommentBox crew={crew} mobile={true} isAuthenticated={authState?.isAuthenticated} 
                     isCommentLeft={isCommentLeft} submitComment={submitComment}/>
                </div>
                <hr />
                <LatestComments comments={comments} crewId={crew?.id} mobile={true} />
            </div>
        </div>
    );
}