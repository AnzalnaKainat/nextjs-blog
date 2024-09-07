// // app/blog/[id]/PostClient.tsx (Client Component)

// "use client"; // Mark it as a Client Component
// import { useRouter } from "next/navigation";
// import parse from "html-react-parser";
// import { FaShare, FaTrash } from "react-icons/fa6";
// import { FaEdit } from "react-icons/fa";
// // import Link from "next/link";
// import { useState } from "react";

// const PostClient = ({ post }: { post: any }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
  

//   // Delete post function
//   const deletePost = async () => {
//     setLoading(true);

//     const confirmed = confirm("Are you sure you want to delete this post?");
//     if (!confirmed) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(`/api/posts/${post.id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete post");
//       }

//       alert("Post deleted successfully");
//       router.push("/"); 
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while deleting the post.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {post.imgURL && (
//         <div
//           className="w-full relative h-screen rounded-lg my-4 bg-cover bg-no-repeat"
//           style={{ backgroundImage: `url(${post.imgURL})` }}
//         ></div>
//       )}      
//       <div className="p-10 mx-auto bg-[#fffffd] rounded-xl shadow-lg shadow-indigo-500/40">
//       <p className="text-md text-gray-500 mb-3">
//           Categories: {post.categories.map((cat: any) => cat.name).join(', ')}
//         </p>
//         <h1 className="text-5xl my-10 text-[#8f8952] italic">
//           {post.title}
//         </h1>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div
//               className="w-20 h-20 ml-3 mr-2 rounded-full bg-contain"
//               style={{ backgroundImage: `url(${post.author.image})` }}
//             ></div>
//             <div>
//               <p className="text-md text-gray-500">By {post.author.name}</p>
//               <p className="text-md text-gray-500">
//                 {new Date(post.createdAt).toLocaleString()}
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-3">
    
//             <button
//               onClick={() => router.push(`/blog/edit/${post.id}`)}
//               className="flex items-center gap-2 py-2 px-4 border-2 border-[#0f277b] text-[#0f277b] rounded-lg"
//             >
//               Edit <FaEdit />
//             </button>
//             <button
//               onClick={deletePost}
//               disabled={loading}
//               className="flex items-center gap-2 py-2 px-4 border-2 border-[#ff0000] text-[#ff0000] rounded-lg"
//             >
//               {loading ? "Deleting..." : "Delete"} <FaTrash />
//             </button>
//           </div>
//         </div>
//       </div>

//       <p className="p-10 my-10">{parse(post.content)}</p>
//     </>
//   );
// };

// export default PostClient;

"use client"; // Mark it as a Client Component
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { FaShare, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";

const PostClient = ({ post, currentUserId }: { post: any; currentUserId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Check if the current user is the author of the post
  const isAuthor = post.author.id === currentUserId;

  // Delete post function
  const deletePost = async () => {
    setLoading(true);

    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      alert("Post deleted successfully");
      router.push("/"); 
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {post.imgURL && (
        <div
          className="w-full relative h-screen rounded-lg my-4 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${post.imgURL})` }}
        ></div>
      )}
      <div className="p-10 mx-auto bg-[#fffffd] rounded-xl shadow-lg shadow-indigo-500/40">
        <p className="text-md text-gray-500 mb-3">
          Categories: {post.categories.map((cat: any) => cat.name).join(', ')}
        </p>
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
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          {isAuthor && (
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/blog/edit/${post.id}`)}
                className="flex items-center gap-2 py-2 px-4 border-2 border-[#0f277b] text-[#0f277b] rounded-lg"
              >
                Edit <FaEdit />
              </button>
              <button
                onClick={deletePost}
                disabled={loading}
                className="flex items-center gap-2 py-2 px-4 border-2 border-[#ff0000] text-[#ff0000] rounded-lg"
              >
                {loading ? "Deleting..." : "Delete"} <FaTrash />
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="p-10 my-10">{parse(post.content)}</p>
    </>
  );
};

export default PostClient;

