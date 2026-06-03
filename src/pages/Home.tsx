import {resumes} from "../constants"
import Navbar from "../components/Navbar";
import ResumeCard from "../components/ResumeCard";
import bgMain from "/images/bg-main.svg"

const Home = () => {
  return (
    <main className="bg-cover bg-center main-h-screen"
    style={{backgroundImage: `url(${bgMain})`}}
    >
        <Navbar/>
        <section className="main-section">
            <div className="page-heading">
                <h1 className="text-2xl bg-white p-4">Track Your Applications & Resume Ratings</h1>
                <h2>Review your submissions and check your AI-powered feedback</h2>
            </div>
        {resumes.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume}/>
            ))}
          </div>
        )}
        </section>
    </main>
  )
}
export default Home