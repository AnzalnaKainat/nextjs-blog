// import React from "react";

// import NewsletterSubscribe from "./NewsletterSubscribe";

// const CalloutSection = () => {
//   return (
//     <div className=" flex items-center justify-center py-20">
//       <div className="bg-[#f6ede2] w-9/12 p-10 flex items-center justify-between">
//         <div className="w-1/2">
//           <p className="text-[#0f277b] semi-bold mb-5">NEWSLETTER</p>
//           <h2 className="sm:text-4xl text-2xl font-bold my-5 text-[#8f8952]">
//           Subscribe to our website newsletter to receive news and updates.
//           </h2>
//           <p className="text-zinc-700">Stay up-to-date with the latest tech news and announcements</p>
//         </div>

//         <div className="w-2/5">
//           <NewsletterSubscribe />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalloutSection;

import React from "react";
import NewsletterSubscribe from "./NewsletterSubscribe";

const CalloutSection = () => {
  return (
    <div className="flex items-center justify-center py-20 px-4">
      <div className="bg-[#f6ede2] w-full lg:w-9/12 p-10 flex flex-col lg:flex-row items-center justify-between">
        {/* Left section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <p className="text-[#0f277b] font-semibold mb-3 lg:mb-5">NEWSLETTER</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold my-3 lg:my-5 text-[#8f8952]">
            Subscribe to our website newsletter to receive news and updates.
          </h2>
          <p className="text-zinc-700">
            Stay up-to-date with the latest tech news and announcements
          </p>
        </div>

        {/* Right section (NewsletterSubscribe) */}
        <div className="w-full lg:w-2/5">
          <NewsletterSubscribe />
        </div>
      </div>
    </div>
  );
};

export default CalloutSection;
