//import React from 'react'
import {
  Button,
  Card,
  Table,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Collapse,
  Space,
  TreeSelect,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getListdeviceActions } from "../../actions/deviceActions";

const Device_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { devices } = useSelector((state) => state.device);
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
      dataIndex: "device_id",
      key: "device_id",
      render: (text, record) => (
        <a
          onClick={() =>
            history.push(`table/${encodeURIComponent(record.device_id)}`)
          }
        >
          {text}
        </a>
      ),
      sorter: (a, b) => {
        return a.device_id.localeCompare(b.device_id);
      },
    },
    {
      title: "Tài khoản",
      dataIndex: "device_user",
      key: "device_user",
      sorter: (a, b) => {
        return a.device_user.localeCompare(b.device_user);
      },
    },
    {
      title: "Thiết bị",
      dataIndex: "device_device",
      key: "device_device",
      sorter: (a, b) => {
        return a.device_user.localeCompare(b.device_device);
      },
    },
    {
      title: "Lớp",
      dataIndex: "device_class",
      key: "device_class",
      sorter: (a, b) => {
        return a.device_user.localeCompare(b.device_class);
      },
    },
    {
      title: "Limit",
      dataIndex: "device_limit",
      key: "device_limit",
      sorter: (a, b) => {
        return a.device_user.localeCompare(b.device_limit);
      },
      
    },
    {
      title: "active",
      dataIndex: "device_active",
      key: "device_active",
      sorter: (a, b) => {
        return a.device_user.localeCompare(b.device_active);
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "devicedate_sine",
      key: "devicedate_sine",
      sorter: (a, b) => {
        return a.device_user.localeCompare(b.devicedate_sine);
      },
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "devicedate_upseller",
      key: "devicedate_upseller",
      sorter: (a, b) => {
        return a.device_user.localeCompare(b.devicedate_upseller);
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "device_status",
      key: "device_status",
      sorter: (a, b) => {
        return a.device_user.localeCompare(b.device_status);
      },
    },
    {
      title: "Nhân viên",
      dataIndex: "device_employee",
      key: "device_employee",
      sorter: (a, b) => {
        return a.device_user.localeCompare(b.device_employee);
      },
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "devicedate_class",
      key: "devicedate_class",
      sorter: (a, b) => {
        return a.device_user.localeCompare(b.devicedate_class);
      },
    },
    
    {
      title: "Ghi chú",
      dataIndex: "device_note",
      key: "device_note",
      sorter: (a, b) => {
        return a.device_user.localeCompare(b.device_note);
      },
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListdeviceActions({
        device_employee: newValue,
      })
    );
  };

  const getListDevice = () => {
    dispatch(
      getListdeviceActions({
        device_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListDevice();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc device">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "device_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "device_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "device_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table
          columns={columns}
          dataSource={devices}
          pagination={{
            pageSizeOptions: ["10","20","30","50","100", "200", "300", "500","1000","2000"],
            position: ["bottomRight", "topRight"],
            showSizeChanger: true,
            defaultPageSize: 100,
          }}
        ></Table>
      </Card>
    </div>
  );
};

export default Device_table;
