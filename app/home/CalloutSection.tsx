import React from "react";

import NewsletterSubscribe from "./NewsletterSubscribe";

const CalloutSection = () => {
  return (
    <div className=" flex items-center justify-center py-20">
      <div className="bg-[#f6ede2] w-9/12 p-10 flex items-center justify-between">
        <div className="w-1/2">
          <p className="text-[#0f277b] semi-bold mb-5">NEWSLETTER</p>
          <h2 className="text-4xl font-bold my-5 text-[#8f8952]">
          Subscribe to our website newsletter to receive news and updates.
          </h2>
          <p className="text-zinc-700">Stay up-to-date with the latest tech news and announcements</p>
        </div>

        <div className="w-2/5">
          <NewsletterSubscribe />
        </div>
      </div>
    </div>
  );
};

export default CalloutSection;
