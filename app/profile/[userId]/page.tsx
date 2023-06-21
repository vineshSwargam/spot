"use client";

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";


interface UserProfileProps { 
  params: {
    userId: string;
  }
};

const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const userName = searchParams.get("name")!;

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.userId}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };
    
    fetchPosts();
  }, [params.userId]);

  return (
    <Profile
      name={userName}
      data={userPosts}
    />
  );
};

export default UserProfile;
