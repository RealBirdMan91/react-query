import React from "react";
import { Link } from "react-router-dom";

import { type Post } from "../api/posts";

function PostItem({ title, date, content, id, tags }: Post) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <article>
      <h3>{title}</h3>
      <time dateTime={date}>{formattedDate.slice(0, 10)}</time>
      {tags &&
        tags.length !== 0 &&
        tags.map((tag, idx) => <small key={idx}>#{tag} </small>)}
      <p>{content.slice(0, 250)}...</p>
      <Link to={`/blog/${id}`} className="py-2 px-6 bg-purple-500">
        See full post
      </Link>
    </article>
  );
}

export default PostItem;
