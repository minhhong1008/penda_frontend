import React from "react";
import { Alert, Divider, Space } from "antd";

export const listselect_working_session = [
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
            <p>
              4. 8h15 hoặc 14h15 nhân viên phải đăng nhập vào phần mềm không
              phần mềm sẽ tự động chấm công nhân viên đó đi muộn
            </p>
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
        message={
          <>
            <strong>1. Đăng ký lịch làm việc:</strong>
          </>
        }
        description={
          <>
            <p>
              - Nhân viên đăng ký lịch làm việc từ ngày mùng 1 đến ngày mùng 3
              hàng tháng. Nhân viên đi làm ca không đăng ký sẽ không chấm công
              được.
            </p>
            <p>
              - Nhân viên chỉ sửa được lịch đăng ký sau 3 ngày tính từ ngày sửa
              ( ngày hiện tại).
            </p>
            <p>
              - Ký hiệu: S hoàn thành ca sáng, C hoàn thành ca chiều, T hoàn
              thành ca tối.
            </p>
            <p>
              - Ký hiệu: Bs bắt đầu ca sáng, Bc bắt đầu ca chiều, Bt bắt đầu ca
              tối.
            </p>
            <p>
              - Ký hiệu: ps xin nghỉ có phép ca sáng, pc xin nghỉ có phép ca
              chiều, pt xin nghỉ có phép ca tối.
            </p>
            <p>- Ký hiệu: m đi muộn.</p>
            <p>
              - Ký hiệu: Ns nghỉ không phép sáng, Nc nghỉ không phép chiều, Nt
              nghỉ không phép tối.
            </p>
            <p>- Công ty không có ca khác giờ quy định.</p>
            <p>
              - Nhân viên chấm công trên matbiec.penda.vn. Và thường xuyên theo
              dõi chấm công của mọi người.
            </p>
            <p>- Phần mềm sẽ tự động chấm công và tính toán.</p>
          </>
        }
        type="success"
      />
      <Alert
        message={
          <>
            {" "}
            <strong>2. Quy chế:</strong>
          </>
        }
        description={
          <>
            <p>
              - Ca sáng : 8h -12h, thời gian chấm công từ 8h00-8h15, Thời gian
              chấm kết thúc ca : 12h00 - 12h15.
            </p>
            <p>
              - Ca chiều : 14h -18h, thời gian chấm công từ 14h00-14h15, Thời
              gian chấm kết thúc ca : 18h00 - 18h15.
            </p>
            <p>
              - Ca tối : 18h30 -22h30, thời gian chấm công từ 18h00-18hh45. Thời
              gian chấm kết thúc ca : 22h30 - 22h45.
            </p>
            <p>- Đi muộn sẽ bị trừ 1/4 ca, về sớm bị trừ 1/4 ca.</p>
            <p>
              - Xin nghỉ trong thời gian nhỏ hơn 3 ngày cố định (ngày cố định là
              ngày nhân viên không sửa được trong bảng đăng ký) bị trừ 1/4 ca.
            </p>
            <p>- Nghỉ không phép bị trừ 2 ca.</p>

            <p>
              - Nếu người quản lý phát hiện gian lận trong chấm công.(VD: Chấm
              công khi không có mặt ở công ty, nhờ người khác chấm công hộ) Thì
              người chấm công bị trừ 10 ca.
            </p>
          </>
        }
        type="info"
      />
      <Alert message="Yêu cầu " description={<></>} type="warning" />
      <Alert
        message="Kiểm tra & xử lý số liệu"
        description={<></>}
        type="error"
      />
    </Space>
  );
};
