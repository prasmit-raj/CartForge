function WhyChooseUs() {
   return (
    <div className="border-0 rounded-lg mx-8 my-8 px-4 py-8 bg-slate-100 text-slate-900 shadow-md">
    <h1 className=" text-5xl text-center font-bold py-4 mb-4">Why Choose Us</h1>
   
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
     <article className="border-2 p-4 rounded-lg shadow-md text-center ">
        <h3 className="text-xl font-bold mb-2">Fast & Modern Shopping Experience</h3>
        <ul>
            <li>Lightning-fast page loads for a smooth user experience.</li>
            <li>Responsive design that works across all devices.</li>
            <li>Clean and intuitive interface for easy navigation.</li>
        </ul>


     </article>
      <article className="border-2 p-4 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
     <ul>
            <li>Secure user authentication and protected accounts.</li>
            <li>Safe checkout process with trusted payment integration.</li>
            <li>Data validation to ensure reliable transactions.</li>
        </ul>

      </article>
       <article className="border-2 p-4 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-bold mb-2">Powerful Product Management</h3>
        <ul>
            <li>Easy browsing with search, filters, and categories.</li>
            <li>Real-time inventory and product availability.</li>
            <li>Simple admin tools for managing products and orders.</li>
        </ul>

       </article>
        <article className="border-2 p-4 rounded-lg shadow-md text-center ">
            <h3 className="text-xl font-bold mb-2">Customer-Centric Features</h3>
            <ul>
            <li>Personalized shopping cart and wishlist.</li>
            <li>Order tracking and purchase history.</li>
            <li>Quick and hassle-free checkout experience.</li>
        </ul>

        </article>
         <article className="border-2 p-4 rounded-lg shadow-md text-center ">
            <h3 className="text-xl font-bold mb-2">Built for Performance & Scalability</h3>
            <ul>
            <li>Optimized backend for handling growing traffic.</li>
            <li>Efficient database design for faster queries.</li>
            <li>Modular architecture that supports future feature expansion.</li>
        </ul>

         </article>
         <article className="border-2 p-4 rounded-lg shadow-md text-center">
    <h3 className="text-xl font-bold mb-2">24/7 Customer Support</h3>
    <ul>
        <li>Dedicated support whenever you need assistance.</li>
        <li>Quick responses to your questions and concerns.</li>
        <li>Easy returns and hassle-free customer service.</li>
    </ul>
</article>
</div>

    </div>
   );

}

export default WhyChooseUs;