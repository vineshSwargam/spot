"use client";
import { useEffect, useState } from "react";
import PostCard, { Post } from './PostCard';


interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState();
  const [searchedResults, setSearchedResults] = useState<Post[]>();

  const fetchPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string): Post[] => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.content)
    );
  };

  const handleSearchChange = (e: any) => {
    // clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500)
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  
  const filteredPosts = searchedResults || posts;

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <div className='mt-16 prompt_layout'>
        {filteredPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </section>
  );
};

export default Feed;

