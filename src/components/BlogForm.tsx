import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Post, createPost } from "../api/posts";

function BlogForm() {
  const initialState = {
    title: "",
    content: "",
    tags: "",
  };
  const [formState, setFormState] = useState(initialState);

  const queryClient = useQueryClient();

  /*   const { data, error, isLoading, isSuccess, ...postMutation } = useMutation<
    Post,
    Error,
    { test: "hi" }
  >({
    mutationFn: (variables) => {
      console.log(variables);
      return createPost({
        ...formState,
        tags: formState.tags.split(", "),
        author: 1,
        date: new Date().toISOString(),
        comments: [],
      });
    },
    onMutate: (variables) => {
      console.log("I run first");
      return { fromMutate: "hi" };
    },
    onSuccess: (data, variables, context) => {
      console.log(data, variables, context);
      queryClient.invalidateQueries(["posts"], { exact: true });
      setFormState(initialState);
    },
  }); */

  const { data, error, isLoading, isSuccess, ...postMutation } = useMutation({
    mutationFn: (state: typeof formState) => {
      return createPost({
        ...state,
        tags: state.tags.split(", "),
        author: 1,
        date: new Date().toISOString(),
        comments: [],
      });
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["posts"], { exact: true });
      setFormState(initialState);
    },
  });

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    postMutation.mutate(formState);
  }

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          value={formState.title}
          onChange={(e) =>
            setFormState({ ...formState, title: e.target.value })
          }
          type="text"
          name="title"
          id="title"
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          value={formState.content}
          onChange={(e) =>
            setFormState({ ...formState, content: e.target.value })
          }
          name="content"
          id="content"
          rows={3}
          cols={25}
        />
      </div>
      <div>
        <label htmlFor="tags">Tags</label>
        <input
          value={formState.tags}
          onChange={(e) => setFormState({ ...formState, tags: e.target.value })}
          type="text"
          name="title"
          id="title"
        />
        <small>Separate tags with commas</small>
      </div>
      <button
        className="px-6 py-2 bg-purple-500 disabled:bg-slate-400"
        disabled={isLoading}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default BlogForm;
