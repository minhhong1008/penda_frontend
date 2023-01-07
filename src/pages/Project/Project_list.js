import icondevice from "../../assets/images/iconSocial/icondevice.jpg";
import iconproxy from "../../assets/images/iconSocial/iconproxy.jpg";
import iconinfo from "../../assets/images/iconSocial/iconinfo.png";
import iconmail from "../../assets/images/iconSocial/iconmail.png";
import iconsim from "../../assets/images/iconSocial/iconsim.jpg";
import iconbank from "../../assets/images/iconSocial/iconbank.jpg";
import iconebay from "../../assets/images/iconSocial/iconebay.jpg";
import iconetsy from "../../assets/images/iconSocial/iconetsy.png";
import iconamazon from "../../assets/images/iconSocial/iconamazon.png";
import iconshopee from "../../assets/images/iconSocial/iconshopee.png";
import iconfacebook from "../../assets/images/iconSocial/iconfacebook.png";
import icontiktok from "../../assets/images/iconSocial/icontiktok.png";
import iconpayoneer from "../../assets/images/iconSocial/iconpayoneer.png";
import iconpaypal from "../../assets/images/iconSocial/iconpaypal.png";
import iconpingpong from "../../assets/images/iconSocial/iconpingpong.jpg";

export const listselect_project_error = [
  "Gặp sự cố",
];

export const listselect_project_processing = [
  "Bắt đầu",
  "Thực hiện",
  "Đã xong",
  "Kiểm tra",
  "Hoàn thành",
];

export const listselect_project_work = [
  "Tài nguyên",
  "Dữ liệu",
  "Thiết bị",
  "Hoạt động",
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
  "Tài chính",
  "Kinh doanh",
  "Sản xuất",
  "Kế hoạch",
  "Nhân sự",
];

export const listselect_project_owner = [
  "Phòng sản xuất",
  "Phòng phục hồi",
  "Phòng Kinh doanh",
  "Phòng nâng cấp",
  "Kho lưu trữ",
];

export const listselect_project_status = [
  "Bắt đầu",
  "Chưa hoàn thành",
  "Đang vướng mắc",
  "Đã hoàn thành",
  "Không cần làm",
];

export const HuongDanProject_info = () => {
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
