import { useState, useEffect, useCallback } from "react";

import './styles.css';

import { Post } from "../../components/Post";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length

  const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase())
      }) :
      posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {

    // (async () => {
    //   try {
    //     await handleLoadPosts(0, postsPerPage);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })(); //IIFE (Immediately Invoked Function Expression)

    console.log(new Date().toLocaleString('pt-BR', {}))
    const load = () => {
      handleLoadPosts(0, postsPerPage).catch(error => console.log(error))
    };
    load();
  }, [handleLoadPosts, postsPerPage]) ;

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    setPosts(prevPosts => [...prevPosts, ...nextPosts]);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  return (
      <section className="container">

        <div className="filter-container">
          {!!searchValue && (
              <h1>Search Value: {searchValue}</h1>
          )}
          <TextInput handleChange={handleChange} searchValue={searchValue}/>
        </div>

        {filteredPosts.length > 0 && (
            <Post posts={filteredPosts}/>
        )}

        {filteredPosts.length === 0 && (
            <p>Não existem posts</p>
        )}

        <div className="button-container">
          {!searchValue && (
              <Button disabled={noMorePosts} text={"Load More Posts"} onClick={loadMorePosts} />
          )}
        </div>
      </section>
  );

}