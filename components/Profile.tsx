import React from 'react';
import PostCard, { Post } from './PostCard';

interface ProfileProps {
  name?: string;
  data: Post[];
  handleEdit?(id: string): void;
  handleDelete?(id: string): void;
}

const Profile: React.FC<ProfileProps> = ({ name = 'My', data, handleEdit, handleDelete }) => {
    return (
      <section className='w-full'>
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{name} Profile</span>
        </h1>
        <p className='desc text-left'>
        Welcome to your personalized profile page. Share your love for music and introduce others to your tastes!
        </p>
  
        <div className='mt-10 prompt_layout'>
          {data.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post._id)}
              handleDelete={() => handleDelete && handleDelete(post._id)}
            />
          ))}
        </div>
      </section>
    );
  };
  
  export default Profile;
