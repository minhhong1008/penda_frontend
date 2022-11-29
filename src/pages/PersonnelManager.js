import React from "react";

import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  TreeSelect,
  Input,
  Spin,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getListUserAction } from "../actions/userActions";
import { getUser, showError } from "../utils/index.js";
import { Excel } from "antd-table-saveas-excel";

const columns = [
  {
    title: "HỌ VÀ TÊN",
    dataIndex: "name",
    key: "name",
    width: "20%",
  },
  {
    title: "NGÀY SINH",
    dataIndex: "birth_date",
    key: "birth_date",
  },
  {
    title: "CHỨC VỤ",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "SỐ CĂN CƯỚC",
    key: "identity_card_number",
    dataIndex: "identity_card_number",
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "HÀNH ĐỘNG",
    key: "action",
    dataIndex: "action",
    render: () => (
      <>
        <Button>Sửa</Button> <Button>Vô Hiệu</Button>
      </>
    ),
  },
];

const columnsExport = [
  {
    title: "Họ và tên",
    dataIndex: "name",
    key: "name",
    value: "name",
  },
  {
    title: "Ngày sinh",
    dataIndex: "birth_date",
    key: "birth_date",
    value: "birth_date",
  },
  {
    title: "Chức vụ",
    dataIndex: "role",
    key: "role",
    value: "role",
  },
  {
    title: "Số căn cước",
    key: "identity_card_number",
    dataIndex: "identity_card_number",
    value: "identity_card_number",
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
    value: "email",
  },
  {
    title: "Ngân hàng",
    key: "bank_name",
    dataIndex: "bank_name",
    value: "bank_name",
  },
  {
    title: "Số tài khoản",
    key: "bank_number",
    dataIndex: "bank_number",
    value: "bank_number",
  },
];

function PersonelManager() {
  const dispatch = useDispatch();
  const { _id } = JSON.parse(getUser());
  const { data } = useSelector((state) => state.user.listUser);
  const { loading } = useSelector((state) => state.user);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [filter, setFilter] = React.useState(["name"]);
  const [fileName, setFileName] = React.useState("");
  React.useEffect(() => {
    getListUser();
  }, []);
  const getListUser = () => {
    dispatch(getListUserAction(_id));
  };

  const handleExport = () => {
    setModalVisible(true);
  };

  const changeFilter = (value) => {
    setFilter(value);
  };

  const onCancel = () => {
    setModalVisible(false);
    setFilter("name");
  };

  const onChangeFileName = (e) => {
    setFileName(e.target.value);
  };

  const onOk = () => {
    if (fileName !== "") {
      let newFilter = [];
      columnsExport.map((item) => {
        filter.map((fill) => {
          if (item.key === fill) {
            newFilter.push(item);
          }
        });
      });
      const excel = new Excel();
      excel
        .addSheet("test")
        .addColumns(newFilter)
        .addDataSource(data, { str2Percent: true })
        .saveAs(fileName + ".xlsx");
      setModalVisible(false);
      setFilter("name");
      setFileName("");
    } else {
      showError("Vui lòng nhập tên File");
    }
  };

  return (
    <Spin tip="Loading..." spinning={loading}>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Nhân Sự"
              extra={
                <>
                  <Button
                    onClick={() => {
                      handleExport();
                    }}
                    color="dark"
                  >
                    Xuất File
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
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
          className="filter-export"
          centered
          visible={modalVisible}
          title="Chọn những trường xuất file"
          onOk={onOk}
          onCancel={onCancel}
        >
          <Input
            placeholder="Tên File"
            className="mb-2"
            onChange={onChangeFileName}
            value={fileName}
          />
          <TreeSelect
            treeData={columnsExport}
            value={filter}
            treeCheckable
            placeholder={"Chọn các trường"}
            onChange={changeFilter}
            style={{
              width: "100%",
            }}
          />
        </Modal>
      </div>
    </Spin>
  );
}

export default PersonelManager;
