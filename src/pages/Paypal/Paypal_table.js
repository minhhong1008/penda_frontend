//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListpaypalActions } from "../../actions/paypalActions";

const Paypal_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { paypals } = useSelector((state) => state.paypal);
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
      dataIndex: "paypal_id",
      key: "paypal_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.paypal_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "paypal_user",
      key: "paypal_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "paypal_device",
      key: "paypal_device",
    },
    {
      title: "Lớp",
      dataIndex: "paypal_class",
      key: "paypal_class",
    },
    {
      title: "Limit",
      dataIndex: "paypal_limit",
      key: "paypal_limit",
    },
    {
      title: "active",
      dataIndex: "paypal_active",
      key: "paypal_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "paypaldate_sine",
      key: "paypaldate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "paypaldate_upseller",
      key: "paypaldate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "paypal_status",
      key: "paypal_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "paypal_employee",
      key: "paypal_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "paypaldate_class",
      key: "paypaldate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "paypal_note",
      key: "paypal_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListpaypalActions({
        paypal_employee: newValue,
      })
    );
  }

  const getListpaypal = () => {
    dispatch(
      getListpaypalActions({
        paypal_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListpaypal();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc paypal">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "paypal_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "paypal_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "paypal_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={paypals}></Table>
      </Card>
    </div>
  );
};

export default Paypal_table