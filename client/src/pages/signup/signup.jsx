import  background from "../../assets/ocean.jpg";
import { useNavigate, Link} from "react-router-dom";
import { useState } from "react";
function Signup(){
   // const navigate = useNavigate();
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState("");


    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(!email || !password){
            seterror("Please fill in all fields");
            return;
          }
          if(!email.includes("@")){
            seterror("Please enter a valid email address");
            return;
          }

    }

    return (
        <div>
        <img src={background} alt="Background" className="relative w-screen h-screen bg-cover bg-center" />

    <form onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md w-[420px]">
    <label htmlFor="Login" className="text-2xl flex justify-center align-center text-blue-700 mx-4 my-4">Create Account</label>
   <br />

   <div className="flex mx-4 my-8">

      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mx-4">Email:</label>
    <input type="email" id="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter your email"   className="border border-gray-400 rounded-md px-3 py-2 mx-8 " required />
     
   </div>
   <div className="flex mx-4 my-8">
     <label htmlFor="password" className="block text-sm font-medium text-gray-700  mx-1">Password:</label>
    <input type="password" id="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter your password"   className="border border-gray-400 rounded-md px-3 py-2 mx-8 " required />
   
   </div>

   
   
 <div className="flex justify-center items-center mx-auto my-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-44 rounded">
    <button type="submit" >
     Create account
    </button>
   </div>

   <div>
    <p> Already a existing user <Link to="/login" className="text-blue-500 hover:underline">login</Link></p>
   </div>
    
  </form>



        </div>
    );
}
export default Signup;