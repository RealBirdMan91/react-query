import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

export interface Comment {
  id: number;
  content: string;
  date: string;
  author: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: number;
  date: string;
  comments: Comment[];
  tags?: string[];
}

const BASE_URL = "http://localhost:3004";

export const getPosts = async (obj: QueryFunctionContext<string[], any>) => {
  const response = await axios.get<Post[]>(`${BASE_URL}/posts`);
  return response.data;
};

export const getPost = async (id: string) => {
  const response = await axios.get<Post>(`${BASE_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, "id">) => {
  const response = await axios.post<Post>(`${BASE_URL}/posts`, post);
  return response.data;
};
