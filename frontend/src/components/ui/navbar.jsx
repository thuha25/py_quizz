import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/user_context";
import { AuthenticationService } from "../../services/auth_service";
import { Link } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const [user, setUser] = useUser()
    function handleLogout(event) {
        const authService = new AuthenticationService();
        authService.logout().then(data => {
            navigate('/login')
            setUser(null)
        })
    }
    return <div className="h-20 shadow-lg bg-white flex justify-between items-center px-12">
        <div className="text-slate-800 text-xl font-bold">
            Insert your title here
        </div>
            {user != null 
            ?
            (
                <div className="flex gap-5 items-center">
                    <div className="text-lg font-semibold">
                        Hello, {user.username}
                    </div>
                    <button className="bg-red-500 text-white border-2 border-red-500 p-2 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-all" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )
            :
            (
                <div className="flex gap-5 items-center">
                    <Link
                        to='/login'
                        className='font-semibold text-blue-500 hover:text-blue-600 transition-all'
                    >
                        Login
                    </Link>
                </div>
            )
            }
    </div>
}

export default Navbar;