"use client";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Modal from '../../components/Modal'; 

const PostClient = ({ post }: { post: any }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to handle the confirmation of post deletion
  const handleConfirmDelete = async () => {
    setLoading(true);
    setIsDeleting(false); // Close the modal

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
          className="w-full h-60 sm:h-screen rounded-lg my-4 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${post.imgURL})` }}
        ></div>
      )}
      <div className="p-5 sm:p-10 mx-auto md:-mt-28 sm:-mt-20 -mt-12 bg-[#fffffd] rounded-xl shadow-lg shadow-indigo-500/40 max-w-5xl">
        <div className="flex flex-row gap-2">
          <p className="text-[#ff0000] text-sm sm:text-md"> CATEGORY:</p>
          <p className="text-sm sm:text-md text-gray-500">
            {post.categories.map((cat: any) => cat.name).join(", ")}
          </p>
        </div>

        <h1 className="text-3xl sm:text-5xl my-5 sm:my-10 font-bold text-[#8f8952]">
          {post.title}
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-0">
          <div className="flex items-center">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 ml-0 sm:ml-3 mr-2 rounded-full bg-contain"
              style={{ backgroundImage: `url(${post.author.image})` }}
            ></div>
            <div>
              <p className="text-sm sm:text-md text-gray-500">
                By {post.author.name}
              </p>
              <p className="text-sm sm:text-md text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {session?.user?.email === post.author.email && (
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <button
                onClick={() => router.push(`/blog/edit/${post.id}`)}
                className="flex items-center gap-1 sm:gap-2 py-2 px-3 sm:px-4 border-2 border-[#0f277b] text-[#0f277b] rounded-lg"
              >
                Edit <FaEdit />
              </button>
              <button
                onClick={() => setIsDeleting(true)} // Open modal
                disabled={loading}
                className="flex items-center gap-1 sm:gap-2 py-2 px-3 sm:px-4 border-2 border-[#ff0000] text-[#ff0000] rounded-lg"
              >
                {loading ? "Deleting..." : "Delete"} <FaTrash />
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="p-5 sm:p-10 my-10 max-w-5xl mx-auto">{parse(post.content)}</p>

      {isDeleting && (
        <Modal
          isOpen={isDeleting}
          onClose={() => setIsDeleting(false)}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this post?"
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />
      )}
    </>
  );
};

export default PostClient;
