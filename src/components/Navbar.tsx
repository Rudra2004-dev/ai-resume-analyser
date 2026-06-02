import {Link} from "react-router-dom"
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const {user, signOut} = useAuth();
  return (
    <nav className="navbar">
        <Link to= "/">
        <p className="text-2xl font-bold text-gradient">Resumyser</p>
        </Link>
        {
          user ? (
            <button
            onClick={signOut}
            className="primary-button w-fit"
            >
              Logout
            </button>
          ) : (
            <Link
            to="/auth"
            className="primary-button w-fit"
            >
              Login
            </Link>
          )
        }
        
    </nav>
  )
}
export default Navbar