import { Button } from '@/components/ui/button'
import { PlusSquare } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

const QUIZAPP_API_URL = import.meta.env.VITE_QUIZAPP_API_URL

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000))

export function QuizDialog({ getQuizzes }) {
  const [titleInput, setTitleInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const handleCreateQuiz = async (event) => {
    wait().then(() => setOpen(false))

    event.preventDefault()

    await fetch(`${QUIZAPP_API_URL}/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titleInput,
        description: descriptionInput,
      }),
    })

    setTitleInput('')
    setDescriptionInput('')

    toast({ title: 'Exito!', description: 'Cuestionario creado exitosamente.' })

    getQuizzes()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusSquare className='mr-2 h-4 w-4' />
          Agregar Cuestionario
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Cuestionario</DialogTitle>
          <DialogDescription>
            Pon a prueba el conocimiento de tus usuarios.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateQuiz} className='grid gap-y-4'>
          <Input
            name='title'
            id='title'
            placeholder='Titulo del Cuestionario'
            autoComplete='off'
            required
            value={titleInput}
            onChange={(event) => setTitleInput(event.target.value)}
          />
          <Textarea
            name='description'
            id='description'
            rows='6'
            className='resize-none'
            placeholder='Descripcíon del Cuestionario'
            required
            value={descriptionInput}
            onChange={(event) => setDescriptionInput(event.target.value)}
          />
          <Button type='submit'>Confirmar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
