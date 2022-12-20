//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListproxyActions } from "../../actions/proxyActions";

const Proxy_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { proxys } = useSelector((state) => state.proxy);
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
      dataIndex: "proxy_id",
      key: "proxy_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.proxy_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "proxy_user",
      key: "proxy_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "proxy_device",
      key: "proxy_device",
    },
    {
      title: "Lớp",
      dataIndex: "proxy_class",
      key: "proxy_class",
    },
    {
      title: "Limit",
      dataIndex: "proxy_limit",
      key: "proxy_limit",
    },
    {
      title: "active",
      dataIndex: "proxy_active",
      key: "proxy_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "proxydate_sine",
      key: "proxydate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "proxydate_upseller",
      key: "proxydate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "proxy_status",
      key: "proxy_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "proxy_employee",
      key: "proxy_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "proxydate_class",
      key: "proxydate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "proxy_note",
      key: "proxy_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListproxyActions({
        proxy_employee: newValue,
      })
    );
  }

  const getListproxy = () => {
    dispatch(
      getListproxyActions({
        proxy_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListproxy();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc proxy">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "proxy_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "proxy_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "proxy_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={proxys}></Table>
      </Card>
    </div>
  );
};

export default Proxy_table