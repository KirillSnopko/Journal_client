export interface LessonMonthlyStat {
    lastCompleted: any;
    lastPaid: any;
    stat: Stat[];
}

export interface Stat {
    date: any;
    totalCount: any;
    totalMoney: any;
}