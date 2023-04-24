import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/posts";
import { getUser } from "../api/users";

function SinglePost() {
  const { id } = useParams();

  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    error: errorPosts,
    data: dataPosts,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id!),
  });

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["users", dataPosts?.author],
    enabled: dataPosts?.author !== undefined,
    queryFn: () => getUser(dataPosts?.author!),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>error</div>;

  if (!dataPosts) {
    throw new Error("Data is undefined");
  }

  return (
    <div>
      <article>
        <h2>{dataPosts.author}</h2>
        <p>{dataPosts.content}</p>
        <div>{dataPosts.author}</div>
      </article>
    </div>
  );
}

export default SinglePost;
