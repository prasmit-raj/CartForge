import  background from "../../assets/ocean.jpg";
import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";
import { resetpassword } from "../../service/authservice";
function ForgetPassword(){
      
    const navigate= useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit=async(e)=>{
        e.preventDeafault();

        if(!currentPassword || !newPassword || !confirmPassword){
            setError("Please fill in all fields");
            return;
        }

        try{
            const result = await resetpassword({currentPassword, newPassword, confirmPassword});
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
         
        <div className ="flex mx-4 my-8">
             <label htmlFor="cuurentPassword">Current password :</label>
             <input type="password" id="cuurentpassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter your current password" className=" border rounded-lg mx-4" required />
        </div>

        <div className="flex mx-4 my-8">
             <label htmlFor="newPassword">New password :</label>
             <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter your new password" className=" border rounded-lg mx-4" required />
        </div>

        <div className="flex mx-4 my-8">
             <label htmlFor="confirmPassword">Confirm password :</label>
             <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your new password" className=" border rounded-lg mx-4" required />
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
export default ForgetPassword;