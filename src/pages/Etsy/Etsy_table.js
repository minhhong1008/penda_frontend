//import React from 'react'
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getListetsyActions } from "../../actions/etsyActions";

const Etsy_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { etsys } = useSelector((state) => state.etsy);
  const class_name = urlParams.get("class");
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "#",
      dataIndex: "etsy_id",
      key: "etsy_id",
      render: (text, record) => (
        <a
          onClick={() =>
            history.push(`table/${encodeURIComponent(record.etsy_id)}`)
          }
        >
          {text}
        </a>
      ),
      sorter: (a, b) => {
        return a.etsy_id.localeCompare(b.etsy_id);
      },
    },
    {
      title: "Tài khoản",
      dataIndex: "etsy_user",
      key: "etsy_user",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsy_user);
      },
    },
    {
      title: "Thiết bị",
      dataIndex: "etsy_device",
      key: "etsy_device",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsy_device);
      },
    },
    {
      title: "Lớp",
      dataIndex: "etsy_class",
      key: "etsy_class",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsy_class);
      },
    },
    {
      title: "Limit",
      dataIndex: "etsy_limit",
      key: "etsy_limit",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsy_limit);
      },
      
    },
    {
      title: "active",
      dataIndex: "etsy_active",
      key: "etsy_active",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsy_active);
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "etsydate_sine",
      key: "etsydate_sine",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsydate_sine);
      },
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "etsydate_upseller",
      key: "etsydate_upseller",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsydate_upseller);
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "etsy_status",
      key: "etsy_status",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsy_status);
      },
    },
    {
      title: "Nhân viên",
      dataIndex: "etsy_employee",
      key: "etsy_employee",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsy_employee);
      },
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "etsydate_class",
      key: "etsydate_class",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsydate_class);
      },
    },
    
    {
      title: "Ghi chú",
      dataIndex: "etsy_note",
      key: "etsy_note",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsy_note);
      },
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListetsyActions({
        etsy_employee: newValue,
      })
    );
  };

  const getListEtsy = () => {
    dispatch(
      getListetsyActions({
        etsy_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListEtsy();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc Etsy">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "etsy_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "etsy_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "etsy_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table
          columns={columns}
          dataSource={etsys}
          pagination={{
            pageSizeOptions: ["10","20","30","50","100", "200", "300", "500","1000","2000"],
            position: ["bottomRight", "topRight"],
            showSizeChanger: true,
            defaultPageSize: 100,
          }}
        ></Table>
      </Card>
    </div>
  );
};

export default Etsy_table;
