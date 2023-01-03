import React from "react";
import { Alert, Divider, Space } from "antd";
export const HuongDanUsers_info = () => {
    return (
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Alert
          message="Tổng quan"
          description={
            <>
              
            </>
          }
          type="success"
        />
        <Alert
          message="Hướng dẫn các trường"
          description={
            <>
              <p>
                1. Chức năng dùng để phân quyền chính trong phần mềm
              </p>
              <p>
                2. Phòng ban dùng để phân quyền 
              </p>
              <p>3. Quản lý: dùng để phân quyền</p>
              <p>4. Trạng thái: Dùng để phân loại tài khoản</p>
            </>
          }
          type="info"
        />
        <Alert
          message="Yêu cầu "
          description={
            <>
              
            </>
          }
          type="warning"
        />
        <Alert
          message="Kiểm tra & xử lý số liệu"
          description={
            <>
              <p>
                1. Kiểm tra tiến trình của tài khoản có phù hợp với lớp không?
              </p>
              <p>2. Kiểm tra và xử lý các phát sinh của tài khoản</p>
            </>
          }
          type="error"
        />
      </Space>
    );
  };