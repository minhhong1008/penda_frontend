export const listselect_bill_owner = [
    "Phòng sản xuất",
    "Phòng phục hồi",
    "Phòng Kinh doanh",
    "Phòng nâng cấp",
    "Kho lưu trữ",
  ];

  export const listselect_bill_work = [
    
    "Thu tiền bán hàng",
    "Thu tiền bán tài nguyên",
    "Thu tiền khác",
    "Thu tiền đi vay",
    "------------",
    "Mua device, proxy & gia hạn",
    "Mua sim, phone & gia hạn",
    "Mua info",
    "Mua mail",
    "Thanh toán lương, thưởng hoa hồng",
    "Chi phí văn phòng",
    "Chi phí vận chuyển",
    "Chi phí checkout, tracking",
    "Chi phí Kicksold",
  ];


  export const renderpayment = () => {
    let bill_payment = form.getFieldValue("bill_payment");
    let bill_total = formProduct.getFieldValue("bill_total");
    form.setFieldValue("bill_debt", bill_payment - bill_total);
  };