import { prisma } from "@/lib/prisma";
import PostClient from "./PostClient"; 


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

  if (!post) {
    return <div>Post not found</div>;
  }

  // Pass the data to the Client Component
  return (
    <div className="w-10/12 mx-auto mt-6 mb-10">
      <PostClient post={post} />
    </div>
  );
};

export default page;
