import BIDV from "./bidv";
import TPBank from "./tbbank";
import VietinBank from "./vietinbank";
import BIDVTemplate2 from './bidv-template-2';

const ListBanks = [
    {
        value: BIDV,
        label: "NGÂN HÀNG TMCP DT&PT VIỆT NAM (BIDV)",
    },
    {
        value: BIDVTemplate2,
        label: "NGÂN HÀNG TMCP DT&PT VIỆT NAM (BIDV) Template 2",
    },
    {
        value: TPBank,
        label: "NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN TIÊN PHONG CHI NHÁNH CẦU GIẤY (TPBank)",
    },
    {
        value: VietinBank,
        label: "NGÂN HÀNG TMCP CÔNG THƯƠNG VIỆT NAM (VietinBank)",
    }
];

export {ListBanks};