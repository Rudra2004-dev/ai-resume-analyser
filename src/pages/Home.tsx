import Navbar from "../components/Navbar";
import bgMain from "../design/images/bg-main.svg"

const Home = () => {
  return (
    <main className="bg-cover bg-center main-h-screen"
    style={{backgroundImage: `url(${bgMain})`}}
    >
        <Navbar/>
        <section className="main-section">
            <div className="page-heading">
                <h1>Track Your Applications & Resume Ratings</h1>
                <h2>Review your submissions and check your AI-powered feedback</h2>
            </div>
        </section>
    </main>
  )
}
export default Home