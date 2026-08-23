import Navbar from "../../component/layout/navbar.jsx";
import Footer from "../../component/layout/footer.jsx";
import Hero from "../../component/home/hero.jsx";
import Categories from "../../component/home/Categories.jsx";
import WhyChooseUs from "../../component/home/WhyChooseUs.jsx";
import Testimonials from "../../component/home/Testimonials.jsx";
import CtaBanner from "../../component/home/CtaBanner.jsx";

function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <WhyChooseUs />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}

export default Home;