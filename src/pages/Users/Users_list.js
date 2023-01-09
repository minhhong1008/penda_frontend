import React from "react";
import { Alert, Divider, Space } from "antd";


export const listselect_timesheets = [
  {
    title: "Ca sáng",
    value: "S",
  },
  {
    title: "Ca chiều",
    value: "C",
  },
  {
    title: "Ca tối",
    value: "T",
  },
  {
    title: "Muộn sáng",
    value: "ms",
  },
  {
    title: "Muộn chiều",
    value: "mc",
  },
  {
    title: "Muộn tối",
    value: "mt",
  },
  {
    title: "Nghỉ sáng",
    value: "nt",
  },
  {
    title: "Nghỉ chiều",
    value: "nc",
  },
  {
    title: "Nghỉ tối",
    value: "nt",
  },
  {
    title: "Xóa ngày",
    value: "delete",
  },
];

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
            <p>
              1. Không được đổi User, chỉ được đổi pass. User không được trùng
              nhau, User sẽ là tên hiển thị ra tất cả các bảng nên đặt tên ngắn
              gọn
            </p>
            <p>
              2. Tài khoản trưởng phòng trở lên hỗ trợ được các tài khoản khác
              chấm công
            </p>
            <p>3. Phải chấm công, chỉnh sửa trước 2 ngày trở lên</p>
            <p>4. 8h15 hoặc 14h15 nhân viên phải đăng nhập vào phần mềm không phần mềm sẽ tự động chấm công nhân viên đó đi muộn</p>
          </>
        }
        type="success"
      />
      <Alert
        message="Hướng dẫn các trường"
        description={
          <>
            <p>1. Chức năng dùng để phân quyền chính trong phần mềm</p>
            <p>2. Phòng ban dùng để phân quyền</p>
            <p>3. Quản lý: dùng để phân quyền</p>
            <p>4. Trạng thái: Dùng để phân loại tài khoản</p>
          </>
        }
        type="info"
      />
      <Alert message="Yêu cầu " description={<></>} type="warning" />
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

export const HuongDanUsers_timesheets = () => {
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
            <p>
              1. Nhân viên đăng ký lịch làm việc từ ngày mùng 1 đến ngày mùng 3
              hàng tháng.
            </p>
            <p>
              2. Nhân viên chỉ sửa được lịch đăng ký sau 3 ngày tính từ ngày sửa.
            </p>
            <p>
              3. Đi muộn sau 8h15 sẽ bị trừ 1/4 ca, nghỉ không phép bị trừ 2 ca,
              xin nghỉ trong thời gian nhỏ hơn 2 ngày bị trừ 1/4 ca.
            </p>
            <p>
              4. Ký hiệu: mc muộn sáng, mc muộn chiều, mt muộn tối, ns nghỉ không
              phép sáng, nc nghỉ không phép chiều, nt nghỉ không phép tối.
            </p>
            <p>
              5. Nếu người quản lý phát hiện chấm công không đúng với thực tế thì người chấm công và người quản lý chấm công đều bị trừ 10 ca.
            </p>
          </>
        }
        type="success"
      />
      <Alert message="Hướng dẫn các trường" description={<></>} type="info" />
      <Alert message="Yêu cầu " description={<></>} type="warning" />
      <Alert
        message="Kiểm tra & xử lý số liệu"
        description={<></>}
        type="error"
      />
    </Space>
  );
};
