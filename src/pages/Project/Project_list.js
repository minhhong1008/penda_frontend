import { Alert, Space } from "antd";

export const listselect_project_error = ["Gặp sự cố"];

export const listselect_project_processing = [
  "Bắt đầu",
  "Thực hiện",
  "Đã xong",
  "Kiểm tra",
  "Hoàn thành",
  "Quá khó",
  "Hơi khó",
  "Đơn giản",
  "Vướng mắc",
  "Quá hạn",
];

export const listselect_project_work = [
  "Tài nguyên",
  "Dữ liệu",
  "Thiết bị",
  "Code",
  "Tạo mục tiêu",
  "Lên kế hoạch",
  "Nghiên cứu",
  "Tester",
  "Mua sắm",
  "Giao việc",
  "Báo cáo",
  "Kiểm tra",
];
export const listselect_project_review = [
  "Không hoàn thành",
  "Hoàn thành",
  "Hoàn thành xuất sắc",
];
export const listselect_project_type = [
  "Giao việc",
  "QT - CB",
  "QT 0 CB",
  "CB 0 QT",
  "0 CB 0 QT",
];

export const listselect_project_work_item = [
  "Sản xuất",
  "Nhân sự",
  "Tài chính",
  "Kế hoạch",
  "Kinh doanh",
  "Công nghệ",
  "Cá nhân",
];

export const listselect_project_owner = [
  "Phòng sản xuất",
  "Phòng phục hồi",
  "Phòng Kinh doanh",
  "Phòng nâng cấp",
  "Kho lưu trữ",
  "Phòng kế toán quản trị",
  "Phòng kế hoạch",
  "Phòng hành chính nhân sự",
];

export const listselect_project_status = [
  "Bắt đầu",
  "Đang thực hiện",
  "Chưa hoàn thành",
  "Đang vướng mắc",
  "Đã hoàn thành",
  "Không cần làm",
  "Việc cá nhân",
  //Lưu ý có đặt điều kiện trong project.js controller nên sửa ở đây phải sửa cả controller
];

export const HuongDanProject_info = () => {
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
            <p>1. Hạng mục là: Đầu mục công việc</p>
            <p>
              2. Công việc là: Làm cái gì ở đầu mục công việc được chọn (VD: Hạng
              mục: Nhân sự - Công việc: Giao việc, Báo cáo, Kiểm tra; Hạng mục:
              Tài chính - Công việc: Mua sắm)
            </p>
            <p>3. Nội dung là: Nội dung công việc. Tối đa 50 ký tự</p>
            <p>
              4. Chọn Hạng mục và công việc khoa học thì quản lý mới dễ dàng
            </p>
          </>
        }
        type="success"
      />
      <Alert
        message="Tính năng tự động "
        description={
          <>
            <p>1. Bảng info:</p>
            <p>
             
              Khi chọn nhân viên để giao việc, tự động điền tên nhân viên và tên
              người giao.
            </p>
            <p>2. Bảng table:</p>
            <p>
              Click nút tạo sẽ tự động tạo ra 1 bản, sau đó vào sửa thông tin
              công việc.
            </p>
            <p>
              Thời gian hiển thị đang để là trước 15 ngày và sau 15 ngày, muốn
              thay đổi chọn lọc ngày và ấn search.
            </p>
            <p>Tự động báo quá hạn khi thời hạn đã hết</p>
            <p>Tự động báo QT - CB khi thời hạn còn 2 ngày</p>
            <p>
              Từ trưởng phòng sẽ được full quyền, nhân viên chỉ vào được bản của
              nhân viên đó.
            </p>
            <p>
              Phần mềm sẽ dùng số lượng công việc theo chỉ tiêu "Chủ động", "Đã
              hoàn thành", "Độ khó" để đánh giá hiệu quả nhân sự tốt và ngược lại "Giao việc", "Quá hạn", "Chưa hoàn thành" để đánh giá kém hiệu quả.
            </p>
            <p>

            </p>
          </>
        }
        type="info"
      />
      
      <Alert
        message="Kiểm tra & xử lý số liệu"
        description={
        <>
        <p>
              1. Yêu cầu nhập liệu phải chuẩn, nhập nội dung đúng chính tả, viết hoa chữ cái đầu, trình bầy gọn gàng sạch đẹp.
            </p>
        </>}
        type="error"
      />
    </Space>
  );
};

