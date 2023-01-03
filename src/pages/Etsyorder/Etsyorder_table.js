//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListetsyorderActions } from "../../actions/etsyorderActions";

const Etsyorder_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { etsyorders } = useSelector((state) => state.etsyorder);
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
      dataIndex: "etsyorder_id",
      key: "etsyorder_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.etsyorder_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "etsyorder_user",
      key: "etsyorder_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "etsyorder_device",
      key: "etsyorder_device",
    },
    {
      title: "Lớp",
      dataIndex: "etsyorder_class",
      key: "etsyorder_class",
    },
    {
      title: "Limit",
      dataIndex: "etsyorder_limit",
      key: "etsyorder_limit",
    },
    {
      title: "active",
      dataIndex: "etsyorder_active",
      key: "etsyorder_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "etsyorderdate_sine",
      key: "etsyorderdate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "etsyorderdate_upseller",
      key: "etsyorderdate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "etsyorder_status",
      key: "etsyorder_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "etsyorder_employee",
      key: "etsyorder_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "etsyorderdate_class",
      key: "etsyorderdate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "etsyorder_note",
      key: "etsyorder_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListetsyorderActions({
        etsyorder_employee: newValue,
      })
    );
  }

  const getListetsyorder = () => {
    dispatch(
      getListetsyorderActions({
        etsyorder_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListetsyorder();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc etsyorder">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionlabelprop="label"
          treeData={[
            {
              title: "Lớp",
              value: "etsyorder_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "etsyorder_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "etsyorder_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={etsyorders}></Table>
      </Card>
    </div>
  );
};

export default Etsyorder_table