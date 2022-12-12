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
import { getListpayoneerActions } from "../../actions/payoneerActions";

const Payoneer_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { payoneers } = useSelector((state) => state.payoneer);
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
      dataIndex: "payoneer_id",
      key: "payoneer_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.payoneer_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "payoneer_user",
      key: "payoneer_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "payoneer_device",
      key: "payoneer_device",
    },
    {
      title: "Lớp",
      dataIndex: "payoneer_class",
      key: "payoneer_class",
    },
    {
      title: "Limit",
      dataIndex: "payoneer_limit",
      key: "payoneer_limit",
    },
    {
      title: "active",
      dataIndex: "payoneer_active",
      key: "payoneer_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "payoneerdate_sine",
      key: "payoneerdate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "payoneerdate_upseller",
      key: "payoneerdate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "payoneer_status",
      key: "payoneer_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "payoneer_employee",
      key: "payoneer_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "payoneerdate_class",
      key: "payoneerdate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "payoneer_note",
      key: "payoneer_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListpayoneerActions({
        payoneer_employee: newValue,
      })
    );
  }

  const getListPayoneer = () => {
    dispatch(
      getListpayoneerActions({
        payoneer_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListPayoneer();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc payoneer">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "payoneer_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "payoneer_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "payoneer_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={payoneers}></Table>
      </Card>
    </div>
  );
};

export default Payoneer_table;
