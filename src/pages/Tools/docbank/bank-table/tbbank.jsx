import { Rnd } from "react-rnd";
import * as helpers from '../helpers/helpers';
import './tpbank.css';

const TPBank = (props) => {
  const { bankStatement } = props
  return (
    <Rnd
      className='dragTable'
      default={{
        x: 100,
        y: 100,
        width: 800,
        height: 600
      }}
    >
      <table id="table-preview">
        <tr style={{ height: 200 }}>
          <td colSpan={4}></td>
          <td colSpan={2}>
            Ngày giờ tạo: {helpers.formatDate(bankStatement.ngayGD)} {helpers.formatTime(bankStatement.gioGD)}<br />
            Từ ngày: {helpers.formatDate(bankStatement.tuNgay)} Đến ngày: {helpers.formatDate(bankStatement.denNgay)}
          </td>
        </tr>
        <tr>
          <td colSpan={6} style={{ paddingBottom: 10, textAlign: "center" }}>
            <b>SỔ PHỤ TÀI KHOẢN</b><br />
            <i>(Theo ngày giá trị)</i>
          </td>
        </tr>
        <tr>
          <td colSpan={3}><u>Tên tài khoản</u> <br /> {bankStatement.hoTenKH}</td>
          <td><u>Số tài khoản</u> <br /> {bankStatement.stk}</td>
          <td><u>Loại tài khoản</u> <br /> {bankStatement.loaiTk}</td>
          <td><u>Loại tiền</u><br /> VND</td>
        </tr>
      </table>
      <table id="table-preview">
        <tr>
          <td colspan="4" style={{ border: "0.5px solid black" }}>Số dư đầu kỳ:</td>
          <td colspan="2" style={{ textAlign: "right", border: "1px solid black" }}>{helpers.formatNumber(bankStatement.soDuDauKy, true)}</td>
        </tr>
        <div style={{ margin: "10px 0" }}></div>
        <tr style={{ border: "1px solid black" }}>
          <td style={{ border: "1px solid black" }}>STT</td>
          <td style={{ border: "1px solid black" }}>Ngày giá trị</td>
          <td style={{ border: "1px solid black" }}>Số giao dịch</td>
          <td style={{
            border: "1px solid black"
          }}>Diễn giải</td>
          <td style={{ border: "1px solid black", textAlign: "right" }}>Nợ</td>
          <td style={{ border: "1px solid black", textAlign: "right" }}>Có</td>
        </tr>
        {
          bankStatement.cacGD.map((value, index) => {
            return (
              <tr>
                <td style={{ border: "1px solid black", verticalAlign: "middle"}}>{index + 1}</td>
                <td style={{ border: "1px solid black", verticalAlign: "middle" }}>{helpers.formatDate(value.ngayGD)}</td>
                <td style={{ border: "1px solid black", verticalAlign: "middle"}}>{value.maGD}</td>
                <td style={{
                  border: "1px solid black", width: "45%",
                  overflowWrap: "anywhere"
                }}>{value.dienGiai}</td>
                <td style={{ border: "1px solid black", textAlign: "right", verticalAlign: "middle" }}>{helpers.formatNumber(value.phatSinhNo, true)}</td>
                <td style={{ border: "1px solid black", textAlign: "right", verticalAlign: "middle" }}>{helpers.formatNumber(value.phatSinhCo, true)}</td>
              </tr>
            );
          })
        }

        <div style={{ margin: "20px 0" }}></div>
        <tr>
          <td colspan="4" style={{ border: "1px solid black" }}>Tổng phát sinh:</td>
          <td style={{ textAlign: "right", border: "1px solid black" }}>{helpers.formatNumber(bankStatement.tongPhatSinhNo, true)}</td>
          <td style={{ textAlign: "right", border: "1px solid black" }}>{helpers.formatNumber(bankStatement.tongPhatSinhCo, true)}</td>
        </tr>
        <tr>
          <td colspan="4" style={{ border: "1px solid black" }}>Số dư cuối kỳ:</td>
          <td colspan="2" style={{ textAlign: "right", border: "1px solid black" }}>{helpers.formatNumber(bankStatement.soDuCuoiKy, true)}</td>
        </tr>
      </table>
    </Rnd>
  );
}

export default TPBank;