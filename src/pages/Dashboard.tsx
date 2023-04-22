import React from "react";
import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";

function Dashboard() {
  return (
    <div>
      <h1 className="text-5xl">Dashboard</h1>
      <BlogForm />
      <BlogList />
    </div>
  );
}

export default Dashboard;
