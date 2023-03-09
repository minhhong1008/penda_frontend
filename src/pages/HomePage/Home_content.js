import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailBlog } from "../../api/blog";
import './home_content.css'

const Home_content = () => {
  let { id } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { users_function } = useSelector((state) => state.auth);

  const getContent = async () => {
    let response = await detailBlog(id);
    let data = response.data;
    if(data.blog_view == "Privacy" && users_function !="Giám đốc"){
      return;
    }else{
      setContent(data.blog_content);
    }
    
    setTitle(data.blog_title);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <Card>
      <div className="blog_content">
        <div>{title}</div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>

    </Card>
  );
};

export default Home_content;
