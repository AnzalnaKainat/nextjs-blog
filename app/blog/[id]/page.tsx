import React from "react";
import { prisma } from "@/lib/prisma";
import parse from "html-react-parser";
import { FaShare } from "react-icons/fa6";


const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      author: true,
    },
  });
  console.log(post);

  const postUrl = `https://.com/blog/${params.id}`;

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    postUrl
  )}`;

  return (
    <div className="w-4/5 mx-auto mt-6">
      {post && (
        <>
          {post.imgURL && (
            <div
              className="w-full relative h-screen rounded-lg my-4 bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${post.imgURL})` }}
            ></div>
          )}
          <div className="p-10 mx-auto bg-[#fffffd] rounded-xl shadow-lg shadow-indigo-500/40">
            <h1 className="text-5xl my-10 text-[#8f8952] italic">
              {post.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-20 h-20 ml-3 mr-2 rounded-full bg-contain"
                  style={{ backgroundImage: `url(${post.author.image})` }}
                ></div>
                <div>
                  <p className="text-md text-gray-500">By {post.author.name}</p>
                  <p className="text-md text-gray-500">
                    {post.createdAt?.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={linkedinShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 px-4 border-2 border-[#0f277b] text-[#0f277b] rounded-lg"
                >
                  Share on LinkedIn <FaShare />
                </a>
              </div>
            </div>
          </div>

          <p className="p-10 my-10" suppressHydrationWarning>{parse(post.content)}</p>
        </>
      )}

      
    </div>
  );
};

export default page;

