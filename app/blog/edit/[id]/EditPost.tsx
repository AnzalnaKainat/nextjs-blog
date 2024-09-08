"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import type { Category } from '@prisma/client';
import "@uploadthing/react/styles.css";
import { UploadButton } from "../../../utils/uploadthing";
import CategoryDropdown from "../../new/CategoryDropdown";
import 'react-quill/dist/quill.snow.css';

type Props = {
  blogCategories: Category[];
  post: any; 
};

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditPost = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [categoryIds, setCategoryIds] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (props.post) {
      setTitle(props.post.title);
      setContent(props.post.content || "");
      setThumbnail(props.post.imgURL || null);

      if (props.post.categories && props.post.categories.length > 0) {
        setCategoryIds(props.post.categories[0].id); // Initialize with the first category
      }
    }
  }, [props.post]);

  const updatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          content,
          imgURL: thumbnail,
          categories: {
            connect: categoryIds ? [{ id: categoryIds }] : [],
            disconnect: props.post.categories
              .filter((category: Category) => category.id !== categoryIds)
              .map((category: Category) => ({ id: category.id })),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      setSubmitted(true);
      router.push(`/blog/${id}`);
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the post.");
    }
  };

  if (!props.post) {
    return <p>Post not found</p>;
  }

  if (submitted) {
    return (
      <div className="py-2 container flex flex-col mt-12">
        <div className="flex flex-col flex-1 items-stretch justify-center h-full text-left border border-[#8f8952] p-8">
          <h1 className="text-4xl font-bold text-[#8f8952]">
            Your post has been updated:
          </h1>
          <Link href={`/blog/${id}`} className="text-[#0f277b] text-xl mt-4">
            Click here to view
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-130px)] py-2 container flex flex-col mt-12">
      <form
        className="flex flex-col items-stretch justify-center h-full text-left"
        onSubmit={updatePost}
      >
        <input
          type="text"
          className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 focus-visible:outline-none p-2 border-b-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />

        <div className="mb-12 mt-6">
          <ReactQuill
            value={content}
            onChange={(value) => setContent(value)}
            className="focus-visible:outline-none h-96 text-lg"
          />
        </div>

        <div className="self-start sm:mt-4 mt-10">
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-24 h-24 object-cover rounded-full mb-3"
            />
          )}
          <label className="block text-slate-600 mt-6 mb-2">
            {thumbnail ? "Change Image" : "Add thumbnail image (optional)"}
          </label>
          <UploadButton
            className="items-start"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res) {
                setThumbnail(res[0].url);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />

          {props.blogCategories && props.blogCategories.length > 0 ? (
            <CategoryDropdown
              list={props.blogCategories}
              selected={categoryIds}
              setSelected={setCategoryIds}
            />
          ) : (
            <p>No categories available</p>
          )}
        </div>

        <button
          type="submit"
          className="w-fit-content text-white bg-[#0f277b] px-4 py-2 sm:px-6 sm:py-4 mt-6 border-2 rounded-lg"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
