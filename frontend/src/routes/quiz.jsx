import { ChevronsLeft, PlusSquare, Trash } from 'lucide-react'
import { Link, useLoaderData, Form } from 'react-router-dom'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

const QUIZAPP_API_URL = import.meta.env.VITE_QUIZAPP_API_URL

export async function loader({ params }) {
  const res = await fetch(`${QUIZAPP_API_URL}/quizzes/${params.quizId}`)
  const quiz = await res.json()

  return { quiz }
}

export default function Quiz() {
  const { quiz } = useLoaderData()
  const { questions } = quiz
  const [questionTitle, setQuestionTitle] = useState('')
  const [questionOptionFields, setQuestionOptionFields] = useState([
    { text: '', is_correct: false },
  ])

  const handleAddQuestionOptionField = () => {
    setQuestionOptionFields([
      ...questionOptionFields,
      { text: '', is_correct: false },
    ])
  }

  const handleDeleteQuestionOptionField = (index) => {
    if (questionOptionFields.length > 1) {
      const newQuestionoptionFields = [...questionOptionFields]
      newQuestionoptionFields.splice(index, 1)

      setQuestionOptionFields(newQuestionoptionFields)
    }
  }

  const handleQuestionOptionChange = (index, event) => {
    const newQuestionoptionFields = [...questionOptionFields]
    newQuestionoptionFields[index].text = event.target.value

    setQuestionOptionFields(newQuestionoptionFields)
  }

  const handleIsCorrectChange = (index, event) => {
    const newQuestionoptionFields = [...questionOptionFields]
    newQuestionoptionFields[index].is_correct = event.target.checked

    setQuestionOptionFields(newQuestionoptionFields)
  }

  const handleQuestionTitleChange = (event) => {
    setQuestionTitle(event.target.value)
  }

  const handleCreateQuestion = async (event) => {
    event.preventDefault()

    const question = {
      title: questionTitle,
      answers: [...questionOptionFields],
      quiz_id: quiz.id,
    }

    await fetch(`${QUIZAPP_API_URL}/quizzes/${quiz.id}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    })

    setQuestionTitle('')
    setQuestionOptionFields([{ text: '', is_correct: false }])

    window.location.reload()
  }

  return (
    <>
      <div>
        <Link to='/' className={buttonVariants({ variant: 'outline' })}>
          <ChevronsLeft className='mr-2 h-5 w-5' />
          Volver
        </Link>
      </div>
      <section className='pt-8'>
        <Card>
          <CardHeader>
            <CardTitle className='mb-2'>{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2'>
            <div className='pr-6 border-r-gray-200 border-r-2'>
              <form
                onSubmit={handleCreateQuestion}
                className='grid w-full gap-y-6'
              >
                <div className='flex flex-col space-y-2'>
                  <Label className='text-base' htmlFor='questionTitle'>
                    Pregunta
                  </Label>
                  <Input
                    type='text'
                    id='questionTitle'
                    name='questionTitle'
                    value={questionTitle}
                    onChange={handleQuestionTitleChange}
                    autoComplete='off'
                    required
                  />
                </div>
                <div className='grid gap-y-6'>
                  {questionOptionFields.map((field, index) => (
                    <div key={index} className='grid gap-y-4'>
                      <div className='flex flex-col space-y-2'>
                        <Label className='text-base' htmlFor='questionOption'>
                          Opción {index + 1}
                        </Label>
                        <Textarea
                          rows='2'
                          value={field.text}
                          onChange={(event) =>
                            handleQuestionOptionChange(index, event)
                          }
                          required
                        />
                      </div>
                      <div className='flex items-center gap-x-6'>
                        <div className='inline-flex items-center space-x-2'>
                          <Input
                            type='checkbox'
                            className='w-4 h-4 cursor-pointer'
                            checked={field.is_correct}
                            onChange={(event) =>
                              handleIsCorrectChange(index, event)
                            }
                          />
                          <Label>Respuesta Correcta</Label>
                        </div>
                        <Button
                          disabled={
                            questionOptionFields.length > 1 ? false : true
                          }
                          type='submit'
                          variant='destructive'
                          onClick={() => handleDeleteQuestionOptionField(index)}
                        >
                          <Trash className='mr-2 w-4 h-4' />
                          Eliminar Opción
                        </Button>
                      </div>
                      <Separator className='mt-6' />
                    </div>
                  ))}
                </div>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleAddQuestionOptionField}
                >
                  <PlusSquare className='mr-2 w-4 h-4' />
                  Agregar Opción
                </Button>
                <Button type='submit'>Confirmar</Button>
              </form>
            </div>
            <div className='pl-6'>
              {questions.length < 1 ? (
                <h3 className='text-2xl font-semibold'>
                  Cuestionario sin contenido para mostrar.
                </h3>
              ) : (
                <div>
                  <h3 className='text-2xl font-semibold mb-4'>
                    Preguntas del Cuestionario
                  </h3>
                  <div>
                    <Accordion type='multiple' className='w-full'>
                      {questions.map((question) => (
                        <AccordionItem
                          value={`item-${question.id + 1}`}
                          key={question.id}
                        >
                          <div>
                            <AccordionTrigger>
                              {question.title}
                            </AccordionTrigger>
                            <Form
                              method='DELETE'
                              className='mb-6'
                              action={`delete/${question.id}`}
                            >
                              <Button type='submit' variant='destructive'>
                                <Trash className='mr-2 h-4 w-4' />
                                Eliminar
                              </Button>
                            </Form>
                          </div>
                          <AccordionContent>
                            <ul className='list-decimal pl-8 grid gap-y-6'>
                              {question.answers.map((answer) => (
                                <li key={answer.id}>
                                  <div className='flex flex-col gap-y-2'>
                                    {answer.text}
                                    {answer.is_correct ? (
                                      <span className='font-semibold text-emerald-600'>
                                        Verdadero
                                      </span>
                                    ) : (
                                      <span className='font-semibold text-red-500'>
                                        Falso
                                      </span>
                                    )}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
