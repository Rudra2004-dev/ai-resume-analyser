import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Auth = () => {

  const{
    loading,
    user,
    //signWithGoogle,
    signIn,
    signUp,
    signOut
  } = useAuth();

  const location = useLocation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const next = 
    new URLSearchParams(location.search)
    .get("next") || "/";

    useEffect(() => {
      if(user) {
        navigate(next);
      }
    }, [user, next, navigate]);
  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover bg-center px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl rounded-[40px] p-4 bg-white/20 backdrop-blur-md border-white/30 shadow-2xl">
        <section className="flex flex-col items-center rounded-4xl bg-white/70 py-20 px-6">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gradient">Welcome</h1>
            <p className="text-gray-600 mt-3 text-lg">Log In to Continue Your Job Journey</p>
            <div className="flex flex-col gap-4">
              <input 
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded-xl"
               />

               <input 
               type="password"
               placeholder="Enter your password"
               value={password}
               onChange={(e) => setPassword(e.target.value)} 
               className="border p-3 rounded-xl"/>
            </div>
          </div>
          <div>
            {loading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : (

              <>
              {user ? (

                <button 
                className="w-full mt-6 rounded-full bg-linear-to-r from-purple-500 to-blue-500 py-4 text-white font-semibold shadow-lg hover:opacity-90 transition"
                onClick={signOut}
                >
                  <p>Log Out</p>
                </button>
              ) : (
                <>
                <button
                className="auth-button"
                onClick={() => 
                signIn(email, password)}>
                  <p>Log In</p>
                </button>
                <p className="mt-8 text-center text-gray-500">
                  Don't have an account?
                  <span
                  className="text-blue-500 font-medium cursor-pointer ml-1"
                  onClick={() => {
                    console.log(email, password);
                    signUp(email, password)}}
                  >
                    Sign Up
                  </span>
                </p>
              </>
            )}
            </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
export default Auth