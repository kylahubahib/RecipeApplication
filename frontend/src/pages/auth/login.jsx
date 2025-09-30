import { useState } from "react";
import Button from "../../components/button";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function submitLogin(e) {
        e.preventDefault();

        try {
          const res = await api.login({Email: email, Password: password});
          // console.log(res.token);
          localStorage.setItem("authToken", res.token);
          localStorage.setItem("currentUser", JSON.stringify(res.user));
          console.log(res.user)
          navigate('/');
        } catch (err) {
          const errorJson = JSON.parse(err.message.split(" - ")[1]);
          setError(errorJson.message); 
        } 

        console.log(email, " and ", password);
        console.log(error);
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
                        type="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        placeholder="name@company.com" 
                        required 
                         onChange={(e) => setEmail(e.target.value)}
                    />
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
                    <label className="text-red-600">{error}</label>
                  </div>
                    
                  <div>
                    <Button type="submit" title={"Sign In"} className="bg-[#FE5D26] hover:bg-orange-600"/>
                 </div>
                  <p className="text-sm font-light text-gray-500 ">
                      Don’t have an account yet? <Link to={'/register'} className="font-medium text-blue-600 hover:underline ">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
    </div>
)}