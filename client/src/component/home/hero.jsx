import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import heroImg from "../../assets/hero.png";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/30 to-white pt-12 pb-20 sm:pt-16 sm:pb-24 border-b border-slate-100">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/20 via-indigo-300/20 to-purple-400/10 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs mb-6 hover:bg-blue-100/80 transition-all cursor-pointer">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Next-Gen Commerce Experience</span>
              <span className="text-slate-300">|</span>
              <span className="text-blue-600 font-bold">v2.0 Live</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] mb-6">
              Shop Smarter.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                Live Better.
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
              Discover thousands of curated, high-quality products at unbeatable prices. From daily essentials to trendsetting tech and fashion, CartForge delivers premium shopping with instant security.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <ShoppingBag className="w-5 h-5" />
                Explore Store
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              
              <a
                href="#categories"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl shadow-xs hover:border-slate-300 transition-all duration-200"
              >
                Browse Categories
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Free Shipping $50+</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700">256-bit Encryption</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700">30-Day Easy Returns</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Visual Container */}
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100/80 group">
              
              {/* Image Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-indigo-50/50 p-6 flex items-center justify-center min-h-[300px]">
                <img
                  src={heroImg}
                  alt="CartForge Products Showcase"
                  className="h-64 w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Rating Pill (Top Left) */}
                <div className="absolute top-4 left-4 backdrop-blur-md bg-white/90 px-3 py-1.5 rounded-full border border-white/60 shadow-md flex items-center gap-1.5">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">4.9/5</span>
                  <span className="text-[10px] text-slate-500 font-medium">(12k+ reviews)</span>
                </div>
              </div>

              {/* Card Footer Highlights */}
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Featured Season Drop</h4>
                  <p className="text-xs text-slate-500 font-medium">Curated Top Apparel & Tech</p>
                </div>
                
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>99.4% Positive</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;