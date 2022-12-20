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
import { getListbankActions } from "../../actions/bankActions";

const Bank_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { banks } = useSelector((state) => state.bank);
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
      dataIndex: "bank_id",
      key: "bank_id",
      render: (text, record) => (
        <a
          onClick={() =>
            history.push(`table/${encodeURIComponent(record.bank_id)}`)
          }
        >
          {text}
        </a>
      ),
      sorter: (a, b) => {
        return a.bank_id.localeCompare(b.bank_id);
      },
    },
    {
      title: "Tài khoản",
      dataIndex: "bank_user",
      key: "bank_user",
      sorter: (a, b) => {
        return a.bank_user.localeCompare(b.bank_user);
      },
    },
    {
      title: "Thiết bị",
      dataIndex: "bank_bank",
      key: "bank_bank",
      sorter: (a, b) => {
        return a.bank_user.localeCompare(b.bank_bank);
      },
    },
    {
      title: "Lớp",
      dataIndex: "bank_class",
      key: "bank_class",
      sorter: (a, b) => {
        return a.bank_user.localeCompare(b.bank_class);
      },
    },
    {
      title: "Limit",
      dataIndex: "bank_limit",
      key: "bank_limit",
      sorter: (a, b) => {
        return a.bank_user.localeCompare(b.bank_limit);
      },
      
    },
    {
      title: "active",
      dataIndex: "bank_active",
      key: "bank_active",
      sorter: (a, b) => {
        return a.bank_user.localeCompare(b.bank_active);
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "bankdate_sine",
      key: "bankdate_sine",
      sorter: (a, b) => {
        return a.bank_user.localeCompare(b.bankdate_sine);
      },
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "bankdate_upseller",
      key: "bankdate_upseller",
      sorter: (a, b) => {
        return a.bank_user.localeCompare(b.bankdate_upseller);
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "bank_status",
      key: "bank_status",
      sorter: (a, b) => {
        return a.bank_user.localeCompare(b.bank_status);
      },
    },
    {
      title: "Nhân viên",
      dataIndex: "bank_employee",
      key: "bank_employee",
      sorter: (a, b) => {
        return a.bank_user.localeCompare(b.bank_employee);
      },
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "bankdate_class",
      key: "bankdate_class",
      sorter: (a, b) => {
        return a.bank_user.localeCompare(b.bankdate_class);
      },
    },
    
    {
      title: "Ghi chú",
      dataIndex: "bank_note",
      key: "bank_note",
      sorter: (a, b) => {
        return a.bank_user.localeCompare(b.bank_note);
      },
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListbankActions({
        bank_employee: newValue,
      })
    );
  };

  const getListBank = () => {
    dispatch(
      getListbankActions({
        bank_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListBank();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc bank">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "bank_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "bank_bank",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "bank_employee",
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
          dataSource={banks}
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

export default Bank_table;
