import {
  Zap,
  ShieldCheck,
  Layers,
  Headphones,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    color: "bg-amber-50 text-amber-600 border-amber-200/60",
    title: "Fast & Modern Experience",
    points: [
      "Lightning-fast page loads for smooth browsing",
      "Responsive layout optimized for mobile & desktop",
      "Intuitive navigation designed for quick checkout",
    ],
  },
  {
    icon: ShieldCheck,
    color: "bg-blue-50 text-blue-600 border-blue-200/60",
    title: "Secure & Reliable",
    points: [
      "End-to-end encrypted session authentication",
      "Safe checkout with trusted payment gateways",
      "Strict data privacy & PCI-compliant security",
    ],
  },
  {
    icon: Layers,
    color: "bg-indigo-50 text-indigo-600 border-indigo-200/60",
    title: "Smart Inventory & Search",
    points: [
      "Instant multi-filter search & smart indexing",
      "Real-time product availability updates",
      "Category organization with verified reviews",
    ],
  },
  {
    icon: Sparkles,
    color: "bg-purple-50 text-purple-600 border-purple-200/60",
    title: "Personalized Features",
    points: [
      "Seamless saved cart & multi-list wishlist",
      "Instant order tracking & purchase history",
      "Customized product recommendations",
    ],
  },
  {
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
    title: "Built for High Performance",
    points: [
      "Optimized cloud architecture for scale",
      "Low-latency database querying with Prisma",
      "Seamless uptime & peak event readiness",
    ],
  },
  {
    icon: Headphones,
    color: "bg-rose-50 text-rose-600 border-rose-200/60",
    title: "24/7 Priority Support",
    points: [
      "Dedicated support team available around the clock",
      "Rapid resolution for any order or account queries",
      "30-day hassle-free return policy",
    ],
  },
];

function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            The CartForge Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Why Shop with CartForge?
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg">
            We combine high-performance web technology with unmatched security and customer-first features to give you the ultimate shopping platform.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Badge */}
                  <div className={`w-14 h-14 rounded-2xl ${item.color} border flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Feature Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5">
                    {item.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 font-normal leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;