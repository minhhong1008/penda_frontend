import { Col, Row } from 'antd';
import { Rnd } from "react-rnd";
import * as helpers from '../helpers/helpers';
import './bidv.css'

const BIDV = (props) => {
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
            <div className='table-preview'>
                <div className='head'>
                    <Row gutter={16}>
                        <Col span={8}>
                            <div className='doc-title'>
                                <p>NGAN HANG TMCP DT&PT VIET NAM</p>
                                <p>CHI NHANH: {bankStatement.chiNhanh}</p>
                            </div>
                        </Col>
                        <Col span={8}><div className='doc-title'>
                            <p>SAO KE TAI KHOAN NGAN HANG</p>
                            <p>TK SO: {bankStatement.stk} LOAI NGOAI TE: VND</p>
                            <p>TEN TK: {bankStatement.hoTenKH}</p>
                            <p>TU NGAY: {helpers.formatDate(bankStatement.tuNgay)} DEN: {helpers.formatDate(bankStatement.denNgay)}</p>
                        </div></Col>
                        <Col span={8}><div className='doc-title'>
                            <p>TRANG: 1</p>
                            <p>NGAY: {helpers.formatDate(bankStatement.ngayGD)}</p>
                            <p>GIO: {helpers.formatTime(bankStatement.gioGD)}</p>
                        </div></Col>
                    </Row>
                </div>
                <div style={{ margin: "40px 0" }}></div>

                <div className="content">
                    <table id="table-preview">
                        <tr>
                            <td>NGAY</td>
                            <td>MA GD</td>
                            <td>SO SEC</td>
                            <td>PHAT SINH NO</td>
                            <td>PHAT SINH CO</td>
                            <td>SO DU</td>
                            <td>DIEN GIAI</td>
                        </tr>
                        <tr>
                            <td>---------</td>
                            <td>----------</td>
                            <td>-----------</td>
                            <td>---------</td>
                            <td>-----------</td>
                            <td>---------</td>
                            <td>---------</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>SO DU DAU</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{helpers.formatNumber(bankStatement.soDuDauKy, true)}</td>
                            <td></td>
                        </tr>
                        {
                            bankStatement.cacGD.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{helpers.formatDate(item.ngayGD)}</td>
                                        <td>{item.maGD}</td>
                                        <td>{item.soSec}</td>
                                        <td>{helpers.formatNumber(item.phatSinhNo, true)}</td>
                                        <td>{helpers.formatNumber(item.phatSinhCo, true)}</td>
                                        <td>{helpers.formatNumber(item.soDu, true)}</td>
                                        <td style={{
                                            width: "30%",
                                            overflowWrap: "anywhere"
                                        }}>{item.dienGiai}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td></td>
                            <td>TONG</td>
                            <td></td>
                            <td>{helpers.formatNumber(bankStatement.tongPhatSinhNo, true)}</td>
                            <td>{helpers.formatNumber(bankStatement.tongPhatSinhCo, true)}</td>
                            <td></td>
                            <td></td></tr>
                        <tr>
                            <td></td>
                            <td>SO DU CUOI</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{helpers.formatNumber(bankStatement.soDuCuoiKy, true)}</td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
        </Rnd>
    );
}

export default BIDV;