import { redirect } from 'react-router-dom'
import { QuizService } from '../services/quiz_service'

const quizService = new QuizService()

export async function action({ params }) {
  await quizService.deleteQuestion(params.questionId);
  return redirect(`/quizzes/${params.quizId}`)
}
