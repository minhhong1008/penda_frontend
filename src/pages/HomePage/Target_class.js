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
import { useSelector } from "react-redux";

const Target_class = () => {
  const history = useHistory();
  const [data, setData] = useState();
  const { Meta } = Card;
  const { users_function } = useSelector((state) => state.auth);
  const getListBlog = async () => {
    let response = await listBlog({ blog_page: "target_class" });
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
      {["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(users_function) !=
      -1 ? (
        <Row gutter={[24, 0]}>
          {data?.map((item, index) => {
            return (
              <Col xs={12} xl={6} className="mb-24" key={index}>
                <Card
                  cover={
                    <img
                      alt="example"
                      src={item.blog_thumbnail}
                      style={{ height: 200 }}
                      onClick={() => {
                        history.push(`/blog/home_content/${item._id}`);
                      }}
                    />
                  }
                  actions={[
                    <div className="demo-option-label-item">
                      {dayjs(item.blog_date).format("YYYY-MM-DD")}
                    </div>,
                    <div className="demo-option-label-item">
                      {item.blog_sort}
                    </div>,
                    <EditOutlined
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
                    description={item.blog_description}
                    style={{ height: 100 }}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : null}
    </div>
  );
};

export default Target_class;
