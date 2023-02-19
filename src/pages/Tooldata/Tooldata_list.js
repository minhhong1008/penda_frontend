import icondevice from "../../assets/images/iconSocial/icondevice.jpg";
import iconproxy from "../../assets/images/iconSocial/iconproxy.jpg";
import iconinfo from "../../assets/images/iconSocial/iconinfo.png";
import iconmail from "../../assets/images/iconSocial/iconmail.png";
import iconsim from "../../assets/images/iconSocial/iconsim.jpg";
import iconbank from "../../assets/images/iconSocial/iconbank.jpg";
import iconebay from "../../assets/images/iconSocial/iconebay.jpg";
import iconetsy from "../../assets/images/iconSocial/iconetsy.png";
import iconamazon from "../../assets/images/iconSocial/iconamazon.png";
import iconshopee from "../../assets/images/iconSocial/iconshopee.png";
import iconfacebook from "../../assets/images/iconSocial/iconfacebook.png";
import icontiktok from "../../assets/images/iconSocial/icontiktok.png";
import iconpayoneer from "../../assets/images/iconSocial/iconpayoneer.png";
import iconpaypal from "../../assets/images/iconSocial/iconpaypal.png";
import iconpingpong from "../../assets/images/iconSocial/iconpingpong.jpg";
import React from 'react';
import { Divider } from 'antd';

export const listselect_processing = [
  "-------Mail---------",
  "Login mail",
  "avatar",
  "change info",
  "change pass",
  "change phone",
  "add recover",
  "add forward",
  "2 FA",
  "Buyer",
  "Verify Full",
  "disable",
  "Send support",
  "die",
  "-------Ebay---------",
  "Login Gmail",
  "Verify Gmail",
  "Buyer",
  "View",
  "Like",
  "Policies",
  "Verify address",
  "Verify phone",
  "Verify mail",
  "Verify Full",
  "Avatar",
  "Add to cart",
  "Seller",
  "Verify Bank",
  "Draft",
  "List",
  "Sold",
  "Move room",
  "Quảng cáo",
  "Above Standard",
  "Top Rate",
  "Restrict",
  "Suspended",
  "-------Payoneer---------",
  "Login mail",
  "Verify Mail",
  "Buyer",
  "Verify mail",
  "Verify phone",
  "Verify Bank",
  "Send cccd",
  "Verify cccd",
  "Send Doc",
  "Verify Doc",
  "Seller",
  "Restrict",
  "Suspended",
  "-------Other---------",
  "New",
  "Login mail",
  "Verify Mail",
  "Buyer",
  "View",
  "Like",
  "Policies",
  "Verify Full",
  "Avatar",
  "Add to cart",
  "Seller",
  "Verify Bank",
  "Draft",
  "List",
  "Sold",
  "Quảng cáo",
  "Above Standard",
  "Top Rate",
  "Restrict",
  "Suspended",
];
export const listselect_create_number = [
  "10",
  "20",
  "30",
  "50",
  "100",
  "200",
  "300",
  "500",
  "1000",
  "2000",
];

export const listselect_plan = [
  "Phone",
  "PC",
  "Antidetect",
  "Gologin",
  "VPS",
  "Windows 10",
  "Windows 11",
  "MAC",
  "Ubuntu",
  "Chrome",
  "Firefox",
  "Edge",
  "Safari",
  "USB 4G",
  "Sproxy 4G",
  "Proxy",
  "Info real",
  "Info gen",
  "Sim real",
  "Sim otp",
  "Bank real",
  "Bank gen",
  "Quy trình 1",
  "Quy trình 2",
  "Quy trình 3",
  "Quy trình 4",
  "Quy trình 5",
  "Quy trình 6",
  "Quy trình 7",
  "Quy trình 8",
  "Quy trình 9",
  "Quy trình 10",
  "Quy trình 11",
  "Quy trình 12",
];
export const listInfo = [
  {
    title: "CREATE",
    value: "",
  },
  {
    title: "UPDATE",
    value: "",
  },
  {
    title: "LINK",
    value: "",
  },
  {
    title: "--------------",
    value: "",
  },
  {
    title: "DEVICE",
    value: "",
  },
  {
    title: "PROXY",
    value: "",
  },
  {
    title: "INFO",
    value: "",
  },
  {
    title: "MAIL",
    value: "",
  },
  {
    title: "SIM",
    value: "",
  },
  {
    title: "BANK",
    value: "",
  },
  {
    title: "PAYONEER",
    value: "",
  },
  {
    title: "PAYPAL",
    value: "",
  },

  {
    title: "PINGPONG",
    value: "",
  },
  {
    title: "EBAY",
    value: "",
  },
  {
    title: "ETSY",
    value: "",
  },
  {
    title: "AMAZON",
    value: "",
  },
  {
    title: "SHOPEE",
    value: "",
  },

  {
    title: "FACEBOOK",
    value: "",
  },
  {
    title: "TIKTOK",
    value: "",
  },
  {
    title: "CUSTOMER",
    value: "",
  },
];

export const listselect_sell_status = [
  "Đang thực hiện",
  "Đang chuẩn bị",
  "Đủ điều kiện bán",
  "Bán tài khoản",
  "Đang giao dịch",
  "Bán thành công",
  "Bảo hành",
  "Hết bảo hành",
];
export const listselect_view_field = [
  {
    title: "DEVICE",
    thumbnail: icondevice,
    value: "device_id",
  },
  {
    title: "PROXY",
    thumbnail: iconproxy,
    value: "proxy_id",
  },
  {
    title: "INFO",
    thumbnail: iconinfo,
    value: "info_id",
  },
  {
    title: "MAIL",
    thumbnail: iconmail,
    value: "mail_id",
  },
  {
    title: "SIM",
    thumbnail: iconsim,
    value: "sim_id",
  },
  {
    title: "BANK",
    thumbnail: iconbank,
    value: "bank_id",
  },
  {
    title: "PAYONEER",
    thumbnail: iconpayoneer,
    value: "payoneer_id",
  },
  {
    title: "PAYPAL",
    thumbnail: iconpaypal,
    value: "paypal_id",
  },
  {
    title: "PINGPONG",
    thumbnail: iconpingpong,
    value: "pingpong_id",
  },
  {
    title: "EBAY",
    thumbnail: iconebay,
    value: "ebay_id",
  },
  {
    title: "ETSY",
    thumbnail: iconetsy,
    value: "etsy_id",
  },
  {
    title: "AMAZON",
    thumbnail: iconamazon,
    value: "amazon_id",
  },
  {
    title: "SHOPEE",
    thumbnail: iconshopee,
    value: "shopee_id",
  },
  {
    title: "FACEBOOK",
    thumbnail: iconfacebook,
    value: "facebook_id",
  },
  {
    title: "TIKTOK",
    thumbnail: icontiktok,
    value: "tiktok_id",
  },
];