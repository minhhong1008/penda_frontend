import { Card } from "antd";
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
    <Card>
      <div className="blog_content">
        <div className="title">{title}</div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </Card>
  );
};

export default Home_content;
