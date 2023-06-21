"use client";

import { Post } from '@components/PostCard';
import Profile from '@components/Profile';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface MyProfileProps { };

const MyProfile: React.FC<MyProfileProps> = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const sessionUserId = session?.user?.id;

  const [myPosts, setMyPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${sessionUserId}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (!sessionUserId) {
      return;
    }
    
    fetchPosts();
  }, [sessionUserId]);

  const handleEdit = (postId: string) => {
    router.push(`/update-post?id=${postId}`);
  };

  const handleDelete = async (postId: string) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${postId.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== postId);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
