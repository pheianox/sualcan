export interface IQuestion {
    title: string
    category: string
    answer: IAnswer
}

export interface IAnswer {
    correctIndex: number
    options: string[]
}

export interface IResult {
    questionCount: number
    correctCount: number,
    incorrectCount: number,
    totalTimeSpentInMs: number
}

