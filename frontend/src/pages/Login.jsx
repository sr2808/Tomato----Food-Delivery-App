import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';


const Login = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const {url, setToken} = useContext(StoreContext)

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    let newUrl = url + "/api/user/login"
    const response = await axios.post(newUrl, data);

    if(response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful")
      navigate("/");
    }
    else{
      console.log(response.data.message);
      toast.error(response.data.message)
    }
  }


  return (
    <div className="login w-full h-screen flex items-center justify-center">
      <div className="container bg-[#ff7818] flex items-center justify-center lg:justify-end md:justify-center p-10 lg:rounded-3xl md:rounded-3xl lg:h-[87vh] lg:w-[80%] lg:bg-[url('/AuthImage.jpg')] lg:bg-no-repeat lg:bg-contain md:h-[90vh] md:w-[80%] sm:h-[80vh] sm:w-[100%] sm:rounded-none">
        <div className="login-form rounded-3xl bg-white h-[90%] lg:w-1/2 md:w-[80%] sm:w-[80%]">
          {/* Form */}
          <form className='form p-5 flex flex-col justify-center items-center' onSubmit={onSubmitHandler}>
            {/* Header */}
            <h1 className='font-bold text-tomato text-3xl lg:text-4xl'>Login</h1>
            <hr className='h-1 bg-gray-300 w-full my-3' />

            {/* Email Field */}
            <div className="email-field w-full mb-6">
              <label htmlFor="email" className='lg:text-xl md:text-lg sm:text-lg text-tomato font-semibold'>Email</label>
              <input
                className="border-b-2 border-tomato w-full py-2 px-3 text-gray-500 text-base lg:text-xl"
                id="email"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={data.email}
                onChange={onChangeHandler}
              />
            </div>

            {/* Password Field */}
            <div className="password-field w-full mb-6">
              <label htmlFor="password" className='lg:text-xl md:text-lg sm:text-lg text-tomato font-semibold'>Password</label>
              <input
                className="border-b-2 border-tomato w-full py-2 px-3 text-gray-500 text-base lg:text-xl"
                id="password"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={data.password}
                onChange={onChangeHandler}
              />
            </div>

            {/* Login Button */}
            <button
              className="w-full my-2 md:my-1 flex justify-center bg-tomato text-white border border-tomato rounded-[10px] py-2 cursor-pointer hover:bg-[#fff4f2] hover:text-tomato transition duration-300 lg:text-xl md:text-base sm:text-sm"
              type="submit"
              onClick={onSubmitHandler}
            >
              Log In
            </button>

            {/* Or Text */}
            <span className='text-gray-500 my-auto font-semibold lg:text-lg md:text-lg sm:text-md'>or</span>

            {/* Google Login Button */}
            <button
              className="w-full my-2 md:my-1 flex gap-4 justify-center items-center bg-blue-700 text-white border border-tomato rounded-[10px] py-2 cursor-pointer lg:text-lg md:text-base sm:text-sm"
              type="button"
            >
              <img src="./google_symbol.png" alt="" className='lg:w-6 md:w-3 sm:w-3' />
              Continue with Google
            </button>

            {/* Signup Link */}
            <p className="mt-3 text-gray-600 lg:text-lg sm:text-base">
              Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
