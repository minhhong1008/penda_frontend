import {
  Button,
  Card,
  Table,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Collapse,
  Space,
  TreeSelect,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountDevice } from "../../api/device/index";
import { HuongDanDevice_class } from "./Device_list";
const Device_class = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>LỚP</strong>
        </div>
      ),
      dataIndex: "class",
      key: "class",
      render: (text) => (
        <a
          
        >
          {text}
        </a>
      ),
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>TỔNG</strong>
        </div>
      ),
      dataIndex: "device_count",
      key: "device_count",
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>ĐÃ HOÀN THÀNH</strong>
        </div>
      ),
      dataIndex: "content_complete",
      key: "content_complete",
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>THỜI GIAN</strong>
        </div>
      ),
      dataIndex: "content_time",
      key: "content_time",
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>KPI</strong>
        </div>
      ),
      dataIndex: "content_kpi",
      key: "content_kpi",
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>CẦN KIỂM TRA & XỬ LÝ</strong>
        </div>
      ),
      dataIndex: "content_check",
      key: "content_check",
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>CẦN THỰC HIỆN</strong>
        </div>
      ),
      dataIndex: "content_action",
      key: "content_action",
    },
  ];
  const baseData = [
    {
      key: "0",
      class: "PC 0",
      device_count: "0",
      content_complete: (
        <div>
          <strong>TÀI NGUYÊN MỚI</strong>
          <br></br> Device, brower, info, mail, sim, bank..
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra tài nguyên</strong>
          <br></br> Liên hệ quản lý
        </div>
      ),
      content_action: (
        <div>
          <strong>Reg mail, or login mail, xử lý tài nguyên</strong>
          <br></br> Chuyển Lớp 2
        </div>
      ),
    },
    {
      key: "1",
      class: "PC 1",
      device_count: "0",
      content_complete: (
        <div>
          <strong>ĐÃ CÓ TÀI NGUYÊN</strong>
          <br></br> Device, brower, info, mail, sim, bank..
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra tài nguyên</strong>
          <br></br> Liên hệ quản lý
        </div>
      ),
      content_action: (
        <div>
          <strong>Reg mail, or login mail, xử lý tài nguyên</strong>
          <br></br> Chuyển Lớp 2
        </div>
      ),
    },
    {
      key: "2",
      class: "PC 2",
      device_count: "0",
      content_complete: (
        <div>
          <strong> Đã có mail</strong>
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra mail die</strong>
          <br></br> Reg lại mail
        </div>
      ),
      content_action: (
        <div>
          <strong>
            Change info mail, tạo payoneer, paypal, xử lý tài nguyên
          </strong>
          <br></br>Mail recover, mail forward, avatar, verify, bảo mật, view
          <br></br> Chuyển Lớp 3
        </div>
      ),
    },
    {
      key: "3",
      class: "PC 3",
      device_count: "0",
      content_complete: (
        <div>
          <strong> Đã change info mail, đã đầy đủ tài nguyên</strong>
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra mail die</strong>
          <br></br> Reg lại mail
        </div>
      ),
      content_action: (
        <div>
          <strong>Tạo Buyer, mail forward</strong>
          <br></br>mail recover, avatar, verify, bảo mật
          <br></br> Chuyển lớp 4
        </div>
      ),
    },
    {
      key: "4",
      class: "PC 4",
      device_count: "0",
      content_complete: (
        <div>
          <strong> ĐÃ TẠO BUYER</strong>
          <br></br>Device, device, shopee, amazone..
        </div>
      ),
      content_check: (
        <div>
          <strong>Kiểm tra mail die, buyer die</strong>
          <br></br>
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_action: (
        <div>
          <strong>mail recover, avatar, verify, bảo mật</strong>
          <br></br>Change avatar, add cart, add Like, add adress
          <br></br> Chuyển lớp 5
        </div>
      ),
    },
    {
      key: "5",
      class: "PC 5",
      device_count: "0",
      content_complete: (
        <div>
          <strong> Mail hoàn thành, buyer đủ điều kiện verify</strong>
        </div>
      ),
      content_time: <div>1 - 5 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra mail die, buyer die, payoneer, paypal</strong>
          <br></br>
        </div>
      ),
      content_action: (
        <div>
          <strong>Verify buyer, verify payoneer, paypal</strong>
          <br></br>Change avatar, add cart, add Like, add adress
          <br></br> Chuyển lớp 6
        </div>
      ),
    },
    {
      key: "6",
      class: "PC 6",
      device_count: "0",
      content_complete: (
        <div>
          <strong> ĐÃ VERIFY BUYER</strong>
          <br></br>Device, device, shopee, amazone, payoneer, paypal
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: (
        <div>
          <strong> Kiểm tra mail die, buyer die, payoneer, paypal</strong>
        </div>
      ),
      content_action: (
        <div>
          <strong>Change avatar, view, add cart, add Like, policies</strong>
          <br></br>Change avatar,view, add cart, add Like, policies
          <br></br> Chuyển lớp 7
        </div>
      ),
    },
    {
      key: "7",
      class: "PC 7",
      device_count: "0",
      content_complete: (
        <div>
          <strong>Đủ điều kiện lên seller</strong>
          <br></br>
          <br></br>
        </div>
      ),
      content_time: <div>1 - 10 ngày</div>,
      content_check: (
        <div>
          <strong> Kiểm tra mail die, buyer die, payoneer, paypal</strong>
          <br></br>Kiểm tra shopee, amazone..
        </div>
      ),
      content_action: (
        <div>
          <strong>Lên lịch seller, lên lịch list</strong>
          <br></br>Chuẩn bị sản phẩm, bank, card, sim...
          <br></br>View, add cart, add Like, policies
          <br></br> Chuyển lớp 8
        </div>
      ),
    },
    {
      key: "8",
      class: "PC 8",
      device_count: "0",
      content_complete: (
        <div>
          <strong>Đã đầy đủ điều kiến lên seller</strong>
          <br></br>
          <br></br>
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra ip</strong>
          <br></br>Check ip trước khi lên seller
          <br></br>
        </div>
      ),
      content_action: (
        <div>
          <strong>Lên seller</strong>
          <br></br> Tạo drap
          <br></br> Chuyển lớp 9
        </div>
      ),
    },
    {
      key: "9",
      class: "PC 9",
      device_count: "0",
      content_complete: (
        <div>
          <strong> ĐÃ LÊN SELLER</strong>
        </div>
      ),
      content_time: <div>1-10 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra seller</strong>

          <br></br>
        </div>
      ),
      content_action: (
        <div>
          <strong> Verify full...</strong> <br></br> Tạo drap, tiếp tục chăm tài khoản<br></br>Chuyển Lớp
          10
        </div>
      ),
    },
    {
      key: "10",
      class: "PC 10",
      device_count: "0",
      content_complete: (
        <div>
          <strong> Đầy đủ điều kiện list</strong>
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: (
        <div>
        <strong>Kiểm tra seller</strong>

        <br></br>
      </div>
      ),
      content_action: (
        <div>
          <strong> List sản phẩm</strong> <br></br> Tạo drap, tiếp tục chăm tài khoản<br></br>Chuyển Lớp
          11
        </div>
      ),
    },
    {
      key: "11",
      class: "PC 11",
      device_count: "0",
      content_complete: (
        <div>
          <strong> List sản phẩm</strong> <br></br> Tạo drap
        </div>
      ),
      content_time: <div>1-15 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra seller</strong>

          <br></br>
        </div>
      ),
      content_action: (
        <div>
          <strong> List sản phẩm</strong>
          <br></br> Tạo drap, tiếp tục chăm tài khoản<br></br>Chuyển Lớp 12
        </div>
      ),
    },
    {
      key: "12",
      class: "PC 12",
      device_count: "0",
      content_complete: (
        <div>
          <strong> CHUYỂN PHÒNG</strong>
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: <div>
      <strong>Kiểm tra seller</strong>

      <br></br>
    </div>,
      content_action: (
        <div>
          <strong>Chuyển tài khoản về phòng kinh doanh</strong>
          <br></br>
          <br></br>Chuyển Lớp 14
        </div>
      ),
    },
    {
      key: "14",
      class: "PC 14",
      device_count: "0",
      content_complete: (
        <div>
          <strong>Đã chọn phòng kinh doanh</strong>
          <br></br>
          <br></br>
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: (
        <div>
          <strong>Kiểm tra tài khoản</strong>
          <br></br>Tài khoản có vấn đề chuyển lớp 15
          <br></br>Tài khoản chuẩn chuyển lớp 16
        </div>
      ),
      content_action: (
        <div>
          <strong>
            Giao nhận tài khoản giữu phòng sản xuất và phòng kinh doanh
          </strong>
          <br></br> Giao nhân viên phòng kinh doanh, nhân viên KD kiểm tra tài
          khoản
          <br></br>Chuyển Lớp 15 hoặc 16
        </div>
      ),
    },
    {
      key: "15",
      class: "PC 15",
      device_count: "0",
      content_complete: (
        <div>
          <strong>Tài khoản có vấn đề</strong>
          <br></br>
          <br></br>
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: <div>
      <strong>Kiểm tra seller</strong>

      <br></br>
    </div>,
      content_action: (
        <div>
          <strong>
            Xử lý vấn đề tài khoản giữ phòng kinh doanh và phòng sản xuất
          </strong>
          <br></br> Giao nhân viên phòng kinh doanh
          <br></br>Chuyển Lớp 16
        </div>
      ),
    },
    {
      key: "16",
      class: "PC 16",
      device_count: "0",
      content_complete: (
        <div>
          <strong>Tài khoản chuẩn</strong>
          <br></br>
          <br></br>
        </div>
      ),
      content_time: <div>1 ngày</div>,
      content_check: <div>
      <strong>Kiểm tra seller</strong>

      <br></br>
    </div>,
      content_action: (
        <div>
          <strong>Bảo mật tài khoản của phòng kinh doanh</strong>
          <br></br> Chuẩn bị thông tin để bán tài khoản
          <br></br>Chuyển Lớp 17
        </div>
      ),
    },
    {
      key: "17",
      class: "PC 17",
      device_count: "0",
      content_complete: (
        <div>
          <strong>Tài khoản đủ điều kiện bán</strong>
          <br></br>
          <br></br>
        </div>
      ),
      content_time: <div>1 - 15 ngày</div>,
      content_check: <div>
      <strong>Kiểm tra seller</strong>

      <br></br>
    </div>,
      content_action: (
        <div>
          <strong>Giao bán tài khoản</strong>
          <br></br>
          <br></br>Chuyển Lớp 18
        </div>
      ),
    },
    {
      key: "18",
      class: "PC 18",
      device_count: "0",
      content_complete: (
        <div>
          <strong>Khách đã đặt hàng</strong>
          <br></br>
          <br></br>
        </div>
      ),
      content_time: <div>3 giờ</div>,
      content_check: <div>
      <strong>Kiểm tra seller</strong>

      <br></br>
    </div>,
      content_action: (
        <div>
          <strong>Giao tài khoản cho khách hàng</strong>
          <br></br> Làm phiếu bán hàng
          <br></br>Chuyển Lớp 19
        </div>
      ),
    },
    {
      key: "19",
      class: "PC 19",
      device_count: "0",
      content_complete: (
        <div>
          <strong> ĐÃ BÁN TÀI KHOẢN</strong>
        </div>
      ),
      content_check: (
        <div>
          <strong> ĐÃ BÁN TÀI KHOẢN</strong>
        </div>
      ),
      content_action: <div>
      <strong>Chuyển tài khoản sang phòng bảo hành</strong>
      <br></br> 
      <br></br>
    </div>,
    },
    {
      key: "20",
      class: "PC 20",
      device_count: "0",
      content_complete: (
        <div>
          <strong> ERROR</strong>
        </div>
      ),
      content_time: <div>1 - 2 ngày</div>,
      content_check: "Kiểm tra lỗi",
      content_action:<div>
      <strong>Xử lý lỗi và chuyển tài khoản về lớp cũ</strong>
      <br></br> 
      <br></br>
    </div>,
    },
    {
      key: "21",
      class: "PC 21",
      device_count: "0",
      content_complete: (
        <div>
          <strong> BUYER SUSPENDED</strong>
        </div>
      ),
      content_check: "",
      content_action: "",
    },
    {
      key: "22",
      class: "PC 22",
      device_count: "0",
      content_complete: "BUYER SUSPENDED VERIFY",
      content_check: "",
      content_action: "",
    },
    {
      key: "23",
      class: "PC 23",
      device_count: "0",
      content_complete: (
        <div>
          <strong> SELLER RESTRICT</strong>
        </div>
      ),
      content_check: "",
      content_action: "",
    },
    {
      key: "24",
      class: "PC 24",
      device_count: "0",
      content_complete: "SELLER RESTRICT LIST",
      content_check: "",
      content_action: "",
    },
    {
      key: "25",
      class: "PC 25",
      device_count: "0",
      content_complete: "SELLER RESTRICT SOLD",
      content_check: "",
      content_action: "",
    },
    {
      key: "26",
      class: "PC 26",
      device_count: "0",
      content_complete: (
        <div>
          <strong> SELLER SUSPENDED</strong>
        </div>
      ),
      content_check: "",
      content_action: "",
    },
    {
      key: "27",
      class: "PC 27",
      device_count: "0",
      content_complete: "SELLER SUSPENDED LIST",
      content_check: "",
      content_action: "",
    },
    {
      key: "28",
      class: "PC 28",
      device_count: "0",
      content_complete: "SELLER SUSPENDED SOLD",
      content_check: "",
      content_action: "",
    },
    {
      key: "29",
      class: "PC 29",
      device_count: "0",
      content_complete: "",
      content_check: "",
      content_action: "",
    },
    {
      key: "30",
      class: "PC 30",
      device_count: "0",
      content_complete: <div>
      <strong> CHUYỂN PHÒNG</strong>
    </div>,
      content_check: "",
      content_action: "",
    },
  ];

  const [dataClass, setDataClass] = useState();

  const countDevice = async () => {
    let { data } = await getCountDevice();
    baseData.forEach((item) => {
      data?.data?.forEach((data) => {
        if (data._id == item.class) {
          item.device_count = data.count.toString();
        }
      });
    });
    setDataClass(baseData);
  };

  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    countDevice();
  }, []);

  return (
    <div>
      <Card>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="BẢNG TÀI KHOẢN THEO LỚP" key="1">
            <Card type="inner">
              <Table
              onRow={(text, rowIndex) => {
                return {
                  onClick: (event) => {
                    history.push(
                      `device_class/table?class=${encodeURIComponent(
                        text.class
                      )}`
                    );
                  },
                };
              }}
                columns={columns}
                dataSource={dataClass}
                pagination={{
                  pageSizeOptions: [
                    "10",
                    "20",
                    "30",
                    "50",
                    "100",
                    "0",
                    "300",
                    "500",
                    "1000",
                    "00",
                  ],
                  position: ["bottomRight", "topRight"],
                  showSizeChanger: true,
                  defaultPageSize: 19,
                }}
              ></Table>
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="HƯỚNG DẪN" key="2">
            <HuongDanDevice_class />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Device_class;
