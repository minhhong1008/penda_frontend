//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListetsyitemActions } from "../../actions/etsyitemActions";

const Etsyitem_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { etsyitems } = useSelector((state) => state.etsyitem);
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
      dataIndex: "etsyitem_id",
      key: "etsyitem_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.etsyitem_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "etsyitem_user",
      key: "etsyitem_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "etsyitem_device",
      key: "etsyitem_device",
    },
    {
      title: "Lớp",
      dataIndex: "etsyitem_class",
      key: "etsyitem_class",
    },
    {
      title: "Limit",
      dataIndex: "etsyitem_limit",
      key: "etsyitem_limit",
    },
    {
      title: "active",
      dataIndex: "etsyitem_active",
      key: "etsyitem_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "etsyitemdate_sine",
      key: "etsyitemdate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "etsyitemdate_upseller",
      key: "etsyitemdate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "etsyitem_status",
      key: "etsyitem_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "etsyitem_employee",
      key: "etsyitem_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "etsyitemdate_class",
      key: "etsyitemdate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "etsyitem_note",
      key: "etsyitem_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListetsyitemActions({
        etsyitem_employee: newValue,
      })
    );
  }

  const getListetsyitem = () => {
    dispatch(
      getListetsyitemActions({
        etsyitem_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListetsyitem();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc etsyitem">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "etsyitem_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "etsyitem_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "etsyitem_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={etsyitems}></Table>
      </Card>
    </div>
  );
};

export default Etsyitem_table