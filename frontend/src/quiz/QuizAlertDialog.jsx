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
      title: 'Exit!',
      description: 'Deleted test successfully!',
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
          <AlertDialogTitle>Delete this test?</AlertDialogTitle>
          <AlertDialogDescription>
            After confirmation, the test will be deleted permanently
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={handleDeleteQuiz}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
