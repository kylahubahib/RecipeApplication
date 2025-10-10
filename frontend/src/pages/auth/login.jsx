import { useState } from "react";
import Button from "../../components/button";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [validationError, setValidationError] = useState({})
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    async function submitLogin(e) {
        e.preventDefault();
        setValidationError(false);
        setError(false);
        setProcessing(true)

        try {
          const res = await api.login({Email: email, Password: password});

          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("currentUser", JSON.stringify(res.data.user));

          navigate('/home');
        } catch (err) {
          if (err.response.data.status == 400) {
            setValidationError(err.response.data.errors);
          } else {
            setError(err.response.data.message + " Please try again."); 
          }
          
        } finally {
          setTimeout(() => {
            setProcessing(false);
          }, 1000)
          
        }
    }

return (
    <div className='bg-[url(/bg-food.png)] min-h-screen flex flex-col justify-center items-center'>
        <div className="w-full bg-[#fbf6e6] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-[#FE5D26] md:text-2xl">
                WELCOME TO MY RECIPE APPLICATION
              </h1>
              <form className="space-y-3 md:space-y-4" onSubmit={submitLogin}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input 
                      type="text" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                      placeholder="name@company.com" 
                      required 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!processing && <label className="text-red-600 text-sm mt-1.5">{validationError.Email}</label>}
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                        required 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    {!processing && <label className="text-red-600 text-sm">{error}</label>}
                  </div>
                    
                  <div>
                    <Button type="submit" title={processing? "Signing in..." : "Sign In"} disabled={processing} className="bg-[#FE5D26] hover:bg-orange-600"/>
                 </div>
                  <p className="text-sm font-light text-gray-500 ">
                      Don’t have an account yet? <Link to={'/register'} className="font-medium text-blue-600 hover:underline ">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
    </div>
)}