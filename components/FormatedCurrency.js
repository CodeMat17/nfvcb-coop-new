const FormatedCurrency = ({ amount, classnames }) => {
  const amnt = amount.toLocaleString();

  return (
    // <div>
      <span className={classnames}> ₦{amnt}</span>
    // </div>
  );
};

export default FormatedCurrency;
