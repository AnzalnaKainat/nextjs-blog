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

