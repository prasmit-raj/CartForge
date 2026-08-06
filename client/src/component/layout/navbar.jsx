function Nav(){
return (
<header className="flex items-center justify-between px-8 py-6 h-10 shadow-md bg-slate-900 text-slate-100 shadow-md">

<h1 className="text-2xl font-bold">CartForge</h1>

<nav className=" flex space-x-4 cursor-pointer gap-12 justify-around px-4 py-4">
    <a href="#" className="hover:text-sky-400  hover:scale-110 transition-all duration-200 hover:underline underline-offset-4">Home</a>
    <a href="#" className="hover:text-sky-400  hover:scale-110 transition-all duration-200 hover:underline underline-offset-4">Login</a>
    <a href="#" className="hover:text-sky-400  hover:scale-110 transition-all duration-200 hover:underline underline-offset-4">Signup</a>
</nav>

</header>
);
}
export default Nav;