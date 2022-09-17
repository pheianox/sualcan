import { Component, createSignal } from "solid-js";
import { questions } from "./data";
import { IQuestion, IResult } from "./types";
import { BiSolidAward, BiSolidCheckCircle, BiSolidTime } from 'solid-icons/bi'


export const Quiz: Component<{ questions: IQuestion[] }> = props => {
    const [questoinIndex, setQuestionIndex] = createSignal(0);
    const isLastQuestion = () => questoinIndex() >= props.questions.length - 1
    const question = () => props.questions[questoinIndex()]

    const [answerIndex, setAnswerIndex] = createSignal(-1);
    const isAnswered = () => answerIndex() > -1

    const [result, setResult] = createSignal<IResult | null>(null)

    let correctCount = 0
    let startedAt = -1

    start()

    function start() {
        setQuestionIndex(0)
        setAnswerIndex(-1)
        setResult(null)
        correctCount = 0
        startedAt = Date.now()
    }

    function next() {
        if (question().answer.correctIndex === answerIndex()) {
            correctCount++
        }
        if (isLastQuestion()) {
            const timeSpent = Date.now() - startedAt
            setResult(x => ({
                correctCount,
                incorrectCount: questions.length - correctCount,
                questionCount: questions.length,
                totalTimeSpentInMs: timeSpent
            }))
        } else {
            setAnswerIndex(-1);
            setQuestionIndex(i => i + 1);
        }
    }

    function millisToMinutesAndSeconds(millis: number) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (Number(minutes) < 10 ? '0' : '') + minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
    }

    function getLevelStatus(ratio: number) {
        if (ratio <= 20) {
            return "zəif"
        }

        if (ratio <= 50) {
            return "qənaətbəxş"
        }

        if (ratio <= 70) {
            return "yaxşı"
        }

        return "super"
    }

    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <div class="card max-w-96 bg-base-100 shadow-xl relative">
                        {result() && <div class="absolute grid place-items-center jusitfy-center bg-base-100 z-50 top-0 left-0 w-full h-full card w-96 bg-base-100 shadow-xl">
                            <div class="flex flex-col gap-5 items-start">
                                <h2 class="card-title text-center">Nəticə</h2>
                                <div class="flex flex-col gap-4">
                                    <div class="flex gap-2 items-center">
                                        <BiSolidCheckCircle size={20} fill="green" /> <span>{(result() as IResult).correctCount} / {(result() as IResult).questionCount}</span>
                                    </div>
                                    <div class="flex gap-2 items-center">
                                        <BiSolidAward size={20} fill="gold" /><span>{getLevelStatus((result() as IResult).correctCount / (result() as IResult).questionCount * 100)}</span>
                                    </div>
                                    <div class="flex gap-2 items-center">
                                        <BiSolidTime size={20} fill="primary" /><span>{millisToMinutesAndSeconds((result() as IResult).totalTimeSpentInMs)}</span>
                                    </div>

                                </div>
                                <button class="btn btn-sm btn-primary self-center" onclick={start}>Yenidən</button>
                            </div>
                        </div>}
                        <progress class="mb-4 progress progress-primary w-full" value={questoinIndex() + 1} max={props.questions.length}></progress>
                        <ul class="menu bg-base-100 w-full p-8 gap-1 text-left rounded-box">
                            <h2 class="card-title text-center mb-6"> {question().title}</h2>
                            {question().answer.options.map((option, index) =>
                                <li classList={{ "pointer-events-none": isAnswered() }} onclick={setAnswerIndex.bind(null, index)}>
                                    <a
                                        classList={{
                                            "pointer-events-none": isAnswered(),
                                            "active": answerIndex() == index,
                                            "bg-success": isAnswered() && question().answer.correctIndex === index,
                                            "opacity-50": isAnswered() && answerIndex() != index && question().answer.correctIndex !== index,
                                            "bg-error": isAnswered() && answerIndex() == index && question().answer.correctIndex !== index,
                                        }}
                                        class="active:bg-base-300 transition duration-100ms font-regular flex justify-between"
                                    >
                                        {option}
                                    </a>
                                </li>)}
                        </ul> <div class="px-8 pb-8 gap-4 card-actions justify-end items-center">
                            <span class="text-sm text-accent">{questoinIndex() + 1} / {props.questions.length}</span>
                            <button class="btn btn-primary" onclick={next} disabled={!isAnswered()}>{isLastQuestion() ? "Bitir" : "Növbəti"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

