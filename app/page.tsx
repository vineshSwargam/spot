import Feed from '@components/Feed';
import React from 'react';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <section className='w-full flex flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <p className='orange_gradient text-center'>Your Music</p>
      </h1>
      <p className='desc text-center'>
        Spot is an Open Source Music Discovery and Sharing Platform for
        Audiophiles. Create posts showing your love for a song, singer,
        song-writer, or producer, and add links to where others can listen to
        them!
      </p>
      <Feed />
    </section>
  );
};

export default Home;
