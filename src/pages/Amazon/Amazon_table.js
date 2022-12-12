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
import { getListamazonActions } from "../../actions/amazonActions";

const Amzon_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { amazons } = useSelector((state) => state.amazon);
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
      dataIndex: "amazon_id",
      key: "amazon_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.amazon_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "amazon_user",
      key: "amazon_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "amazon_device",
      key: "amazon_device",
    },
    {
      title: "Lớp",
      dataIndex: "amazon_class",
      key: "amazon_class",
    },
    {
      title: "Limit",
      dataIndex: "amazon_limit",
      key: "amazon_limit",
    },
    {
      title: "active",
      dataIndex: "amazon_active",
      key: "amazon_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "amazondate_sine",
      key: "amazondate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "amazondate_upseller",
      key: "amazondate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "amazon_status",
      key: "amazon_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "amazon_employee",
      key: "amazon_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "amazondate_class",
      key: "amazondate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "amazon_note",
      key: "amazon_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListamazonActions({
        amazon_employee: newValue,
      })
    );
  }

  const getListAmzon = () => {
    dispatch(
      getListamazonActions({
        amazon_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListAmzon();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc eBay">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "amazon_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "amazon_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "amazon_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={amazons}></Table>
      </Card>
    </div>
  );
};

export default Amzon_table;
