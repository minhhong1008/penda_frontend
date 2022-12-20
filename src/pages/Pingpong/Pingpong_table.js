//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListpingpongActions } from "../../actions/pingpongActions";

const Pingpong_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { pingpongs } = useSelector((state) => state.pingpong);
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
      dataIndex: "pingpong_id",
      key: "pingpong_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.pingpong_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "pingpong_user",
      key: "pingpong_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "pingpong_device",
      key: "pingpong_device",
    },
    {
      title: "Lớp",
      dataIndex: "pingpong_class",
      key: "pingpong_class",
    },
    {
      title: "Limit",
      dataIndex: "pingpong_limit",
      key: "pingpong_limit",
    },
    {
      title: "active",
      dataIndex: "pingpong_active",
      key: "pingpong_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "pingpongdate_sine",
      key: "pingpongdate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "pingpongdate_upseller",
      key: "pingpongdate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "pingpong_status",
      key: "pingpong_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "pingpong_employee",
      key: "pingpong_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "pingpongdate_class",
      key: "pingpongdate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "pingpong_note",
      key: "pingpong_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListpingpongActions({
        pingpong_employee: newValue,
      })
    );
  }

  const getListpingpong = () => {
    dispatch(
      getListpingpongActions({
        pingpong_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListpingpong();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc pingpong">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "pingpong_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "pingpong_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "pingpong_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={pingpongs}></Table>
      </Card>
    </div>
  );
};

export default Pingpong_table