import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const QUIZAPP_API_URL = import.meta.env.VITE_QUIZAPP_API_URL

export function QuizAlertDialog({ quizId, getQuizzes }) {
  const { toast } = useToast()

  const handleDeleteQuiz = async () => {
    await fetch(`${QUIZAPP_API_URL}/quizzes/${quizId}`, {
      method: 'DELETE',
    })

    toast({
      title: 'Exito!',
      description: 'Cuestionario eliminado exitosamente.',
    })

    getQuizzes()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='icon'>
          <Trash className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar Cuestionario?</AlertDialogTitle>
          <AlertDialogDescription>
            Esto eliminara de manera permanente el cuestionario.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={handleDeleteQuiz}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
