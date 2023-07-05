import { Student } from "./student";

export class Profile {
    public id: number = 0;
    public student: Student = new Student();
    public level: number = 0;
    public description: string = "";
    public studentMobile: string = "";
    public parentName: string = "";
    public parentMobile: string = "";
    public courses: InnerCourse[] = [];

    public countLesson: number = 0;
    public countUnpaid: number = 0;
}

export interface InnerCourse {
    id: number;
    title: string;
    existUnpaid: boolean;
}
