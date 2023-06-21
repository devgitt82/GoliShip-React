class CrewModel {
    id: number;
    rank: string;
    name?: string;
    description?: string;
    department?: string;
    img?: string;

    constructor(id: number,  rank: string, name: string, description: string, department: string, img: string) {
        this.id = id;
        this.rank = rank;
        this.name = name;
        this.description = description;
        this.department = department;
        this.img = img;
    }
}
export default CrewModel;