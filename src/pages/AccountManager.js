import { Button, Card, Col, Form, Input, Modal, Row, Spin, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepartmentAction,
  getListDepartmentAction,
  removeDepartmentAction,
} from "../actions/departmentActions";
import Swal from "sweetalert2";
// Sửa dòng dưới và dòng dưới cùng giống tên file AccountManager
// Vào file app.js để import
const AccountManager = () => {
  const columns = [
    {
      title: "TÊN PHÒNG BAN",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SỐ NHÂN VIÊN",
      dataIndex: "employees_number",
      key: "employees_number",
    },
    {
      title: "HÀNH ĐỘNG",
      key: "action",
      dataIndex: "action",
      render: (index, record) => (
        <div key={index}>
          <Button>Sửa</Button>{" "}
          <Button onClick={() => onHandleRemove(record._id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  const [visibleModal, setVisibleModal] = React.useState(false);
  const [departmentName, setDepartmentName] = React.useState("");
  const dispatch = useDispatch();
  const { listDepartment } = useSelector((state) => state.department);
  const { loading } = useSelector((state) => state.department);

  const getListDepartment = () => {
    dispatch(getListDepartmentAction());
  };

  React.useEffect(() => {
    getListDepartment();
  }, []);

  const onOk = () => {
    dispatch(
      addDepartmentAction({ name: departmentName, employees_number: 0 })
    );
    setVisibleModal(false);
  };

  const onCancel = () => {
    setVisibleModal(false);
  };

  const onChangeDepartmentName = (e) => {
    setDepartmentName(e.target.value);
  };

  const onHandleRemove = (id) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa phòng ban này?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Xóa",
      denyButtonText: `Không Xóa`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeDepartmentAction({ id }));
      } else if (result.isDenied) {
        Swal.fire("Bạn đã hủy hành động", "", "info");
      }
    });
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Spin tip="Loading..." spinning={loading}>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: 'Hãy nhập vào họ và tên!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Ebay ID"
                name="id_ebay"
                rules={[{ required: true, message: 'Hãy nhập vào id ebay!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="adress"
                rules={[{ required: true, message: 'Hãy nhập vào địa chỉ!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Modal
          title="Thêm Phòng Ban"
          centered
          onOk={onOk}
          onCancel={onCancel}
          open={visibleModal}
        >
          Tên phòng ban{" "}
          <Input
            value={departmentName}
            onChange={onChangeDepartmentName}
            placeholder={"Nhập tên"}
          />
        </Modal>
      </div>
    </Spin>
  );
};

export default AccountManager;
