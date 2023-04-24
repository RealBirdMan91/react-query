import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Post, getPosts } from "../api/posts";

import PostItem from "../components/PostItem";

function sortPostsByDate(posts: Post[]) {
  return posts.sort(function (a, b) {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
  });
}

function BlogList() {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError && error instanceof Error)
    return <div>Error: {error.message}</div>;

  if (!data) {
    throw new Error("Data should be defined");
  }
  //invariant(data, "Data should be defined");
  /*An invariant function takes a value, 
  and if the value is falsy then the invariant function will throw. 
  If the value is truthy, then the function will not throw.
  https://www.npmjs.com/package/tiny-invariant?activeTab=readme*/

  return (
    <ul>
      {sortPostsByDate(data).map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </ul>
  );
}

export default BlogList;
