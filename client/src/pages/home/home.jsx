import Navbar from "../../component/layout/navbar.jsx";
import Footer from"../../component/layout/footer.jsx";
import Hero from "../../component/home/hero.jsx";
import WhyChooseUs from "../../component/home/whychooseus.jsx";
function Home(){
    return (
        <>
        <Navbar />
        <Hero />
        <WhyChooseUs />
        <Footer />
        </>
    );
}
export default Home;