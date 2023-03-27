import { Rnd } from "react-rnd";
import * as helpers from '../helpers/helpers';
import './vietinbank..css';
import logo from '../assets/logo-vietinbank.png';

const VietinBank = (props) => {
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
      <table style={{ width: "100%" }}>
        <tr>
          <td style={{width: "50%"}}>
            <b style={{fontSize: "16px"}}>Ngân Hàng TMCP Công Thương Việt Nam</b>
            <br />
            Chi Nhánh <span className="note">Branch </span> {bankStatement.chiNhanh}
          </td>
          <td style={{textAlign: "right", paddingRight: "20px"}}>
            <img src={logo} width="40%" alt="" />
          </td>
        </tr>
      </table>
      <div style={{ margin: "40px 0" }}></div>
      <table style={{ width: "100%" }}>
        <tr style={{ width: "100%"}}>
          <td style={{width: "40%"}}></td>
          <td colSpan={2} style={{paddingBottom: "20px"}}>
            <p style={{fontSize: "24px", fontWeight: "bolder", marginBottom: "-5px"}}>Sao kê chi tiết giao dịch</p>
            <b style={{fontSize: "15px"}}>Statement of account</b>
          </td>
        </tr>
        <tr>
        <td style={{width: "40%"}}></td>
          <td>
            Từ ngày <span className="note">From date</span> {helpers.formatDate(bankStatement.tuNgay)}
          </td>
          <td>
            Đến ngày <span className="note">To date</span> {helpers.formatDate(bankStatement.denNgay)}
          </td>
        </tr>
      </table>
      <div>
        Kính gửi quý khách hàng <span className="note">Dear Customer</span> {bankStatement.hoTenKH}
      </div>
      <div>
        Địa chỉ <span className="note">Address</span> {bankStatement.diaChi}
      </div>
      <div>
        VietinBank xin trân trọng thông báo Sao kê giao dịch tài khoản số: {bankStatement.stk} <span style={{marginLeft: "15px"}}>như sau:</span>
      </div>
      <div>
        <span className="note">We would like to inform you transaction statement as follow:</span>
      </div>
      <table className="statement">
        <tr>
          <td rowSpan={2} style={{textAlign: "center", verticalAlign: "middle"}}>
            <b>Ngày</b>
            <br />
            <span className="note">Date</span>
          </td>
          <td rowSpan={2} style={{textAlign: "center", verticalAlign: "middle"}}>
          <b>Giờ</b>
            <br />
            <span className="note">Time</span>
          </td>
          <td rowSpan={2} style={{textAlign: "center", verticalAlign: "middle"}}>
          <b>Nội dung giao dịch</b>
            <br />
            <span className="note">Transaction description</span>
          </td>
          <td colSpan={2} style={{textAlign: "center", verticalAlign: "middle"}}>
            <b>Số tiền giao dịch </b>
            <span className="note">Transaction amount</span>
          </td>
          <td rowSpan={2} style={{textAlign: "center", verticalAlign: "middle"}}>
            <b>Số sư </b>
            <span className="note">Balance</span>
          </td>
        </tr>
        <tr>
          <td style={{textAlign: "center", verticalAlign: "middle"}}>
            <b>Nợ </b>
            <span className="note">Debit</span>
          </td>
          <td style={{textAlign: "center", verticalAlign: "middle"}}>
          <b>Có </b>
            <span className="note">Credit</span>
          </td>
        </tr>
        <tr>
          <td colSpan={5}>
            <b>Số dư đầu kỳ </b>
            <span className="note"><b>Beginning Balance</b></span>
          </td>
          <td style={{textAlign: "right", paddingRight: "5px"}}><b>{helpers.formatNumber(bankStatement.soDuDauKy)}</b></td>
        </tr>
        {bankStatement.cacGD.map(item => (
          <tr>
            <td style={{textAlign: "center", verticalAlign: "middle"}}>{helpers.formatDate(item.ngayGD)}</td>
            <td style={{textAlign: "center", verticalAlign: "middle"}}>{helpers.formatTime(item.gioGD)}</td>
            <td style={{
              width: "40%",
              overflowWrap: "anywhere"
            }}>{item.dienGiai}</td>
            <td style={{textAlign: "right", paddingRight: "5px", verticalAlign: "middle"}}>{helpers.formatNumber(item.phatSinhNo)}</td>
            <td style={{textAlign: "right", paddingRight: "5px", verticalAlign: "middle"}}>{helpers.formatNumber(item.phatSinhCo)}</td>
            <td style={{textAlign: "right", paddingRight: "5px", verticalAlign: "middle"}}>{helpers.formatNumber(item.soDu)}</td>
          </tr>
        ))}
        <div style={{ margin: "20px 0" }}></div>
        <tr>
          <td colSpan={3}><b>Cộng phát sinh <span className="note">Total</span></b></td>
          <td style={{textAlign: "right", paddingRight: "5px", verticalAlign: "middle"}}><b>{helpers.formatNumber(bankStatement.tongPhatSinhNo)}</b></td>
          <td style={{textAlign: "right", paddingRight: "5px", verticalAlign: "middle"}}><b>{helpers.formatNumber(bankStatement.tongPhatSinhCo)}</b></td>
          <td></td>
        </tr>
        <tr>
          <td colSpan={5}><b>Số dư cuối kỳ <span className="note">Ending Balance</span></b></td>
          <td style={{textAlign: "right", paddingRight: "5px"}}><b>{helpers.formatNumber(bankStatement.soDuCuoiKy)}</b></td>
        </tr>
      </table>
    </Rnd>
  );
}

export default VietinBank;