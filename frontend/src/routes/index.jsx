import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { QuizAlertDialog } from '../quiz/QuizAlertDialog'
import { QuizDialog } from '../quiz/QuizDialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'

const QUIZAPP_API_URL = import.meta.env.VITE_QUIZAPP_API_URL

export default function Index() {
  const [quizzes, setQuizzes] = useState([])

  const getQuizzes = async () => {
    const res = await fetch(`${QUIZAPP_API_URL}/quizzes`)
    const quizzes = await res.json()

    setQuizzes(quizzes)
  }

  useEffect(() => {
    getQuizzes()
  }, [])

  return (
    <>
      <header className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Cuestionarios</h1>
          <p className='text-muted-foreground'>
            ¡Ve la lista de los cuestionarios creados!
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
                  <TableHead>Cuestionario</TableHead>
                  <TableHead className='w-0'>Administrar</TableHead>
                  <TableHead className='w-0'>Eliminar</TableHead>
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
