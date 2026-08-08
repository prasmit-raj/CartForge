
import  background from "../../assets/ocean.jpg";
import {Link} from "react-router-dom";
function Login(){
    return(
<div>

    <img src={background} alt="Background" className="relative w-screen h-screen bg-cover bg-center" />

 <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md w-[420px]">
    <label htmlFor="Login" className="text-2xl flex justify-center align-center text-blue-700 mx-4 my-4">Login</label>
   <br />

   <div className="flex mx-4 my-8">

      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mx-4">Email:</label>
    <input type="email" id="email" name="email" placeholder="Enter your email"   className="border border-gray-400 rounded-md px-3 py-2 mx-8 " required />
     
   </div>
   <div className="flex mx-4 my-8">
     <label htmlFor="password" className="block text-sm font-medium text-gray-700  mx-1">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter your password"   className="border border-gray-400 rounded-md px-3 py-2 mx-8 " required />
   
   </div>

   <div className="flex justify-end items-end text-sm text-gray-600 my-2 hover:text-blue-500 hover:cursor-pointer hover:underline underline-offset-4">
     <Link to="/forgetpassword" className="text-blue-500 hover:underline">Forget Password?</Link>
   
   </div>
   
 <div className="flex justify-center items-center mx-auto my-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-44 rounded">
    <button type="submit" >
      <Link to="/loginotp">
      Submit</Link>
    </button>
   </div>

   <div>
    <p>Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
   </div>
    
  </form>

 

</div>
       
    );
}

export default Login;