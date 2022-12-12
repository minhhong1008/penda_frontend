//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListtiktokActions } from "../../actions/tiktokActions";

const Tiktok_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { tiktoks } = useSelector((state) => state.tiktok);
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
      dataIndex: "tiktok_id",
      key: "tiktok_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.tiktok_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "tiktok_user",
      key: "tiktok_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "tiktok_device",
      key: "tiktok_device",
    },
    {
      title: "Lớp",
      dataIndex: "tiktok_class",
      key: "tiktok_class",
    },
    {
      title: "Limit",
      dataIndex: "tiktok_limit",
      key: "tiktok_limit",
    },
    {
      title: "active",
      dataIndex: "tiktok_active",
      key: "tiktok_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "tiktokdate_sine",
      key: "tiktokdate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "tiktokdate_upseller",
      key: "tiktokdate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "tiktok_status",
      key: "tiktok_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "tiktok_employee",
      key: "tiktok_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "tiktokdate_class",
      key: "tiktokdate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "tiktok_note",
      key: "tiktok_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListtiktokActions({
        tiktok_employee: newValue,
      })
    );
  }

  const getListtiktok = () => {
    dispatch(
      getListtiktokActions({
        tiktok_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListtiktok();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc tiktok">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "tiktok_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "tiktok_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "tiktok_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={tiktoks}></Table>
      </Card>
    </div>
  );
};

export default Tiktok_table