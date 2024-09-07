import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Define types for the request and params
interface Params {
  params: {
    id: string;
  };
}

// Fetch a single post by ID
export async function GET(request: Request, { params }: Params) {
  const id = Number(params.id); // Convert the id to a number

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        categories: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// Update a post by ID, including title, content, imgURL, and categories
export async function PUT(request: Request, { params }: Params) {
  const id = Number(params.id); // Convert the id to a number

  try {
    const data = await request.json();
    const {
      title,
      content,
      imgURL,
      categories, // Expecting categories object with connect and disconnect
    }: {
      title: string;
      content: string;
      imgURL: string | null;
      categories?: {
        connect?: { id: number }[];
        disconnect?: { id: number }[];
      };
    } = data;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        imgURL,
        categories: {
          connect: categories?.connect || [],
          disconnect: categories?.disconnect || [],
        },
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// Delete a post by ID
export async function DELETE(request: Request, { params }: Params) {
  const id = Number(params.id);

  try {
    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
