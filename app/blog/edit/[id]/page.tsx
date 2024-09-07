// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import { Prisma } from "@prisma/client";
// import type { Category } from '@prisma/client';
// import "@uploadthing/react/styles.css";
// import { UploadButton } from "../../../utils/uploadthing";
// import CategoryDropdown from "../../new/CategoryDropdown";
// import 'react-quill/dist/quill.snow.css';

// type Props = {
//   blogCategories: Category[];
// };

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const EditPost = (props: Props) => {
//   const [post, setPost] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [title, setTitle] = useState<string>("");
//   const [content, setContent] = useState<string>("");
//   const [thumbnail, setThumbnail] = useState<string | null>(null);
//   const [categoryIds, setCategoryIds] = useState<number | null>(null); // Use number array for multiple categories
//   const [submitted, setSubmitted] = useState<boolean>(false);

//   const router = useRouter();
//   const { id } = useParams(); 

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await fetch(`/api/posts/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch post data");
//         }
//         const data = await response.json();
//         setPost(data);
//         setTitle(data.title);
//         setContent(data.content || "");
//         setThumbnail(data.imgURL || null);

//         if (data.categories && data.categories.length > 0) {
//           setCategoryIds(data.categories[0].id); // Set initial selected category
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   const updatePost = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const updatedPost: Prisma.PostUncheckedUpdateInput = {
//         title,
//         content,
//         imgURL: thumbnail,
//         categories: categoryIds ? { connect: { id: categoryIds } } : undefined,
//       };

//       const response = await fetch(`/api/posts/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedPost),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update post");
//       }

//       alert("Post updated successfully");
//       setSubmitted(true);
//       router.push(`/blog/${id}`);
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while updating the post.");
//     }
//   };

//   if (loading) {
//     return <p>Loading post...</p>;
//   }

//   if (!post) {
//     return <p>Post not found</p>;
//   }

//   if (submitted) {
//     return (
//       <div className="py-2 container flex flex-col mt-12">
//         <div className="flex flex-col flex-1 items-stretch justify-center h-full text-left border border-[#8f8952] p-8">
//           <h1 className="text-4xl font-bold text-[#8f8952]">
//             Your post has been updated:
//           </h1>
//           <Link href={`/blog/${id}`} className="text-[#0f277b] text-xl mt-4">
//             Click here to view
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[calc(100vh-130px)] py-2 container flex flex-col mt-12">
//       <form
//         className="flex flex-col items-stretch justify-center h-full text-left"
//         onSubmit={updatePost}
//       >
//         <input
//           type="text"
//           className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 focus-visible:outline-none p-2 border-b-2"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           name="title"
//         />

//         <div className="mb-12 mt-6">
//           <ReactQuill
//             value={content}
//             onChange={(value) => setContent(value)}
//             className="focus-visible:outline-none h-96 text-lg"
//           />
//         </div>

//         <div className="self-start mt-4">
//           {thumbnail && (
//             <img
//               src={thumbnail}
//               alt="Thumbnail"
//               className="w-24 h-24 object-cover rounded-full mb-3"
//             />
//           )}
//           <label className="block text-slate-600 mt-6 mb-2">
//             {thumbnail ? "Change Image" : "Add thumbnail image (optional)"}
//           </label>
//           <UploadButton
//             className="items-start"
//             endpoint="imageUploader"
//             onClientUploadComplete={(res) => {
//               if (res) {
//                 setThumbnail(res[0].url);
//               }
//             }}
//             onUploadError={(error: Error) => {
//               alert(`ERROR! ${error.message}`);
//             }}
//           />

//           {props.blogCategories && props.blogCategories.length > 0 ? (
//             <CategoryDropdown
//               list={props.blogCategories}
//               selected={categoryIds}
//               setSelected={setCategoryIds}
//             />
//           ) : (
//             <p>No categories available</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-fit-content text-white bg-[#0f277b] px-4 py-2 sm:px-6 sm:py-4 mt-6 border-2 rounded-lg"
//         >
//           Update Post
//         </button>
//       </form>
//     </div>
//   );
// };
// export default EditPost;

import { prisma } from "@/lib/prisma";
import EditPost from "./EditPost"; // Make sure this path is correct

const page = async ({
  params,
}: {
  params: { id: string };
}) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    include: {
      author: true,
      categories: true
    },
  });

  const categories = await prisma.category.findMany(); // Fetch categories

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <EditPost blogCategories={categories} post={post} />
  );
};

export default page;

