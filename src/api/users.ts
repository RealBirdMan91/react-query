import axios from "axios";

export interface Comment {
  id: number;
  content: string;
  date: string;
  author: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

const BASE_URL = "http://localhost:3004";

export const getUser = async (id: number) => {
  const response = await axios.get<User>(`${BASE_URL}/users/${id}`);
  return response.data;
};
