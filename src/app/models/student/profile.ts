export class Profile {
    public student: any;
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
    existUnpaid: boolean;
}
