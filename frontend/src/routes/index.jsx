import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="h-[calc(20vh)] text-6xl font-bold text-slate-700 flex flex-col items-center justify-center gap-5">
          Welcome to PyQuiz
          <div className="font-semibold text-lg text-slate-500">
            A place where you can test yourself
          </div>
        </div>
        <hr />
        <div className="flex gap-5 h-[calc(50vh)]">
          <div className="w-1/2 h-full rounded-xl border-2 border-slate-400 flex flex-col gap-5 items-center p-5">
            <img src="https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg?w=996" alt="" className="h-1/2 w-auto aspect-auto object-contain" />
            <p>
              You believe in your skills? Try your luck now!
            </p>
            <Link
              to="/quizzes"
              className="bg-blue-500 text-white font-bold p-2 rounded-xl hover:bg-blue-400 transition-all"
            >
              Take some test
            </Link>
          </div>
          <div className="w-1/2 h-full rounded-xl border-2 border-slate-400 flex flex-col gap-5 items-center p-5">
            <img src="https://st2.depositphotos.com/2247023/8143/v/600/depositphotos_81432308-stock-illustration-employment-on-competitive-basis-filling.jpg" alt="" className="h-1/2 w-auto aspect-auto object-contain"/>
            <p>
              You want to challenge the others? Make yourself a creator now!
            </p>
            <Link
              to="/register"
              className="bg-red-500 text-white font-bold p-2 rounded-xl hover:bg-red-400 transition-all"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
