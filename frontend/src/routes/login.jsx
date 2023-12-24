import { QuizService } from '../services/quiz_service'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { AuthenticationService } from '../services/auth_service';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/user_context';

export default function Login() {
    const quizService = new QuizService();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [user, setUser] = useUser()
    const navigate = useNavigate()
    return (
        <>
        <section className='flex flex-col items-center'>
            <form action="" className='flex flex-col gap-5 w-1/2 h-full justify-center' onSubmit={(event) => {
                event.preventDefault();
                const authService = new AuthenticationService()
                authService.login(email, password)
                    .then(data => {
                        setUser(data.result.user)
                        console.log(data);
                        navigate("/");
                    })
                    .catch(reason => setError(reason))
            }}>
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>Login</h1>
                        <p className='text-muted-foreground'>
                            Please provide your email and password
                        </p>
                    </div>
                </div>
                <div className='text-red-500 italic'>
                    {error}
                </div>
                <div className='font-semibold text-lg flex items-center gap-5'>
                    <label htmlFor="email" className='w-24'>Email:</label>
                    <input name='email' type="text" className='font-normal border-2 rounded-lg p-1 w-full' value={email} onChange={(event) => setEmail(event.target.value)} required/>
                </div>
                <div className='font-semibold text-lg flex items-center gap-5'>
                    <label htmlFor="password" className='w-24'>Password:</label>
                    <input name='password' type="password" className='font-normal border-2 rounded-lg p-1 w-full' value={password} onChange={(event) => setPassword(event.target.value)} required/>
                </div>
                <hr />
                <button 
                className='bg-blue-500 rounded p-2 text-white font-bold hover:bg-blue-600 transition-all'>
                    Login
                </button>
                <div className='self-center italic flex gap-2'>
                    Don't have an account?
                    <Link
                        to='/register'
                        className='font-semibold text-blue-500 hover:text-blue-600 transition-all'
                    >
                        Create one
                    </Link>
                </div>
            </form>
        </section>
        </>
    );
}