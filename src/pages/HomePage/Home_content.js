import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { detailBlog } from "../../api/blog";

const Home_content = () => {
  let { id } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const getContent = async () => {
    let response = await detailBlog(id);
    let data = response.data;
    setContent(data.blog_content);
    setTitle(data.blog_title);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
  );
};

export default Home_content;