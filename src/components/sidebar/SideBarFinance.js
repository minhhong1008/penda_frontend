import React from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";

const SideBarFinance = ({ color }) => {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const signup = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      key={0}
    >
      <path
        d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
        transform="translate(4 4)"
        fill={color}
      />
      <path
        d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z"
        fill={color}
      />
    </svg>,
  ];

  return (
    <>
      {page == "HomePage" ? null : (
        <Menu theme="light" mode="inline">
          <Menu.Item className="menu-item-header" key="1">
            TÀI CHÍNH
          </Menu.Item>

          <Menu.Item key="1">
            <NavLink to="/finance/bill_class">
              <span
                className="icon"
                style={{
                  background: page === "finance/bill_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Bảng thu chi</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="2">
            <NavLink to="/finance/salary_table">
              <span
                className="icon"
                style={{
                  background: page === "finance/salary_table" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Bảng lương</span>
            </NavLink>
          </Menu.Item>

          

          <Menu.Item key="20">
            <NavLink to="/log-out">
              <span className="icon">{signup}</span>
              <span className="label">Đăng Xuất</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default SideBarFinance;
