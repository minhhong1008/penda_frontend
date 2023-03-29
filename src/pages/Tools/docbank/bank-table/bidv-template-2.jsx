import './bidv-template-2.css';
import { Col, Row } from 'antd';
import { Rnd } from "react-rnd";
import * as helpers from '../helpers/helpers';
import logo from '../assets/logo/logo-bidv.png';

const BIDVTemplate2 = (props) => {
    const { bankStatement } = props

    return (
        <Rnd
            bounds="parent"
            className='dragTable'
            default={{
                x: 100,
                y: 100,
                width: 800,
                height: 600
            }}
        >
            <table className="tg">
                <thead>
                    <tr>
                        <th className="tg-i7zr" colSpan="2" style={{ width: "10%" }}>
                            <img src={logo} alt="" width={"80px"} />
                        </th>
                        <th className="tg-3mwn" colSpan="3" rowSpan="2"><span style={{ fontWeight: "bold" }}>NGÂN HÀNG TMCP ĐẦU TƯ VÀ PHÁT TRIỂN VIỆT NAM</span><br /><span style={{ fontWeight: "bold" }}>Bank for Investment and Development of VietName JSC</span></th>
                        <th className="tg-i7zr" colSpan="2">Mẫu số/Sample No:</th>
                        <th className="tg-i7zr" colSpan="3">CT001/KH</th>
                    </tr>
                    <tr>
                        <th className="tg-i7zr"></th>
                        <th className="tg-i7zr"></th>
                        <th className="tg-i7zr" colSpan="2">Ngày giờ in/Prt Date time:</th>
                        <th className="tg-i7zr" colSpan="3">{helpers.formatDate(bankStatement.ngayGD)} {helpers.formatTime(bankStatement.gioGD)}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr" colSpan="3"><span style={{ fontWeight: "bold" }}>Chi nhánh/Branch: {bankStatement.chiNhanh}</span></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                    </tr>
                    <tr>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Số: {bankStatement.soNH}</td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                    </tr>
                    <tr>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-m58p" colSpan="5"><span style={{ fontWeight: "bold" }}>SAO KÊ TÀI KHOẢN TIỀN GỬI KHÁCH HÀNG/ACCOUNT STATEMENT</span></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                    </tr>
                    <tr>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-pjqy" colSpan="2"><span style={{ fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Từ ngày</span>/From Date: {helpers.formatDate(bankStatement.tuNgay)}</td>
                        <td className="tg-i7zr" colSpan="3"><span style={{ fontWeight: "bold" }}>Đến ngày</span>/To date: {helpers.formatDate(bankStatement.denNgay)}</td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                    </tr>
                    <tr>
                        <td className="tg-i7zr" colSpan="3"><span style={{ fontWeight: "bold" }}>Khách hàng /</span> Customer:</td>
                        <td className="tg-i7zr"><span style={{ fontWeight: "bold" }}>{bankStatement.hoTenKH}</span></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-3mwn" rowSpan="3"><span style={{ fontWeight: "bold" }}>Loại tiền tệ/</span><br />Currency:</td>
                        <td className="tg-3mwn" colSpan="2" rowSpan="3">{bankStatement.loaiTienTe}</td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                    </tr>
                    <tr>
                        <td className="tg-i7zr" colSpan="3"><span style={{ fontWeight: "bold" }}>Mã KH /</span> Cif No:</td>
                        <td className="tg-i7zr"><span style={{ fontWeight: "bold" }}>{bankStatement.maKH}</span></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                    </tr>
                    <tr>
                        <td className="tg-i7zr" colSpan="3"><span style={{ fontWeight: "bold" }}>Số tài khoản/</span> Account No:</td>
                        <td className="tg-i7zr"><span style={{ fontWeight: "bold" }}>{bankStatement.stk}</span></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                    </tr>
                    <tr>
                        <td className="tg-i7zr" colSpan="3"><span style={{ fontWeight: "bold" }}>Tên tài khoản/</span> Account name:</td>
                        <td className="tg-i7zr"><span style={{ fontWeight: "bold" }}>{bankStatement.tenTK}</span></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                        <td className="tg-i7zr"></td>
                    </tr>
                </tbody>
            </table>
            <table className="preview">
                <tr>
                    <td style={{verticalAlign: "middle", textAlign: "center"}}><b>STT</b> <br /> (No)</td>
                    <td style={{verticalAlign: "middle", textAlign: "center"}}><b>Ngày giao dịch</b> <br /> (Trans.Date)</td>
                    <td style={{verticalAlign: "middle", textAlign: "center"}}><b>Mã giao dịch</b> <br /> (Trans.Code)</td>
                    <td style={{verticalAlign: "middle", textAlign: "center"}}><b>Phát sinh nợ</b> <br /> (Debit Amount)</td>
                    <td style={{verticalAlign: "middle", textAlign: "center"}}><b>Phát sinh có</b> <br /> (Credit Amount)</td>
                    <td style={{verticalAlign: "middle", textAlign: "center"}}><b>Số dư</b> <br /> (Balance)</td>
                    <td style={{verticalAlign: "middle", textAlign: "center"}}><b>Số chứng từ</b> <br /> (SEQ No.)</td>
                    <td style={{verticalAlign: "middle", textAlign: "center"}}><b>Mã GDV</b> <br /> (Teller ID)</td>
                    <td style={{verticalAlign: "middle", textAlign: "center"}}><b>Mã CN</b> <br /> (Branch)</td>
                    <td style={{verticalAlign: "middle", textAlign: "center"}}><b>Diễn giải</b> <br /> (Txn. Description)</td>
                </tr>
                <tr>
                    <td colSpan={5}><b>Số dư đầu kỳ</b> <br /> (Opening balance)</td>
                    <td style={{verticalAlign: "middle", textAlign: "right", paddingRight: "3px", fontWeight: "bold"}}>{helpers.formatNumber(bankStatement.soDuDauKy, true)}</td>
                    <td colSpan={4}></td>
                </tr>
                {bankStatement.cacGD.map((item, index) => (
                    <tr>
                        <td style={{verticalAlign: "middle", textAlign: "center"}}>{index + 1}</td>
                        <td style={{verticalAlign: "middle", textAlign: "left", paddingLeft: "3px"}}>{helpers.formatDate(item.ngayGD)}<br/>{helpers.formatTime(item.gioGD)}</td>
                        <td style={{verticalAlign: "middle", textAlign: "center"}}>{item.maGD}</td>
                        <td style={{verticalAlign: "middle", textAlign: "right", paddingRight: "3px"}}>{helpers.formatNumber(item.phatSinhNo, true)}</td>
                        <td style={{verticalAlign: "middle", textAlign: "right", paddingRight: "3px"}}>{helpers.formatNumber(item.phatSinhCo, true)}</td>
                        <td style={{verticalAlign: "middle", textAlign: "right", paddingRight: "3px"}}>{helpers.formatNumber(item.soDu, true)}</td>
                        <td>{item.soChungTu}</td>
                        <td>{item.maGDV}</td>
                        <td>{item.maCN}</td>
                        <td style={{maxWidth: "120px", overflowWrap: "anywhere"}}>{item.dienGiai}</td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={3}><b>Cộng phát sinh</b> <br /> (Total Amount)</td>
                    <td style={{verticalAlign: "middle", textAlign: "right", paddingRight: "3px"}}><b>{helpers.formatNumber(bankStatement.tongPhatSinhNo, true)}</b></td>
                    <td style={{verticalAlign: "middle", textAlign: "right", paddingRight: "3px"}}><b>{helpers.formatNumber(bankStatement.tongPhatSinhCo, true)}</b></td>
                    <td colSpan={5}></td>
                </tr>
                <tr>
                    <td colSpan={5}><b>Số dư cuối kỳ</b> <br /> (Closing balance)</td>
                    <td style={{verticalAlign: "middle", textAlign: "right", paddingRight: "3px"}}><b>{helpers.formatNumber(bankStatement.soDuCuoiKy, true)}</b></td>
                    <td colSpan={4}></td>
                </tr>
                <tr>
                    <td rowSpan={2} colSpan={4} style={{verticalAlign: "middle"}}><b>Trong đó</b></td>
                    <td style={{textAlign: "center"}}><b>Số dư khả dụng</b> <br /> (Available Balance)</td>
                    <td style={{verticalAlign: "middle", textAlign: "right", paddingRight: "3px"}}><b>{helpers.formatNumber(bankStatement.soDuCuoiKy, true)}</b></td>
                    <td colSpan={2} style={{textAlign: "center"}}><b>Hạn mức thấu chi</b> <br /> (Overdraft limit)</td>
                    <td colSpan={2} style={{verticalAlign: "middle", textAlign: "right", paddingRight: "3px"}}><b>0.00</b></td>
                </tr>
                <tr>
                    <td style={{textAlign: "center"}}><b>Số dư phong tỏa</b> <br /> (Hold amount)</td>
                    <td style={{verticalAlign: "middle", textAlign: "right", paddingRight: "3px"}}><b>0.00</b></td>
                    <td colSpan={2} style={{textAlign: "center"}}><b>Số dư sổ cái</b> <br /> (Ledger Balance)</td>
                    <td colSpan={2} style={{verticalAlign: "middle", textAlign: "right", paddingRight: "3px"}}><b>{helpers.formatNumber(bankStatement.soDuCuoiKy, true)}</b></td>
                </tr>
            </table>
            <div style={{display: "flex", width: "100%", fontWeight: "bold", marginTop: "20PX"}}>
                <div style={{width: "100%", textAlign: "center"}}>GIAO DỊCH VIÊN/TELLER</div>
                <div style={{width: "100%", textAlign: "center"}}>KIỂM SOÁT VIÊN/SUPERVISOR</div>
            </div>
        </Rnd>
    );
}

export default BIDVTemplate2;