import { useState, useEffect } from "react";
import { QuizService } from "../services/quiz_service";
import { Card, CardContent } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const quiz_service = new QuizService();

function EnterDialog(params) {
    const [open, setOpen] = useState(false)

    var quiz = params.quiz;

    const navigate = useNavigate()

    return quiz.questions.length == 0 ?
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    Enter
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Can't enter {quiz.title}</DialogTitle>
                    <DialogDescription>
                        This test have no question !!!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-5 w-full">
                    <Button className="w-full" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
        :
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    Enter
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter {quiz.title}?</DialogTitle>
                    <DialogDescription>
                        Desciption: {quiz.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-5 w-full">
                    <Button className="w-full" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button className="w-full" onClick={() => navigate(`/take-quiz/${quiz.id}`)}>
                        Enter
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
}

export default function Quiz() {
    const [quizzes, setQuizzes] = useState([])
    const [filter, setFilter] = useState(null);
    useEffect(() => {
        if (filter)
            quiz_service.getQuizzes(filter).then(quizzes => setQuizzes(quizzes))
        else
            quiz_service.getQuizzes().then(quizzes => setQuizzes(quizzes))
    }, [filter])
    return (
        <>
            <header className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold'>Quizzes</h1>
                    <p className='text-muted-foreground'>
                        Explore the the test created by the community
                    </p>
                </div>
            </header>
            <section className='pt-8'>
                <div className="flex rounded-md shadow-sm">
                    <input
                        type="text"
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                        className="w-full px-4 py-3 my-7 text-sm focus:outline-2 focus:outline-blue-500 border border-gray-300 rounded-md"
                        placeholder="Search quizzes..."
                    />
                </div>
                <Card>
                    <CardContent className='pt-6'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tests</TableHead>
                                    <TableHead className='w-1/4'>Author</TableHead>
                                    <TableHead className='w-1/4'>Take the test</TableHead>
                                </TableRow>
                            </TableHeader>
                            {quizzes.map(quiz => (
                                <TableRow key={quiz.id}>
                                    <TableCell className="font-semibold">
                                        {quiz.title}
                                    </TableCell>
                                    <TableCell>
                                        {quiz.author?.username ?? "Random guy"}
                                    </TableCell>
                                    <TableCell>
                                        <EnterDialog quiz={quiz} />
                                        {/* <Dialog>

                                    </Dialog>
                                    <Link
                                        className="bg-blue-500 text-white font-bold p-2 rounded-xl hover:bg-blue-400 transition-all"
                                    >
                                        Enter
                                    </Link> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>
                    </CardContent>
                </Card>
            </section>
        </>
    );
}