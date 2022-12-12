//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListfacebookActions } from "../../actions/facebookActions";

const Facebook_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { facebooks } = useSelector((state) => state.facebook);
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
      dataIndex: "facebook_id",
      key: "facebook_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.facebook_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "facebook_user",
      key: "facebook_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "facebook_device",
      key: "facebook_device",
    },
    {
      title: "Lớp",
      dataIndex: "facebook_class",
      key: "facebook_class",
    },
    {
      title: "Limit",
      dataIndex: "facebook_limit",
      key: "facebook_limit",
    },
    {
      title: "active",
      dataIndex: "facebook_active",
      key: "facebook_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "facebookdate_sine",
      key: "facebookdate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "facebookdate_upseller",
      key: "facebookdate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "facebook_status",
      key: "facebook_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "facebook_employee",
      key: "facebook_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "facebookdate_class",
      key: "facebookdate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "facebook_note",
      key: "facebook_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListfacebookActions({
        facebook_employee: newValue,
      })
    );
  }

  const getListfacebook = () => {
    dispatch(
      getListfacebookActions({
        facebook_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListfacebook();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc facebook">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "facebook_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "facebook_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "facebook_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={facebooks}></Table>
      </Card>
    </div>
  );
};

export default Facebook_table