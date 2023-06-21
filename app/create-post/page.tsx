"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';

interface CreatePostProps { }

export interface PostForm { content: string; tag: string; }

const CreatePost: React.FC<CreatePostProps> = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<PostForm>({ content: "", tag: "" });

  const createPost = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          ...post,
          userId: session?.user?.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={isSubmitting}
      handleSubmit={createPost}
    />
  );
};
  
export default CreatePost;
