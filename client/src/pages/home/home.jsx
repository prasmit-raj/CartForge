import Navbar from "../../component/layout/navbar.jsx";
import Footer from"../../component/layout/footer.jsx";
import Hero from "../../component/home/hero.jsx";
import WhyChooseUs from "../../component/home/WhyChooseUs.jsx";
import Testimonials from "../../component/home/Testimonials.jsx";
function Home(){
    return (
        <>
        <Navbar />
        <Hero />
        <WhyChooseUs />
        <  Testimonials />
        <Footer />
        </>
    );
}
export default Home;