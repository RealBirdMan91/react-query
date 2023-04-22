import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/posts";
import { getUser } from "../api/users";

function SinglePost() {
  const { id } = useParams();

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    data: postData,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id!),
  });

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
    data: userData,
  } = useQuery({
    queryKey: ["users", postData?.author!],
    enabled: postData?.author !== undefined,
    queryFn: () => getUser(postData?.author!),
  });

  const isLoading = isLoadingPost || isLoadingUser;
  const isError = isErrorPost || isErrorUser;
  const error = errorPost || errorUser;

  if (isLoading) return <div>Loading...</div>;

  if (isError && error instanceof Error)
    return <div>Error: {error.message}</div>;

  console.log({ userData, postData });

  return (
    <div>
      <h1>{userData?.username}</h1>
    </div>
  );
}

export default SinglePost;
