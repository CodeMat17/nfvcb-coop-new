import ClearApprovedLoanModal from "./ClearApprovedLoanModal";

const ApprovedLoans = ({ admin_name, approved }) => {
  return (
    <div>
      {approved && approved.length < 1 ? (
        <div className='text-center py-6'>
          No approved loan at the moment.
        </div>
      ) : (
        <>
          {approved.map((appr) => (
            <div
              key={appr.id}
              className='bg-green-100 mb-4 p-4 rounded-xl overflow-hidden'>
              <h1 className='text-lg text-green-800 font-medium truncate'>
                {appr.username}
              </h1>
              <p className='text-sm text-green-500'>{appr.station}</p>
              <p className='text-green-600'>
                Loan Request: {appr.loans.amount}
              </p>
              <div className='pt-3'>
                <ClearApprovedLoanModal
                  admin_name={admin_name}
                  user_id={appr.id}
                  user_name={appr.username}
                  user_station={appr.station}
                  applied={appr.loans.applied_on}
                  approved={appr.loans.approved_by}
                  loan_amount={appr.loans.amount}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ApprovedLoans;