export const HuongDanProject_table = () => {
  return (
    <div>
      <p>1. project mã EB_12345</p>
      <p>
        1. project được tạo từ tool - nhập liệu - Chọn EBAY, bảng bên cạnh nhập
        user|pass (user: là tên shop project chuẩn bị sẵn, có hướng dẫn tạo acc
        bên tool nhập liệu)
      </p>
      <p>
        2. Quy trình: là kế hoạch triển khai acc theo các yêu cầu định sẵn. Kế
        hoạch được tạo khi tạo mã project từ tool nhập liệu
      </p>
      <p>
        3. Tiến trình: Là quá trình thực hiện công việc của nhân viên. Từ tiến
        trình ta biết được acc đang làm đến hạng mục nào, nếu suspend thì biết
        được suspend ở hạng mục nào, dùng để tạo báo cáo, phân loại acc
      </p>
      <p>
        4. Loại project: Là tổng quan 1 tài khoản project, dùng để tạo báo cáo,
        phân loại acc
      </p>
      <p>5. Trạng thái bán: Dùng để phân loại tài khoản của phòng kinh doanh</p>
      <p>6. Sở hữu: Dùng để phân quyền các phòng ban theo acc</p>
      <p>7. Nhân viên: Dùng để phân quyền nhân viên theo acc</p>
      <p>
        8. Trạng thái: Dùng để xác định trạng thái của acc, tạo báo cáo, phân
        loại acc
      </p>
      <p>
        9. Lớp project: Dùng để xác định tổng quan các hạng mục đã triển khai,
        dùng tạo báo cáo, phân loại acc
      </p>
      <p>
        10. Upload ảnh: Dùng để upload câu hỏi bảo mật, upload ảnh project
        suspended, tải cccd
      </p>
      <p>
        11. Click vào loại acc trong bảng THÔNG TIN TÀI NGUYÊN: chuyển đến trang
        chi tiết của tài nguyên đó
      </p>
      <br></br>
      <p>
        Tính năng: Khi chọn suspend + upload ảnh + Lớp nhỏ hơn 9 - tự động
        chuyển acc về lớp 20, tự động điền ngày suspend, tự động chọn suspended
        trong tiến trình,tự động thêm phòng phục hồi tài khoản, tự động disable
        tất cả các field{" "}
      </p>
      <p>
        Tính năng: Khi chọn suspend + upload ảnh + Lớp lớn hơn 8 - tự động
        chuyển acc về lớp 21, tự động điền ngày suspend, tự động chọn suspended
        trong tiến trình,tự động thêm phòng phục hồi tài khoản, tự động disable
        tất cả các field{" "}
      </p>
      <p>
        Khi chọn tiến trình thì tự động điền ngày tưng ứng với tiến trình được
        chọn, tự động điền ngày chuyển lớp khi chuyển lớp{" "}
      </p>
      <p>Khi ấn lưu - tự động ghi lại lịch sử: user|lớp cũ|ngày tháng</p>
      <p>
        Để tạo 1 acc project or etsy... trên 1 device thì vào device đó ấn tạo
        project or etsy...
      </p>
      <p>
        Để thay đổi field của nhiều acc 1 lúc, hoặc xem báo cáo cơ bản thì vào
        phần tool- xử lý số liệu - filter{" "}
      </p>
      <p>Thông tin tài nguyên: acc nào suspend thì icon chuyển về mầu xám</p>
      <br></br>
      <p>
        Ctrl + /;Shift + Alt + A (comment);Ctrl + Shift + [;Ctrl + K, Ctrl +
        0;Ctrl + K, Ctrl + J;Ctrl + K, Ctrl + [;Ctrl + K, Ctrl + ];{" "}
      </p>
    </div>
  );
};

export const HuongDanProject_class = () => {
  return (
    <div>
      <p>1. project mã EB_12345</p>
      <p>
        1. project được tạo từ tool - nhập liệu - Chọn EBAY, bảng bên cạnh nhập
        user|pass (user: là tên shop project chuẩn bị sẵn, có hướng dẫn tạo acc
        bên tool nhập liệu)
      </p>
      <p>
        2. Quy trình: là kế hoạch triển khai acc theo các yêu cầu định sẵn. Kế
        hoạch được tạo khi tạo mã project từ tool nhập liệu
      </p>
      <p>
        3. Tiến trình: Là quá trình thực hiện công việc của nhân viên. Từ tiến
        trình ta biết được acc đang làm đến hạng mục nào, nếu suspend thì biết
        được suspend ở hạng mục nào, dùng để tạo báo cáo, phân loại acc
      </p>
      <p>
        4. Loại project: Là tổng quan 1 tài khoản project, dùng để tạo báo cáo,
        phân loại acc
      </p>
      <p>5. Trạng thái bán: Dùng để phân loại tài khoản của phòng kinh doanh</p>
      <p>6. Sở hữu: Dùng để phân quyền các phòng ban theo acc</p>
      <p>7. Nhân viên: Dùng để phân quyền nhân viên theo acc</p>
      <p>
        8. Trạng thái: Dùng để xác định trạng thái của acc, tạo báo cáo, phân
        loại acc
      </p>
      <p>
        9. Lớp project: Dùng để xác định tổng quan các hạng mục đã triển khai,
        dùng tạo báo cáo, phân loại acc
      </p>
      <p>
        10. Upload ảnh: Dùng để upload câu hỏi bảo mật, upload ảnh project
        suspended, tải cccd
      </p>
      <p>
        11. Click vào loại acc trong bảng THÔNG TIN TÀI NGUYÊN: chuyển đến trang
        chi tiết của tài nguyên đó
      </p>
      <br></br>
      <p>
        Tính năng: Khi chọn suspend + upload ảnh + Lớp nhỏ hơn 9 - tự động
        chuyển acc về lớp 20, tự động điền ngày suspend, tự động chọn suspended
        trong tiến trình,tự động thêm phòng phục hồi tài khoản, tự động disable
        tất cả các field{" "}
      </p>
      <p>
        Tính năng: Khi chọn suspend + upload ảnh + Lớp lớn hơn 8 - tự động
        chuyển acc về lớp 21, tự động điền ngày suspend, tự động chọn suspended
        trong tiến trình,tự động thêm phòng phục hồi tài khoản, tự động disable
        tất cả các field{" "}
      </p>
      <p>
        Khi chọn tiến trình thì tự động điền ngày tưng ứng với tiến trình được
        chọn, tự động điền ngày chuyển lớp khi chuyển lớp{" "}
      </p>
      <p>Khi ấn lưu - tự động ghi lại lịch sử: user|lớp cũ|ngày tháng</p>
      <p>
        Để tạo 1 acc project or etsy... trên 1 device thì vào device đó ấn tạo
        project or etsy...
      </p>
      <p>
        Để thay đổi field của nhiều acc 1 lúc, hoặc xem báo cáo cơ bản thì vào
        phần tool- xử lý số liệu - filter{" "}
      </p>
      <p>Thông tin tài nguyên: acc nào suspend thì icon chuyển về mầu xám</p>
      <br></br>
      <p>
        Ctrl + /;Shift + Alt + A (comment);Ctrl + Shift + [;Ctrl + K, Ctrl +
        0;Ctrl + K, Ctrl + J;Ctrl + K, Ctrl + [;Ctrl + K, Ctrl + ];{" "}
      </p>
    </div>
  );
};
