import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const post = await Post.findById(params.postId).populate("creator")
        if (!post) return new Response("Post Not Found", { status: 404 });

        return new Response(JSON.stringify(post), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { content, tag } = await request.json();

    try {
        await connectToDB();

        const existingPost = await Post.findById(params.postId);

        if (!existingPost) {
            return new Response("Post not found", { status: 404 });
        }

        existingPost.content = content;
        existingPost.tag = tag;

        await existingPost.save();

        return new Response("Successfully updated the Posts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Post", { status: 500 });
    }
};

export const DELETE = async (_, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Post.findByIdAndRemove(params.postId);

        return new Response("Post deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting post", { status: 500 });
    }
};
