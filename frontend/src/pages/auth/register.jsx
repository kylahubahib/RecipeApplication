import { useState } from "react";
import Button from "../../components/button";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
 import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
    const [validationError, setValidationError] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [confirmPass, setConfirmPass] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function submitRegistration(e) {
      e.preventDefault();
      setValidationError(false);
      setError(false);
      setProcessing(true);

      if(password != confirmPass) {
          setError("Password doesn't match. Please try again");
          return;
      }

      try {
        const res = await api.register({FullName: fullname, Email: email, Password: password});

        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        alert("Successfully registered! Welcome to my recipe application");
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
        }, 500)
      }
         
    }

return (
    <div className='bg-[url(/bg-food.png)] min-h-screen flex justify-center items-center space-x-10'>
      
        <ToastContainer />
        <div className="w-full bg-[#f7f5ee] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-4 space-y-2 md:space-y-5 sm:p-8">
              <h1 className=" text-lg font-bold leading-tight text-center tracking-tight text-[#FE5D26] md:text-2xl">
                USER REGISTRATION
              </h1>
              <form className="space-y-2 md:space-y-3" onSubmit={submitRegistration}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Enter your Fullname</label>
                    <input 
                      type="text" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2" 
                      placeholder="Juan Dela Cruz" 
                      required 
                        onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Enter your email</label>
                    <input 
                      type="text" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2" 
                      placeholder="name@company.com" 
                      required 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!processing && <label className="text-red-600 text-sm mt-1.5">{validationError.Email}</label>}
                  </div>
                  <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 ">Enter your password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 " 
                      required 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {!processing && <label className="text-red-600 text-sm/tight mt-1.5">{validationError.Password}</label>}
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                        required 
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                  </div>
                  <div>
                    {!processing &&<label className="text-red-600">{error}</label>}
                  </div>
                  <div>
                    <Button type="submit" title={processing ? "Registering..." : "Register"} disabled={processing} className="bg-[#FE5D26] hover:bg-orange-600 w-full mt-2"/>
                 </div>
                    <p className="text-sm font-light text-gray-500 ">
                        Already have an account? <Link to={'/login'} className="font-medium text-blue-600 hover:underline ">Sign in</Link>
                    </p>
              </form>
          </div>
      </div>
    </div>
)}