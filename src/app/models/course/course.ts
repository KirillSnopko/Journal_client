import { Gradelevel } from "../gradelevel/gradelevel";
import { Lesson } from "../lesson/lesson";

export interface Course {
    id: number;
    studentProfileId: number;

    title: string;
    studentName: string;
    type: string;
    dateOfStart: Date;
    dateOfFinish: Date;
    price: number;
    lessonDuration: number;
    description: string;

    gradeLevel: Gradelevel;
    lessons: Lesson[];
}
