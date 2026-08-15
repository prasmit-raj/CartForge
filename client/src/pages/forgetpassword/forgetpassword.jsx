import  background from "../../assets/ocean.jpg";
import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";
import { sendforgotpasswordotp } from "../../service/authservice";
function ForgetPassword(){
 const navigate= useNavigate();
 const [email, setEmail] = useState("");
 const [error, setError] = useState("");

 const handleSubmit=async(e)=>{
      e.preventDefault();
      if(!email){
         setError("Please enter your email");
      }

      try{
        const result= await sendforgotpasswordotp({email});
        console.log(result);
        navigate("/enterotp");
      }
      catch(error){
         setError(error.message);
      }
 }

    return (
      <div>
        <img src={background} alt="Background" className="relative w-screen h-screen bg-cover bg-center" />
        <form onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md w-[420px]">
         
         <div className ="flex mx-4 my-8">
            <label htmlFor="email">E-mail :</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className=" border rounded-lg mx-4" required />

         </div>
          
          <div className="flex   justify-center items-center  my-8">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> 
                <Link to="/enterotp"> send otp </Link> 
                
                </button>
          </div>

        </form>
      </div>
    );
}

export default ForgetPassword;