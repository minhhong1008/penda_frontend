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
import { getListebayActions } from "../../actions/ebayActions";

const Ebay_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { ebays } = useSelector((state) => state.ebay);
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
      dataIndex: "ebay_id",
      key: "ebay_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.ebay_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "ebay_user",
      key: "ebay_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "ebay_device",
      key: "ebay_device",
    },
    {
      title: "Lớp",
      dataIndex: "ebay_class",
      key: "ebay_class",
    },
    {
      title: "Limit",
      dataIndex: "ebay_limit",
      key: "ebay_limit",
    },
    {
      title: "active",
      dataIndex: "ebay_active",
      key: "ebay_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ebaydate_sine",
      key: "ebaydate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "ebaydate_upseller",
      key: "ebaydate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "ebay_status",
      key: "ebay_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "ebay_employee",
      key: "ebay_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "ebaydate_class",
      key: "ebaydate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "ebay_note",
      key: "ebay_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListebayActions({
        ebay_employee: newValue,
      })
    );
  }

  const getListEbay = () => {
    dispatch(
      getListebayActions({
        ebay_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListEbay();
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
              value: "ebay_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "ebay_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "ebay_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={ebays}></Table>
      </Card>
    </div>
  );
};

export default Ebay_table;
