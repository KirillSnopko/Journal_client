import { Topic } from "../topic/topic";
export interface LessonUpdate {
    topics: Topic[];
    task: string;
    description: string;
    date: Date;

    isPaid: boolean;
    price: number;
    dateOfPayment: Date;
    lessonDuration: number;

    isPrepared: boolean;
    isTaskGiven: boolean;
    isCompleted: boolean;
    isCanceled: boolean;

    gradeHome: number;
    gradeLesson: number;
}

