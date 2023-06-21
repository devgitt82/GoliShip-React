class CommentModel {
    id: number;
    userEmail: string;
    date: string;
    rating: number;
    crew_id: number;
    commentDescription: string;

    constructor(id: number,  userEmail: string, date: string,  rating: number, crew_id: number, commentDescription: string) {
        this.id = id;
        this.userEmail = userEmail;
        this.date = date;
        this.rating = rating;
        this.crew_id = crew_id;
        this.commentDescription = commentDescription;
    }
}

export default CommentModel;