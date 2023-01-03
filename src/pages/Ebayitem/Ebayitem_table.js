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
import { getListebayitemActions } from "../../actions/ebayitemActions";

const Ebayitem_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { ebayitems } = useSelector((state) => state.ebayitem);
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
      dataIndex: "ebayitem_id",
      key: "ebayitem_id",
      render: (text, record) => (
        <a
          onClick={() =>
            history.push(`table/${encodeURIComponent(record.ebayitem_id)}`)
          }
        >
          {text}
        </a>
      ),
      sorter: (a, b) => {
        return a.ebayitem_id.localeCompare(b.ebayitem_id);
      },
    },
    {
      title: "Tài khoản",
      dataIndex: "ebayitem_user",
      key: "ebayitem_user",
      sorter: (a, b) => {
        return a.ebayitem_user.localeCompare(b.ebayitem_user);
      },
    },
    {
      title: "Thiết bị",
      dataIndex: "ebayitem_device",
      key: "ebayitem_device",
      sorter: (a, b) => {
        return a.ebayitem_user.localeCompare(b.ebayitem_device);
      },
    },
    {
      title: "Lớp",
      dataIndex: "ebayitem_class",
      key: "ebayitem_class",
      sorter: (a, b) => {
        return a.ebayitem_user.localeCompare(b.ebayitem_class);
      },
    },
    {
      title: "Limit",
      dataIndex: "ebayitem_limit",
      key: "ebayitem_limit",
      sorter: (a, b) => {
        return a.ebayitem_user.localeCompare(b.ebayitem_limit);
      },
      
    },
    {
      title: "active",
      dataIndex: "ebayitem_active",
      key: "ebayitem_active",
      sorter: (a, b) => {
        return a.ebayitem_user.localeCompare(b.ebayitem_active);
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "ebayitemdate_sine",
      key: "ebayitemdate_sine",
      sorter: (a, b) => {
        return a.ebayitem_user.localeCompare(b.ebayitemdate_sine);
      },
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "ebayitemdate_upseller",
      key: "ebayitemdate_upseller",
      sorter: (a, b) => {
        return a.ebayitem_user.localeCompare(b.ebayitemdate_upseller);
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "ebayitem_status",
      key: "ebayitem_status",
      sorter: (a, b) => {
        return a.ebayitem_user.localeCompare(b.ebayitem_status);
      },
    },
    {
      title: "Nhân viên",
      dataIndex: "ebayitem_employee",
      key: "ebayitem_employee",
      sorter: (a, b) => {
        return a.ebayitem_user.localeCompare(b.ebayitem_employee);
      },
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "ebayitemdate_class",
      key: "ebayitemdate_class",
      sorter: (a, b) => {
        return a.ebayitem_user.localeCompare(b.ebayitemdate_class);
      },
    },
    
    {
      title: "Ghi chú",
      dataIndex: "ebayitem_note",
      key: "ebayitem_note",
      sorter: (a, b) => {
        return a.ebayitem_user.localeCompare(b.ebayitem_note);
      },
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListebayitemActions({
        ebayitem_employee: newValue,
      })
    );
  };

  const getListEbayitem = () => {
    dispatch(
      getListebayitemActions({
        ebayitem_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListEbayitem();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc eBay">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionlabelprop="label"
          treeData={[
            {
              title: "Lớp",
              value: "ebayitem_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "ebayitem_device",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "ebayitem_employee",
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
          dataSource={ebayitems}
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

export default Ebayitem_table;
