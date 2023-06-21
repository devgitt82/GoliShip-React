import { useEffect, useState } from 'react';
import CommentModel from '../../../Models/CommentModel';
import { Pagination } from '../../utils/Pagination';
import { Comment} from '../../utils/Comment';
import { SpinnerLoading } from '../../utils/SpinnerLoading';

export const CommentListPage = () => {

    const [comments, setComments] = useState<CommentModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(5);
    const [totalAmountOfComments, setTotalAmountOfComments] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Crew to lookup comments
    const crewId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchCrewCommentsData = async () => {

            const commentUrl: string = `http://localhost:8080/api/comments/search/findByCrewId?crewId=${crewId}&page=${currentPage - 1}&size=${commentsPerPage}`;

            const responseComments = await fetch(commentUrl);

            if (!responseComments.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonComments = await responseComments.json();

            const responseData = responseJsonComments._embedded.comments;

            setTotalAmountOfComments(responseJsonComments.page.totalElements);
            setTotalPages(responseJsonComments.page.totalPages);

            const loadedComments: CommentModel[] = [];

            for (const key in responseData) {
                loadedComments.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    crew_id: responseData[key].crew_id,
                    commentDescription: responseData[key].commentDescription,
                });
            }

            setComments(loadedComments);
            setIsLoading(false);
        };
        fetchCrewCommentsData().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [currentPage, commentsPerPage, crewId]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }


    const indexOfLastComment: number = currentPage * commentsPerPage;
    const indexOfFirstComment: number = indexOfLastComment - commentsPerPage;

    let lastItem = commentsPerPage * currentPage <= totalAmountOfComments ? 
            commentsPerPage * currentPage : totalAmountOfComments;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <div className="container mt-5">
            <div>
                <h3>Comments: ({comments.length})</h3>
            </div>
            <p>
                {indexOfFirstComment + 1} to {lastItem} of {totalAmountOfComments} items:
            </p>
            <div className="row">
                {comments.map(comment => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>

            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );
}
