import hero from "../../assets/hero.png";
function Hero(){
return (
    <article className="flex ">

        <div>
             <h1>Welcome to CartForge</h1>
            <p>Discover the ultimate shopping experience with CartForge, your one-stop destination for all your needs. Explore a wide range of products, enjoy seamless navigation, and find the best deals tailored just for you.</p>
        <p>Start your shopping journey today and experience the convenience of CartForge!</p>
        <a href="#"> <button>Get Started</button> </a>  
        </div>
       
      <img src={hero} alt="CartForge Hero"  height="200" />
      
      
      

    </article>


);


}

export default Hero;