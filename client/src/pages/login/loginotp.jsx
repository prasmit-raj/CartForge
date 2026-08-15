import  background from "../../assets/ocean.jpg";
import { useNavigate, Link} from "react-router-dom";
import { useState } from "react";
import { loginotp } from "../../service/authservice";
import { verifyloginotp } from "../../service/authservice";

function Loginotp(){
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
        
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!otp){
            setError("Please enter the OTP");
            return;
        }
        // Add logic to submit OTP

        try{
       const result= await verifyloginotp({email,otp});
       console.log(result);
       navigate("/dashboard");
        }
        catch(error){
            setError(error.message);
        }
    }

    return (

          <div>
             <img src={background} alt="Background" className="relative w-screen h-screen bg-cover bg-center" />
                   <form onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md w-[420px]">
                
                
                 <div    className ="flex mx-4 my-8">
            <label htmlFor="otp">Enter OTP :</label>
            <input type="text" id="otp" onChange={(e) => setOtp(e.target.value)} placeholder="Enter your otp" className=" border rounded-lg mx-4" required />
        </div>

        <div className="flex justify-center items-center my-5">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to="/dashboard">submit</Link>
                
            </button>
                </div>
                 </form>
                 </div>
    );
}

export default Loginotp;