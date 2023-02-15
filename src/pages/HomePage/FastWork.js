import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Card, Descriptions, Button, List, Tooltip } from "antd";
import {
  getListmailWorkActions,
  GET_LIST_MAIL_SUCCESS,
} from "../../actions/mailActions";
import { updatmailWork, getListmailWork } from "../../api/mail";
import { showError, showSuccess } from "../../utils";
import { useDispatch, useSelector } from "react-redux";

function Fast_Work() {
  const { mails } = useSelector((state) => state.mail); // Gọi mails từ mailReducer
  let Mail_work = mails.slice(0, 3);

  const dispatch = useDispatch();
  const getListMail = () => {
    dispatch(
      getListmailWorkActions({
        mail_class: "Lớp 0",
      })
    );
  };

  /*----------HTML----------*/
  useEffect(() => {
    getListMail();
  }, ["Lớp 0"]);

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
    showSuccess("Copy: " + "\n" + text);
  };

  // Gọi API để gửi dữ liệu đi
  const Next_class = () => {
    showSuccess("Thành công");
    updatmailWork(Mail_work);
    window.location.reload();
  };

  const randomPass = (string_length) => {
    var chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var string_length = string_length;
    var randomstring = "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
  };

  Mail_work.map((item, index) => {
    item.mail_password_new = randomPass("16");
  });

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={24} className="mb-24">
          <Card
            title={mails?.length}
            extra={
              <>
                <Row gutter={[24, 0]}>
                  <Col>
                    <Button
                      onClick={() => Next_class()}
                      style={{
                        size: "small",
                        background: "#18a689",
                        color: "white",
                      }}
                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              </>
            }
          >
            <Row gutter={[24, 24]}>
              {Mail_work?.map((item, index) => (
                <Col span={8} key={index}>
                  <List.Item>
                    <Tooltip title="Ebay_id" color={"green"} key={"green"}>
                      <Button
                        type={"dashed"}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `ebay_class/table/${encodeURIComponent(
                              item.mail_id
                            )}`,
                            "_blank"
                          );
                        }}
                      >
                        {item?.mail_id}
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title={item?.mail_detail}
                      color={"orange"}
                      key={"orange"}
                    >
                      <Button
                        type="dashed"
                        onClick={() => copyToClipboard(item?.mail_detail)}
                      >
                        {"Mail Recover"}
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title={Mail_work[0].mail_user}
                      color={"cyan"}
                      key={"cyan"}
                    >
                      <Button
                        type="dashed"
                        onClick={() => copyToClipboard(Mail_work[0].mail_user)}
                      >
                        {"Gologin"}
                      </Button>
                    </Tooltip>
                  </List.Item>
                  <br></br>
                  <List.Item>
                    <Tooltip
                      title={item?.mail_user}
                      color={"pink"}
                      key={"pink"}
                    >
                      <Button
                        type="dashed"
                        onClick={() => copyToClipboard(item?.mail_user)}
                      >
                        {"Mail address"}
                      </Button>
                    </Tooltip>

                    <Tooltip
                      title={item?.mail_password}
                      color={"red"}
                      key={"red"}
                    >
                      <Button
                        type="dashed"
                        onClick={() => copyToClipboard(item?.mail_password)}
                      >
                        {"Pass old"}
                      </Button>
                    </Tooltip>

                    <Tooltip
                      title={item?.mail_password_new}
                      color={"yellow"}
                      key={"yellow"}
                    >
                      <Button
                        type="dashed"
                        danger
                        onClick={() => {
                          copyToClipboard(item?.mail_password_new);
                        }}
                      >
                        {"Pass New"}
                      </Button>
                    </Tooltip>
                  </List.Item>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Fast_Work;
