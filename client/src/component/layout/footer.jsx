import {Link} from "react-router-dom";

function Footer(){

    return(

      <footer className="flex item-center justify-between bg-gray-800 text-white px-8 py-12">

  <ul>
               <li className="my-2 hover:text-sky-400  hover:scale-110 transition-all duration-200 hover:underline underline-offset-4"><Link to="/privacy">Privacy Policy</Link></li>
              <li className="my-2 hover:text-sky-400  hover:scale-110 transition-all duration-200 hover:underline underline-offset-4"><Link to="/terms">Terms of Service</Link></li>
              <li className="my-2 hover:text-sky-400  hover:scale-110 transition-all duration-200 hover:underline underline-offset-4"><Link to="/contact">Contact Us</Link></li>



       </ul>

        <p>&copy; 2023 My App. All rights reserved.</p>
        
     

      </footer>

    );
}
export default Footer;