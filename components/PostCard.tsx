"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from 'react';

export interface User {
  _id: string;
  email: string;
  username: string;
  image?: string;
}
export interface Post {
  _id: string;
  creator: User,
  content: string,
  tag: string,
}

interface PostCardProps {
  post: Post;
  handleTagClick?(tag: string): void;
  handleEdit?(id: string): void;
  handleDelete?(id: string): void;
}

const PostCard: React.FC<PostCardProps> = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const isOwnPost = session?.user?.id === post.creator._id;

  const [copied, setCopied] = useState<string>();

  const handleProfileClick = () => {
    if (isOwnPost) {
      return router.push("/profile");
    }
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.content);
    navigator.clipboard.writeText(post.content);
    setTimeout(() => setCopied(undefined), 3000);
  };

  const onTagClick = (tag: string) => {
    if (!handleTagClick) {
      return; 
    }
    handleTagClick(tag)
  }

  const onEdit = () => {
    if (!handleEdit) {
      return; 
    }
    handleEdit(post._id)
  }

  const onDelete = () => {
    if (!handleDelete) {
      return; 
    }
    handleDelete(post._id);
  }
  
  return (
    // <div className='prompt_card mr-3 mb-3 max-w-[350px]'>
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image || '/assets/images/logo.svg'}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.content
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.content ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <div className='my-4'>
        <p className='font-satoshi text-sm text-gray-700'>{post.content}</p>
      </div>
      <div className='flex flex-row items-center'>
        {post.tag.split(' ').map(tag =>
          <p
            key={tag}
            className='font-inter text-sm blue_gradient cursor-pointer mr-1'
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </p>
        )}
      </div>

      {isOwnPost && pathName === "/profile" && (
        <div className='mt-2 flex-end gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={onEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={onDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
