import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import portalogo from "../../assets/image/learningportal.svg";
import { useRegisterMutation } from "../../features/auth/authApi";
export default function StudentRegistration() {
    const [register,{ data, isLoading, error: responseError }] = useRegisterMutation();
    const  dispatch = useDispatch();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setCpassword] = useState("");
    const [role,setRole] = useState("student");
    
    const navigate = useNavigate();
  const handleSubmit = () => {
      if(cpassword===password){
          register({name,email,password,role});
          alert("Registered Successfully!!!");
          navigate("/student/player");
      }
      else{
          alert("Password Dose not Match!!!");
      }
  }
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
    <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
            <img className="h-12 mx-auto" src={portalogo} alt="portal logo"/>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                Create Your New Account
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="name" className="sr-only">Name</label>
                    <input id="name" name="name" type="name" autocomplete="name" required
                        className="login-input rounded-t-md" placeholder="Student Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label for="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autocomplete="email" required
                        className="login-input " placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div>
                    <label for="password" className="sr-only">Password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password" required
                        className="login-input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div>
                    <label for="confirm-password" className="sr-only">Confirm Password</label>
                    <input id="confirm-password" name="cpassword" type="password"
                        autocomplete="confirm-password" required className="login-input rounded-b-md"
                        placeholder="Confirm Password" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} />
                </div>
            </div>
            <div className="flex justify-between">
                <Link to="/"  className="font-medium text-violet-600 hover:text-violet-500">
                         Student Login
                            </Link>
                    <div className="text-sm">
                        <Link to="/admin/login" className="font-medium text-violet-600 hover:text-violet-500">
                            Admin Login
                            </Link>
                    </div>
                </div>
            <div>
                <button type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                    Create Account
                </button>
            </div>
        </form>
    </div>
</section>
  )
}
