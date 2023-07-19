import { Topic } from "../topic/topic";

export interface LessonCreate {
    courseId: number;
    topics: Topic[];
    task: string;
    description: string;
    date: any;
    price: number;
    lessonDuration: number;
}
