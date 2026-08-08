import {Link} from "react-router-dom";
function Nav(){
return (
<header className="flex items-center justify-between px-8 py-6 h-10 shadow-md bg-slate-900 text-slate-100 shadow-md">

<h1 className="text-2xl font-bold">CartForge</h1>

<nav className=" flex space-x-4 cursor-pointer gap-12 justify-around px-4 py-4">
    <Link to="/"  className="hover:text-sky-400  hover:scale-110 transition-all duration-200 hover:underline underline-offset-4">Home</Link>
<Link to="/login"  className="hover:text-sky-400  hover:scale-110 transition-all duration-200 hover:underline underline-offset-4">Login</Link>
<Link to="/signup"  className="hover:text-sky-400  hover:scale-110 transition-all duration-200 hover:underline underline-offset-4">Signup</Link>
   
</nav>

</header>
);
}
export default Nav;