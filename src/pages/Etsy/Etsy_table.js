//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
      dataIndex: "etsy_user",
      key: "etsy_user",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.etsy_user)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "etsy_user",
      key: "etsy_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "etsy_device",
      key: "etsy_device",
    },
    {
      title: "Lớp",
      dataIndex: "etsy_class",
      key: "etsy_class",
    },
    {
      title: "Limit",
      dataIndex: "etsy_limit",
      key: "etsy_limit",
    },
    {
      title: "active",
      dataIndex: "etsy_active",
      key: "etsy_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "etsydate_sine",
      key: "etsydate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "etsydate_upseller",
      key: "etsydate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "etsy_status",
      key: "etsy_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "etsy_employee",
      key: "etsy_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "etsydate_class",
      key: "etsydate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "etsy_note",
      key: "etsy_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListetsyActions({
        etsy_employee: newValue,
      })
    );
  }

  const getListetsy = () => {
    dispatch(
      getListetsyActions({
        etsy_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListetsy();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc etsy">
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
        <Table columns={columns} dataSource={etsys}></Table>
      </Card>
    </div>
  );
};

export default Etsy_table