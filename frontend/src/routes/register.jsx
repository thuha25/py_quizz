import { QuizService } from '../services/quiz_service'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { AuthenticationService } from '../services/auth_service';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const quizService = new QuizService();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    return (
        <>
        <section className='flex flex-col items-center'>
            <form action="" className='flex flex-col gap-5 w-1/2 h-full justify-center' onSubmit={(event) => {
                event.preventDefault();
                if(password !== repassword) {
                    setError("Re-Password doesn't match with Password");
                    return;
                }
                const authService = new AuthenticationService()
                authService.register(email, username, password)
                    .then(data => navigate('/login'))
                    .catch(reason => setError(reason))
            }}>
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>Regiser</h1>
                        <p className='text-muted-foreground'>
                            Create an account
                        </p>
                    </div>
                </div>
                <div className='text-red-500 italic'>
                    {error}
                </div>
                <div className='font-semibold text-lg flex items-center gap-5'>
                    <label htmlFor="email" className='w-36'>Email:</label>
                    <input name='email' type="text" className='font-normal border-2 rounded-lg p-1 w-full' value={email} onChange={(event) => setEmail(event.target.value)} required/>
                </div>
                <div className='font-semibold text-lg flex items-center gap-5'>
                    <label htmlFor="username" className='w-36'>Username:</label>
                    <input name='username' type="text" className='font-normal border-2 rounded-lg p-1 w-full' value={username} onChange={(event) => setUsername(event.target.value)} required/>
                </div>
                <div className='font-semibold text-lg flex items-center gap-5'>
                    <label htmlFor="password" className='w-36'>Password:</label>
                    <input name='password' type="password" className='font-normal border-2 rounded-lg p-1 w-full' value={password} onChange={(event) => setPassword(event.target.value)} required/>
                </div>
                <div className='font-semibold text-lg flex items-center gap-5'>
                    <label htmlFor="repassword" className='w-36'>Re-Password:</label>
                    <input name='repassword' type="password" className='font-normal border-2 rounded-lg p-1 w-full' value={repassword} onChange={(event) => setRepassword(event.target.value)} required/>
                </div>
                <hr />
                <button 
                className='bg-blue-500 rounded p-2 text-white font-bold hover:bg-blue-600 transition-all'>
                    Register
                </button>
                <div className='self-center italic flex gap-2'>
                    Already had an account?
                    <Link
                        to='/login'
                        className='font-semibold text-blue-500 hover:text-blue-600 transition-all'
                    >
                        Login
                    </Link>
                </div>
            </form>
        </section>
        </>
    );
}