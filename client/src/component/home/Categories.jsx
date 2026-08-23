import { ArrowUpRight, Smartphone, Shirt, Home, Watch, Sparkles } from "lucide-react";

const categories = [
  {
    id: "electronics",
    name: "Electronics & Tech",
    tagline: "Smart gadgets, audio & accessories",
    itemCount: "1,200+ Products",
    icon: Smartphone,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50/60 text-blue-600",
    badge: "Trending",
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    tagline: "Modern streetwear & formalwear",
    itemCount: "2,400+ Products",
    icon: Shirt,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50/60 text-purple-600",
    badge: "New Collection",
  },
  {
    id: "home",
    name: "Home & Living",
    tagline: "Minimalist decor & essential furniture",
    itemCount: "850+ Products",
    icon: Home,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50/60 text-emerald-600",
    badge: "Best Seller",
  },
  {
    id: "accessories",
    name: "Watches & Accessories",
    tagline: "Luxury watches, bags & jewelry",
    itemCount: "950+ Products",
    icon: Watch,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50/60 text-amber-600",
    badge: "Popular",
  },
];

function Categories() {
  return (
    <section id="categories" className="py-20 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Curated Collections
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Featured Categories
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-xl">
              Handpicked selections across our most popular departments. Find what matches your style.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                {/* Background Gradient Mesh on Hover */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-2xl pointer-events-none`} />

                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${cat.bgColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal mb-6">
                    {cat.tagline}
                  </p>
                </div>

                {/* Footer Bar: Product Count & Arrow */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    {cat.itemCount}
                  </span>
                  
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 text-slate-600 group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Categories;
