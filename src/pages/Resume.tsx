import { Link } from "react-router-dom";

const Resume = () => {
  return (
    <main className="pt-0">
        <nav className="resume-nav">
            <Link to="/" className="back-button">
            <img
             src="/icons/back.svg"
             alt="back"
             className="w-2.5 h-2.5" 
             />
             <span className="text-gray-800 text-sm font-semibold">
                Back to Homepage
             </span>
            </Link>
        </nav>
    </main>
  )
}
export default Resume