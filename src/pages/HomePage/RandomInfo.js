import React, { useEffect } from "react";
import { list_address } from "../Tooldata/List_address";
import { list_full_name } from "../Tooldata/List_fullname";
const Random_Info = () => {
  /* last_name[Math.floor(Math.random() * (last_name.length - 1))] */

  let Gen_info =[];
  for (let index = 0; index < 50; index++) {
    // Lấy full_name và gender, sau đó tạo CCCD
    let full_list_info =
      list_full_name[Math.floor(Math.random() * (list_full_name.length - 1))];
    let full_name = full_list_info.split("|")[2];
    let gender = full_list_info.split("|")[6];
    // Tạo ngày sinh
    let day = Math.floor(Math.random() * (30 - 1)) + 1;
    let mon = Math.floor(Math.random() * (12 - 1)) + 1;
    let year = Math.floor(Math.random() * (1999 - 1979)) + 1979;
    if (day < 10) {
      day = "0" + day;
    }
    if (mon < 10) {
      mon = "0" + mon;
    }
    let birthday = year + "/" + mon + "/" + day;

    // Tạo địa chỉ
    let full_list_address =
      list_address[Math.floor(Math.random() * (list_address.length - 1))];
    let street_village = full_list_address.split("|")[2];
    let commune_ward = full_list_address.split("|")[4];
    let district_town = full_list_address.split("|")[6];
    let province_city = full_list_address.split("|")[8];
    let province_city_zipcode = full_list_address.split("|")[9];
    let full_address =
      street_village +
      "- " +
      commune_ward +
      "- " +
      district_town +
      "- " +
      province_city;

    // Tạo CCCD
    let citizen_id = full_list_address.split("|")[10];

    if (gender == "female") {
      citizen_id = citizen_id + "1" + year.toString().slice(2, 4);
      for (let index = 0; index < 6; index++) {
        citizen_id = citizen_id + Math.floor(Math.random() * 10);
      }
    } else {
      citizen_id = citizen_id + "0" + year.toString().slice(2, 4);
      for (let index = 0; index < 6; index++) {
        citizen_id = citizen_id + Math.floor(Math.random() * 10);
      }
    }

    // Gép nối dữ liệu phù hợp matbiec.penda.vn
    let upload_info =
      gender +
      "|" +
      birthday +
      "|" +
      full_name +
      "|" +
      citizen_id +
      "|" +
      citizen_id +
      "|" +
      full_address +
      "|" +
      full_address +
      "|" +
      province_city_zipcode;

      Gen_info.push(upload_info)
  }
  return <></>;
};

export default Random_Info;

function slug(title) {
  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  return slug;
}
