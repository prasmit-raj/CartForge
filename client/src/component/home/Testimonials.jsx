function Testimonials() {
  return (
    <div className="border-0 rounded-lg mx-8 my-8 px-4 py-8 bg-slate-100 text-slate-900 shadow-md">
      <h1 className="text-5xl text-center font-bold py-4 mb-8">
        What Our Customers Say
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <article className="border-2 p-4 rounded-lg shadow-md">
          <p className="italic text-slate-600 mb-4">
            "CartForge made my shopping experience incredibly smooth. The
            website is fast, easy to use, and the checkout process was
            seamless."
          </p>
          <h3 className="font-bold">Aarav Sharma</h3>
          <p className="text-sm text-slate-500">Verified Customer</p>
        </article>

        <article className="border-2 p-4 rounded-lg shadow-md">
          <p className="italic text-slate-600 mb-4">
            "I found exactly what I needed within minutes. Great product
            selection, secure payments, and fast delivery."
          </p>
          <h3 className="font-bold">Priya Mehta</h3>
          <p className="text-sm text-slate-500">Verified Customer</p>
        </article>

        <article className="border-2 p-4 rounded-lg shadow-md">
          <p className="italic text-slate-600 mb-4">
            "One of the best online shopping experiences I've had. Clean design,
            excellent customer support, and reliable service."
          </p>
          <h3 className="font-bold">Rahul Verma</h3>
          <p className="text-sm text-slate-500">Verified Customer</p>
        </article>

      </div>
    </div>
  );
}

export default Testimonials;