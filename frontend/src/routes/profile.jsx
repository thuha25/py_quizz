import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { QuizAlertDialog } from '../quiz/QuizAlertDialog'
import { QuizDialog } from '../quiz/QuizDialog'
import { QuizService } from '../services/quiz_service'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { useUser } from '../context/user_context';
import { useNavigate } from 'react-router-dom'

const quiz_service = new QuizService();

const QUIZAPP_API_URL = import.meta.env.VITE_QUIZAPP_API_URL

export default function Profile() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [user, setUser] = useUser();
  const getQuizzes = () => {
    quiz_service.getQuizzesByUser(user).then(
      quizzes => {
        setQuizzes(quizzes)
      }
    )
  }
  useEffect(() => {
    if(user == -1)
      navigate("/login")
    if(!user)
      setQuizzes([])
    getQuizzes()
  }, [user])

  return (
    <>
      <header className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Your tests</h1>
          <p className='text-muted-foreground'>
            The list of the tests you created
          </p>
        </div>
        <div>
          <QuizDialog getQuizzes={getQuizzes} />
        </div>
      </header>
      <section className='pt-8'>
        <Card>
          <CardContent className='pt-6'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tests</TableHead>
                  <TableHead className='w-0'>Edit</TableHead>
                  <TableHead className='w-0'>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell>{quiz.title}</TableCell>
                    <TableCell>
                      <Link
                        to={`/quizzes/${quiz.id}`}
                        className={buttonVariants({
                          variant: 'default',
                          size: 'icon',
                        })}
                      >
                        <Settings className='h-4 w-4' />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <QuizAlertDialog
                        quizId={quiz.id}
                        getQuizzes={getQuizzes}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
