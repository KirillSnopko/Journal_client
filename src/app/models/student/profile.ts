export class Profile {
    public id: number = 0;
    public name: string = "";
    public age: number = 0;
    public level: number = 0;
    public description: string = "";
    public studentMobile: string = "";
    public parentName: string = "";
    public parentMobile: string = "";
    public courses: InnerCourse[] = [];
}

export interface InnerCourse {
    id: number;
    title: string;
    existUnPaid: boolean;
}
