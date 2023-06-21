"use client";

import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface UpdatePostProps {}

const UpdatePost: React.FC<UpdatePostProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [post, setPost] = useState({ content: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();

      setPost({
        content: data.content,
        tag: data.tag,
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  const updatePost = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!postId) return alert("Missing PostId!");

    try {
      console.log({ post });
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify(post),
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
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default UpdatePost;
