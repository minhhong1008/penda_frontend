import React from 'react'
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";

const SideBarProducts = ({ color }) => {
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


  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
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

  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  return (
    <>
      {page == "HomePage" ? null : (
        <Menu theme="light" mode="inline">
          <Menu.Item className="menu-item-header" key="1">
            Tài Khoản
          </Menu.Item>

          <Menu.Item key="1">
            <NavLink to="/products/ebay_class">
              <span
                className="icon"
                style={{
                  background: page === "products/ebay_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Ebay</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="2">
            <NavLink to="/products/etsy_class">
              <span
                className="icon"
                style={{
                  background: page === "products/etsy_class" ? color : "",
                }}
              >
                {billing}
              </span>
              <span className="label">Etsy</span>
            </NavLink>
          </Menu.Item>

                 
          <Menu.Item key="3">
            <NavLink to="/products/amazon_class">
              <span
                className="icon"
                style={{
                  background: page === "products/amazon_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Amazon</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="4">
            <NavLink to="/products/shopee_class">
              <span
                className="icon"
                style={{
                  background: page === "products/shopee_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Shopee</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="5">
            <NavLink to="/products/payoneer_class">
              <span
                className="icon"
                style={{
                  background: page === "products/payoneer_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Payoneer</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="6">
            <NavLink to="/products/paypal_class">
              <span
                className="icon"
                style={{
                  background: page === "products/paypal_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Paypal</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="7">
            <NavLink to="/products/bank_class">
              <span
                className="icon"
                style={{
                  background: page === "products/bank_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Bank</span>
            </NavLink>
          </Menu.Item>


          <Menu.Item key="8">
            <NavLink to="/products/info_class">
              <span
                className="icon"
                style={{
                  background: page === "products/info_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Info</span>
            </NavLink>
          </Menu.Item>


          <Menu.Item key="9">
            <NavLink to="/products/mail_class">
              <span
                className="icon"
                style={{
                  background: page === "products/mail_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Mail</span>
            </NavLink>
          </Menu.Item>



          <Menu.Item key="10">
            <NavLink to="/products/sim_class">
              <span
                className="icon"
                style={{
                  background: page === "products/sim_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Sim</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="11">
            <NavLink to="/products/device_class">
              <span
                className="icon"
                style={{
                  background: page === "products/device_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Device</span>
            </NavLink>
          </Menu.Item>
          
          <Menu.Item key="12">
            <NavLink to="/products/facekbook_class">
              <span
                className="icon"
                style={{
                  background: page === "products/facekbook_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Facebook</span>
            </NavLink>
          </Menu.Item>
          
          
          <Menu.Item key="13">
            <NavLink to="/products/tiktok_class">
              <span
                className="icon"
                style={{
                  background: page === "products/tiktok_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Tiktok</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="14">
            <NavLink to="/products/other_class">
              <span
                className="icon"
                style={{
                  background: page === "products/other_class" ? color : "",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Other</span>
            </NavLink>
          </Menu.Item>


          <Menu.Item key="99">
            <NavLink to="/products/create">
              <span
                className="icon"
                style={{
                  background: page === "products/create" ? color : "",
                }}
              >
                {profile}
              </span>
              <span className="label">Nhập liệu</span>
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
}

export default SideBarProducts