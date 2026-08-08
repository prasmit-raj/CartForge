import  background from "../../assets/ocean.jpg";
import {Link} from "react-router-dom";
function ForgetPassword(){
    return (
      <div>
        <img src={background} alt="Background" className="relative w-screen h-screen bg-cover bg-center" />
        <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md w-[420px]">
         
         <div className ="flex mx-4 my-8">
            <label htmlFor="email">E-mail :</label>
            <input type="email" id="email" placeholder="Enter your email" className=" border rounded-lg mx-4" required />

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