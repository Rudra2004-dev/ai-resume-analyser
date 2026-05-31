import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const Auth = () => {

  const{
    loading,
    user,
    signWithGoogle,
    signOut
  } = useAuth();

  const location = useLocation();

  const navigate = useNavigate();

  const next = 
    new URLSearchParams(location.search)
    .get("next") || "/";

    useEffect(() => {
      if(user) {
        navigate(next);
      }
    }, [user, next, navigate]);
  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue Your Job Journey</h2>
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
                className="auth-button"
                onClick={signOut}
                >
                  <p>Log Out</p>
                </button>
              ):(
                
                <button 
                className="auth-button"
                onClick={signWithGoogle}
                >
                <p>Log In</p>
                </button>
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