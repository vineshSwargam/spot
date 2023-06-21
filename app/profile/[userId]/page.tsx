"use client";

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";


interface UserProfileProps { };

const UserProfile: React.FC<UserProfileProps> = () => {
  const {data: session} = useSession();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name")!;

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (!session?.user?.id) {
      return;
    }
    
    fetchPosts();
  }, [session?.user]);

  return (
    <Profile
      name={userName}
      data={userPosts}
    />
  );
};

export default UserProfile;
