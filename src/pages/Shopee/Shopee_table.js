//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListshopeeActions } from "../../actions/shopeeActions";

const Shopee_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { shopees } = useSelector((state) => state.shopee);
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
      dataIndex: "shopee_id",
      key: "shopee_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.shopee_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "shopee_user",
      key: "shopee_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "shopee_device",
      key: "shopee_device",
    },
    {
      title: "Lớp",
      dataIndex: "shopee_class",
      key: "shopee_class",
    },
    {
      title: "Limit",
      dataIndex: "shopee_limit",
      key: "shopee_limit",
    },
    {
      title: "active",
      dataIndex: "shopee_active",
      key: "shopee_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "shopeedate_sine",
      key: "shopeedate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "shopeedate_upseller",
      key: "shopeedate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "shopee_status",
      key: "shopee_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "shopee_employee",
      key: "shopee_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "shopeedate_class",
      key: "shopeedate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "shopee_note",
      key: "shopee_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListshopeeActions({
        shopee_employee: newValue,
      })
    );
  }

  const getListshopee = () => {
    dispatch(
      getListshopeeActions({
        shopee_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListshopee();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc shopee">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "shopee_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "shopee_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "shopee_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={shopees}></Table>
      </Card>
    </div>
  );
};

export default Shopee_table