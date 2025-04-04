import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Row, Col, Card, Avatar } from "antd";
import { listBlog } from "../../api/blog";
import Meta from "antd/es/card/Meta";
import { useHistory } from "react-router-dom";

const Company = () => {
  const history = useHistory();
  const [data, setData] = useState();
  const { Meta } = Card;

  const getListBlog = async () => {
    let response = await listBlog();
    let data = response.data;
    if (data.length > 0) {
      setData(data);
    }
  };

  useEffect(() => {
    getListBlog();
  }, []);

  return (
    <div className="blog">
      <Row gutter={[24, 0]}>
        {data?.map((item, index) => {
          return (
            <Col xs={12} xl={6} className="mb-24" key={index}>
              <Card
                cover={<img alt="example" src={item.blog_thumbnail} style={{ height: 200 }} onClick={() => {
                  history.push(`blog/${item._id}`);
                }} />}
                actions={[
                  <SettingOutlined key="setting" onClick={() => {
                    history.push(`blog/${item._id}`);
                  }} />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
                
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" >{item.blog_employee}</Avatar>}
                  title={item.blog_title}
                  description={item.blog_description}
                  onClick={() => {
                    history.push(`blog/${item._id}`);
                  }}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Company;
