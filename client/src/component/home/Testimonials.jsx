import { Star, Quote, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Verified Buyer",
    avatar: "AS",
    avatarBg: "bg-blue-600",
    rating: 5,
    quote:
      "CartForge made my shopping experience incredibly smooth. The site is lightning fast, finding categories takes seconds, and the checkout was seamless!",
  },
  {
    name: "Priya Mehta",
    role: "Verified Buyer",
    avatar: "PM",
    avatarBg: "bg-purple-600",
    rating: 5,
    quote:
      "I found exactly what I needed within minutes. Great product selection, instant security OTP verification, and super fast delivery.",
  },
  {
    name: "Rahul Verma",
    role: "Verified Buyer",
    avatar: "RV",
    avatarBg: "bg-emerald-600",
    rating: 5,
    quote:
      "One of the best online shopping experiences I've had. Ultra-clean design, reliable status notifications, and top-tier customer support.",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/60 mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Loved by 50,000+ Shoppers
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Real feedback from verified buyers who enjoy shopping on CartForge every day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative group"
            >
              {/* Decorative Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 group-hover:text-blue-100 transition-colors pointer-events-none" />

              <div>
                {/* 5-Star Rating Bar */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal italic mb-8 relative z-10">
                  "{item.quote}"
                </p>
              </div>

              {/* User Avatar & Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <div className={`w-11 h-11 rounded-full ${item.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-md shadow-slate-200`}>
                  {item.avatar}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">{item.role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;