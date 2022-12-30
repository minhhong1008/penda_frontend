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
  import React, { useEffect, useState } from "react";
  import { useHistory } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  
  const Bill_class = () => {
    const dispatch = useDispatch();
    const history = useHistory();
  
  
    useEffect(() => {
      //countReport();
    }, []);
  
    return (
      <div>
        <Card>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="BÁO CÁO THU CHI" key="1">
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="PHIẾU THU CHI">
                    <Form name="basic" autoComplete="off" size="large">
                      <Row gutter={16}>
                        <Col span={6}>
                          <Form.Item
                            label="Bank id"
                            name="bank_id"
                            style={{ width: "100%" }}
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập Bank id!",
                              },
                            ]}
                          >
                            <Input
                              disabled={true}
                              size="small"
                              placeholder="input here"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={10}>
                          <Form.Item label="Bank User" name="bank_user">
                            <Input size="small" placeholder="input here" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Bank Pass" name="bank_password">
                            <Input size="small" placeholder="input here" />
                          </Form.Item>
                        </Col>
                      </Row>
  
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item label="Bank chi tiết" name="bank_detail">
                            <Input size="small" placeholder="input here" />
                          </Form.Item>
                        </Col>
                      </Row>
  
                      <Row gutter={16}>
                        <Col span={6}>
                          <Form.Item label="Bank limit" name="bank_limit">
                            <Input size="small" placeholder="0" />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item label="Bank items" name="bank_item">
                            <Input size="small" placeholder="0" />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item label="Bank Sold" name="bank_sold">
                            <Input size="small" placeholder="0" />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item label="Bank Fb" name="bank_feedback">
                            <Input size="small" placeholder="0" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                          label="Bank block"
                          name="bank_block"
                          disabled={true}
                        >
                          <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="select one item"
                            optionLabelProp="label"
                          >
                            
                          </Select>
                        </Form.Item>
  
                    
  
                      <Form.Item label="Tiến trình" name="bank_processing">
                        <Select
                          
                          mode="multiple"
                          style={{ width: "100%", color: "green" }}
                          optionLabelProp="label"
                          //status="warning"
                        >
                          
                        </Select>
                      </Form.Item>
                      <Form.Item label="Phát sinh" name="bank_error">
                        <Select
                          mode="multiple"
                          style={{ width: "100%", color: "red" }}
                          optionLabelProp="label"
                          //status="warning"
                        >
                          
                        </Select>
                      </Form.Item>
                      <Form.Item label="Loại bank" name="bank_type">
                          <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="select one item"
                            optionLabelProp="label"
                          >
                            
                          </Select>
                        </Form.Item>
                    
  
  
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item label="Trạng thái" name="bank_status">
                            <Select
                              //mode="multiple"
                             
                              optionLabelProp="label"
                              
                            >
                              
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Lớp Bank" name="bank_class">
                            <Select
                              //mode="multiple"
                              style={{ width: "100%" }}
                              optionLabelProp="label"
                             
                            >
                              
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Hỗ trợ" name="bank_support">
                            <Select
                              style={{ width: "100%" }}
                              placeholder="select one item"
                              optionLabelProp="label"
                            >
                              
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
  
                      <Row gutter={16}>
                        <Form.Item name="bank_image_url">
                          <Upload
                           
                          >
                            
                          </Upload>
                        </Form.Item>
                      </Row>
                    </Form>
                  </Card>
                </Col>
  
                <Col span={12}>
                  <Card title="THÔNG TIN TÀI NGUYÊN">
                   
                  </Card>
                </Col>
              </Row>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    );
  };
  
  export default Bill_class;
  