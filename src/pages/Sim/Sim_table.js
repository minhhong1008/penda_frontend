//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListsimActions } from "../../actions/simActions";

const Sim_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { sims } = useSelector((state) => state.sim);
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
      dataIndex: "sim_id",
      key: "sim_id",
      render: (text, record) => (
        <a onClick={() => history.push(`table/${encodeURIComponent(record.sim_id)}`)}>{text}</a>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "sim_user",
      key: "sim_user",
    },
    {
      title: "Thiết bị",
      dataIndex: "sim_device",
      key: "sim_device",
    },
    {
      title: "Lớp",
      dataIndex: "sim_class",
      key: "sim_class",
    },
    {
      title: "Limit",
      dataIndex: "sim_limit",
      key: "sim_limit",
    },
    {
      title: "active",
      dataIndex: "sim_active",
      key: "sim_active",
    },
    {
      title: "Ngày tạo",
      dataIndex: "simdate_sine",
      key: "simdate_sine",
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "simdate_upseller",
      key: "simdate_upseller",
    },
    {
      title: "Trạng thái",
      dataIndex: "sim_status",
      key: "sim_status",
    },
    {
      title: "Nhân viên",
      dataIndex: "sim_employee",
      key: "sim_employee",
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "simdate_class",
      key: "simdate_class",
    },
    {
      title: "Ghi chú",
      dataIndex: "sim_note",
      key: "sim_note",
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(',');
    dispatch(
      getListsimActions({
        sim_employee: newValue,
      })
    );
  }

  const getListsim = () => {
    dispatch(
      getListsimActions({
        sim_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListsim();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc sim">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "sim_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "sim_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "sim_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table columns={columns} dataSource={sims}></Table>
      </Card>
    </div>
  );
};

export default Sim_table