class AddCrewRequest {
    rank: string;
    name: string;
    description: string;
    department: string;
    img?: string;

    constructor(rank: string, name: string, description: string, department: string) {
            this.rank = rank;
            this.name = name;
            this.description = description;
            this.department = department;
        }
}
export default AddCrewRequest;