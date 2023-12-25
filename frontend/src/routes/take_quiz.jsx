import { useLoaderData } from "react-router-dom"
import { QuizService } from "../services/quiz_service"
import { useState } from "react"
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect } from "react"
import { useMemo } from "react"

const quizService = new QuizService()

export async function loader({ params }) {
    const quiz = await quizService.getQuizById(params.quizId)
    return { quiz }
}

function SubmitDialog(params) {
    const [open, setOpen] = useState(false)

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button>
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you want to submit your answers?</DialogTitle>
          <DialogDescription>
            Remeber to check your answers before submitting.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-5 w-full">
            <Button className="w-full" onClick={() => setOpen(false)}>
                Cancel
            </Button>
            <Button className="w-full" onClick={() => {
                params.onConfirm()
                setOpen(false);
            }}>
                Confirm
            </Button>
        </div>
       </DialogContent>
    </Dialog>
}

export default function TakeQuiz() {
    const { quiz } = useLoaderData()
    const [index, setIndex] = useState(0)
    const [answers, setAnswers] = useState({})
    const [end, setEnd] = useState(false)
    const question = quiz.questions[index];
    const [corrects, setCorrects] = useState(null)
    useEffect(() => {
        if(!end)
            return;
        var _corrects = Object.assign([], corrects)
        quiz.questions.forEach((question, id) => {
            var correct_index = question.answers.findIndex(answer => answer.is_correct)
            var answered_index = answers[id]
            _corrects[id] = {
                "correct": correct_index,
                "answer": answered_index,
                "is_correct": correct_index == answered_index
            }
        });
        setCorrects(_corrects)
        console.log(_corrects)
    }, [end])
    return <>
        {
            end && corrects != null
            ?
            <div className="w-full h-[calc(80vh)] rounded-xl border-2 border-slate-400 flex gap-5 p-5">
                <div className="w-1/3 grid grid-cols-5 gap-5 overflow-y-auto">
                    {
                        quiz.questions.map((question, qIndex) => (
                            index == qIndex
                            ?  
                            <button className="rounded border-2 border-blue-500 text-white bg-blue-500 aspect-square flex items-center justify-center text-lg font-bold">
                                {qIndex + 1}
                            </button>
                            :
                            corrects[qIndex].answer != undefined
                            ?
                            (
                                corrects[qIndex].is_correct 
                                ?
                                <button className="rounded border-2 border-green-500 text-slate-800 bg-white aspect-square flex items-center justify-center text-lg font-bold hover:border-green-800 transition-all" onClick={() => setIndex(qIndex)}>
                                    {qIndex + 1}
                                </button>
                                :
                                <button className="rounded border-2 border-red-500 text-slate-800 bg-white aspect-square flex items-center justify-center text-lg font-bold hover:border-red-800 transition-all" onClick={() => setIndex(qIndex)}>
                                    {qIndex + 1}
                                </button>
                            )
                            :
                            <button className="rounded border-2 border-gray-500 text-slate-800 bg-white aspect-square flex items-center justify-center text-lg font-bold hover:border-gray-800 transition-all" onClick={() => setIndex(qIndex)}>
                                {qIndex + 1}
                            </button>
                        ))
                    }
                </div>
                <div className="w-2/3 flex flex-col gap-5">
                    <p className="border-2 rounded-lg border-slate-300 h-1/3 text-lg font-semibold text-slate-800 p-5 overflow-y-auto">
                        <p className="font-bold text-slate-500">Question: </p>
                        {question.title}
                    </p>
                    <div className="border-2 rounded-lg border-slate-300 h-1/2 flex flex-col p-5 gap-5 overflow-y-auto">
                        {question.answers.map(
                            (answer, id) => 
                            id == corrects[index].correct
                            ?
                                <div className="w-full rounded p-2 border-2 border-green-500 hover:border-green-400 transition-all">
                                    {answer.text}
                                </div>
                            :
                            id == corrects[index].answer && corrects[index].answer != corrects[index].correct
                            ?
                            <div className="w-full rounded p-2 border-2 border-red-500 hover:border-red-400 transition-all">
                                {answer.text}
                            </div>
                            :
                            <div className="w-full rounded p-2 border-2 border-gray-200 hover:border-gray-400 transition-all">
                                {answer.text}
                            </div>
                        )}
                    </div>
                    <div className="border-2 rounded-lg border-slate-300 h-1/6 flex flex-col p-5 gap-5 overflow-y-auto text-lg font-semibold">
                        You got {corrects.reduce((prev, correct) => prev + (correct.is_correct ? 1 : 0), 0)}/{corrects.length} corrected answers
                    </div>
                </div>
            </div>
            :
            // Taking test
            <div className="w-full h-[calc(80vh)] rounded-xl border-2 border-slate-400 flex gap-5 p-5">
                <div className="w-1/3 grid grid-cols-5 gap-5 overflow-y-auto">
                    {
                        quiz.questions.map((question, qIndex) => (
                            index == qIndex
                            ?  
                            <button className="rounded border-2 border-blue-500 text-white bg-blue-500 aspect-square flex items-center justify-center text-lg font-bold">
                                {qIndex + 1}
                            </button>
                            :
                            answers[qIndex] != undefined
                            ? 
                            <button className="rounded border-2 border-blue-500 text-slate-800 bg-white aspect-square flex items-center justify-center text-lg font-bold hover:border-blue-800 transition-all" onClick={() => setIndex(qIndex)}>
                                {qIndex + 1}
                            </button>
                            :
                            <button className="rounded border-2 border-gray-500 text-slate-800 bg-white aspect-square flex items-center justify-center text-lg font-bold hover:border-gray-800 transition-all" onClick={() => setIndex(qIndex)}>
                                {qIndex + 1}
                            </button>
                        ))
                    }
                </div>
                <div className="w-2/3 flex flex-col gap-5">
                    <p className="border-2 rounded-lg border-slate-300 h-1/3 text-lg font-semibold text-slate-800 p-5 overflow-y-auto">
                        <p className="font-bold text-slate-500">Question: </p>
                        {question.title}
                    </p>
                    <div className="border-2 rounded-lg border-slate-300 h-1/2 flex flex-col p-5 gap-5 overflow-y-auto">
                        {question.answers.map(
                            (answer, id) => 
                            answers[index] != undefined && answers[index] == id ? 
                            <button className="w-full rounded p-2 border-2 border-blue-500 hover:border-blue-500-400 transition-all">
                                {answer.text}
                            </button>
                            :
                            <button className="w-full rounded p-2 border-2 border-gray-200 hover:border-gray-400 transition-all" onClick={() => {
                                var new_answers =  Object.assign({}, answers)
                                new_answers[index] = id;
                                setAnswers(new_answers);
                            }}>
                                {answer.text}
                            </button>
                        )}
                    </div>
                    <SubmitDialog onConfirm={() => setEnd(true)}/>
                </div>
            </div>
        }
        
    </>
}