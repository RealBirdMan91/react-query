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
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError && error instanceof Error)
    return <div>Error: {error.message}</div>;

  return (
    <ul>
      {sortPostsByDate(data!).map((post, idx) => (
        <PostItem key={idx} {...post} />
      ))}
    </ul>
  );
}

export default BlogList;
