export interface IBotQuestion {
    id: number;
    question: string;
    answer: string;
    userInput: string;
    finished: boolean;
    answerRules: {
        regex: RegExp,
        value: string
    }[];
}