import { Button, Card, Col, Input, Modal, Row, Spin, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepartmentAction,
  getListDepartmentAction,
  removeDepartmentAction,
} from "../actions/departmentActions";
import Swal from "sweetalert2";

const DepartmentManager = () => {
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

  return (
    <Spin tip="Loading..." spinning={loading}>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Phòng Ban"
              extra={
                <>
                  <Button
                    color="dark"
                    onClick={() => {
                      setVisibleModal(true);
                    }}
                  >
                    Thêm Phòng Ban
                  </Button>
                  {"  "}
                  <Button color="dark">Xuất File</Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={listDepartment}
                  pagination={false}
                  className="ant-border-space"
                  rowKey={(record) => {
                    return record._id;
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>
        <Modal
          title="Thêm Phòng Ban"
          centered
          onOk={onOk}
          onCancel={onCancel}
          visible={visibleModal}
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

export default DepartmentManager;
