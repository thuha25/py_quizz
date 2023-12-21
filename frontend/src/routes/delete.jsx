import { redirect } from 'react-router-dom'

const QUIZAPP_API_URL = import.meta.env.VITE_QUIZAPP_API_URL

export async function action({ params }) {
  await fetch(`${QUIZAPP_API_URL}/questions/${params.questionId}`, {
    method: 'DELETE',
  })
  return redirect(`/quizzes/${params.quizId}`)
}
