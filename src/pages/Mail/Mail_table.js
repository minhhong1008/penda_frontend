//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListmailActions } from "../../actions/mailActions";

const Mail_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { mails } = useSelector((state) => state.mail);
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
      dataIndex: "mail_id",
      key: "mail_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.mail_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "mail_user",
      key: "mail_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "mail_device",
      key: "mail_device",
    },
    {
      title: "Lớp",
      dataIndex: "mail_class",
      key: "mail_class",
    },
    {
      title: "Limit",
      dataIndex: "mail_limit",
      key: "mail_limit",
    },
    {
      title: "active",
      dataIndex: "mail_active",
      key: "mail_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "maildate_sine",
      key: "maildate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "maildate_upseller",
      key: "maildate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "mail_status",
      key: "mail_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "mail_employee",
      key: "mail_employee",
     
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "maildate_class",
      key: "maildate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "mail_note",
      key: "mail_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListmailActions({
        mail_employee: newValue,
      })
    );
  }

  const getListmail = () => {
    dispatch(
      getListmailActions({
        mail_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListmail();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc mail">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "mail_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "mail_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "mail_employee",
              
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={mails} > </Table>
      </Card>
    </div>
  );
};

export default Mail_table