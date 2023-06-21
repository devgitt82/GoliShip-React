class CommentRequestModel {
    rating: number;
    crewId: number;
    commentDescription?: string;

    constructor(rating: number, crewId: number, commentDescription: string) {
        this.rating = rating;
        this.crewId = crewId;
        this.commentDescription = commentDescription;
    }
}

export default CommentRequestModel;