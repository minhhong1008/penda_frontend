//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListinfoActions } from "../../actions/infoActions";

const Info_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { infos } = useSelector((state) => state.info);
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
      dataIndex: "info_id",
      key: "info_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.info_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "info_user",
      key: "info_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "info_device",
      key: "info_device",
    },
    {
      title: "Lớp",
      dataIndex: "info_class",
      key: "info_class",
    },
    {
      title: "Limit",
      dataIndex: "info_limit",
      key: "info_limit",
    },
    {
      title: "active",
      dataIndex: "info_active",
      key: "info_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "infodate_sine",
      key: "infodate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "infodate_upseller",
      key: "infodate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "info_status",
      key: "info_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "info_employee",
      key: "info_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "infodate_class",
      key: "infodate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "info_note",
      key: "info_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListinfoActions({
        info_employee: newValue,
      })
    );
  }

  const getListinfo = () => {
    dispatch(
      getListinfoActions({
        info_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListinfo();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc info">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "info_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "info_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "info_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={infos}></Table>
      </Card>
    </div>
  );
};

export default Info_table