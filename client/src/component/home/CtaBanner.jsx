import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";

function CtaBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-14 shadow-2xl overflow-hidden border border-slate-800">
          
          {/* Background Gradient Mesh Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Join 50,000+ Smart Shoppers Today
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Ready to Upgrade Your Shopping Experience?
              </h2>

              <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-2xl font-normal">
                Sign up in under 60 seconds. Unlock exclusive member discounts, instant order tracking, and priority customer support.
              </p>
            </div>

            {/* Right CTA Button */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                Create Free Account
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-500 rounded-2xl transition-colors text-center"
              >
                Already a member? Sign In
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CtaBanner;
