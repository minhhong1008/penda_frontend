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
  import { getListebayorderActions } from "../../actions/ebayorderActions";
  
  const Ebayorder_table = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const { ebayorders } = useSelector((state) => state.ebayorder);
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
        dataIndex: "ebayorder_id",
        key: "ebayorder_id",
        render: (text, record) => (
          <a onClick={() => history.push(`table/${encodeURIComponent(record.ebayorder_id)}`)}>{text}</a>
        ),
      },
      {
        title: "Tài khoản",
        dataIndex: "ebayorder_user",
        key: "ebayorder_user",
      },
      {
        title: "Thiết bị",
        dataIndex: "ebayorder_device",
        key: "ebayorder_device",
      },
      {
        title: "Lớp",
        dataIndex: "ebayorder_class",
        key: "ebayorder_class",
      },
      {
        title: "Limit",
        dataIndex: "ebayorder_limit",
        key: "ebayorder_limit",
      },
      {
        title: "active",
        dataIndex: "ebayorder_active",
        key: "ebayorder_active",
      },
      {
        title: "Ngày tạo",
        dataIndex: "ebayorderdate_sine",
        key: "ebayorderdate_sine",
      },
      {
        title: "Ngày UpSeller",
        dataIndex: "ebayorderdate_upseller",
        key: "ebayorderdate_upseller",
      },
      {
        title: "Trạng thái",
        dataIndex: "ebayorder_status",
        key: "ebayorder_status",
      },
      {
        title: "Nhân viên",
        dataIndex: "ebayorder_employee",
        key: "ebayorder_employee",
      },
      {
        title: "Ngày chuyển lớp",
        dataIndex: "ebayorderdate_class",
        key: "ebayorderdate_class",
      },
      {
        title: "Ghi chú",
        dataIndex: "ebayorder_note",
        key: "ebayorder_note",
      },
    ];
  
    const handleChangeFilter = (values) => {
      let newValue = values.join(',');
      dispatch(
        getListebayorderActions({
          ebayorder_employee: newValue,
        })
      );
    }
  
    const getListEbayorder = () => {
      dispatch(
        getListebayorderActions({
          ebayorder_class: class_name,
        })
      );
    };
  
    useEffect(() => {
      getListEbayorder();
    }, [class_name]);
  
    return (
      <div>
        <Form.Item label="Lọc eBayorder">
          <TreeSelect
            mode="multiple"
            onChange={handleChangeFilter}
            multiple
            optionlabelprop="label"
            treeData={[
              {
                title: "Lớp",
                value: "ebayorder_class",
                children: [
                  { title: "Lớp 1", value: "Lớp 1" },
                  { title: "Lớp 2", value: "Lớp 2" },
                ],
              },
              {
                title: "Thiết bị",
                value: "ebayorder_device",
                children: [
                  { title: "PC06", value: "PC06" },
                  { title: "PC07", value: "PC07" },
                ],
              },
              {
                title: "Nhân viên",
                value: "ebayorder_employee",
                children: [
                  { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                  { title: "Khắc Liêm", value: "Khắc Liêm" },
                ],
              },
            ]}
          />
        </Form.Item>
        <Card type="inner">
          <Table columns={columns} dataSource={ebayorders}></Table>
        </Card>
      </div>
    );
  };
  
  export default Ebayorder_table;
  