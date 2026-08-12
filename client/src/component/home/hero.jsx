import hero from "../../assets/hero.png";
function Hero(){
return (
 <article   className="flex items-center justify-between mx-8 my-8 rounded-2xl gap-8 border-0 h-96 px-8 py-4 shadow-md bg-slate-100 text-slate-900">

        <div className="flex flex-col gap-4 justify-center items-start w-1/2">
        <h1 className="text-5xl font-bold leading-tight">
  Shop Smarter with CartForge
</h1>

<p className="text-lg text-slate-600 leading-8">
  Discover thousands of premium products at unbeatable prices. From everyday
  essentials to the latest trends, CartForge brings you quality, convenience,
  and secure shopping—all in one place.
</p>

<a href="/signup">
  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300" >
    Shop Now
  </button>
</a>
        </div>
       
      <img src={hero} alt="CartForge Hero"  className="h-80 w-auto" />
      
      
      

    </article>


);


}

export default Hero;