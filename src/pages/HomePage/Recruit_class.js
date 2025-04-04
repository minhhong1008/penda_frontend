import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import { Row, Col, Card, Avatar } from "antd";
import { listBlog } from "../../api/blog";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";

const Recruit_class = () => {
  const history = useHistory();
  const [data, setData] = useState();
  const { Meta } = Card;

  const getListBlog = async () => {
    let response = await listBlog({ blog_page: "recruit_class" });
    let data = response.data;
    if (data.length > 0) {
      setData(data);
    }
  };

  useEffect(() => {
    getListBlog();
  }, []);

  return (
    <div>
      <Row gutter={[24, 0]}>
        {data?.map((item, index) => {
          return (
            <Col xs={12} xl={6} className="mb-24" key={index}>
              <Card
              
                actions={[
                  <div className="demo-option-label-item">
                    {dayjs(item.blog_date).format("YYYY-MM-DD")}
                  </div>,
                  <div className="demo-option-label-item">
                    {item.blog_sort}
                  </div>,
                  <EditOutlined
                  hoverable
                    key="edit"
                    onClick={() => {
                      history.push(`/blog/homeedit_content/${item._id}`);
                    }}
                  />,
                ]}
              >
                <Meta
                 
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "#7265e6",
                        verticalAlign: "middle",
                      }}
                      size={40}
                    >
                      {item.blog_employee}{" "}
                    </Avatar>
                  }
                  title={item.blog_title}
                  description={item.blog_date}
                  style={{ height: 80 }}
                />
                <div className="demo-option-label-item">
                  {item.blog_description}
                </div>

                <img
                 
                  alt="example"
                  src={item.blog_thumbnail}
                  style={{ height: 240, width:600 }}
                  onClick={() => {
                    history.push(`/blog/home_content/${item._id}`);
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

export default Recruit_class;
