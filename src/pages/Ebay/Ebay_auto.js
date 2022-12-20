const onChangeProcessing = (values) => {
    if (values[values.length - 1] == "Buyer") {
      form.setFieldValue("ebay_class", "Lớp 3");
    }
  };