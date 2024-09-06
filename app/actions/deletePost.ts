import { prisma } from "@/lib/prisma";

export async function deletePost(postId: number) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
