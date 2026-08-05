function Nav(){
return (
<header className="flex items-center justify-between px-8 py-4 shadow-md bg-black text-white">
<h1>CartForge</h1>

<nav className=" flex space-x-4 cursor-pointer  ">
    <a href="#" className="hover:text-red-500 ">Home</a>
    <a href="#" className="hover:text-red-500">Login</a>
    <a href="#" className="hover:text-red-500">Signup</a>
</nav>

</header>
);
}
export default Nav;