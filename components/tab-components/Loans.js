'use client'

import LoanApprovalModal from "./LoanApprovalModal";

export const revalidate = 0;

const Loans = ({ loans, admin_name }) => {
  return (
    <div>
      {loans && loans.length < 1 ? (
        <div className='text-center py-6'>
          No loan application at the moment.
        </div>
      ) : (
        <>
          {loans.map((loan) => (
            <div
              key={loan.id}
              className='bg-purple-100 mb-4 p-4 rounded-xl overflow-hidden'>
              <h1 className='text-lg text-purple-900 font-medium truncate'>
                {loan.username}
              </h1>
              <p className='text-sm text-purple-500'>{loan.station}</p>
              <p className='text-sm text-purple-500'>{loan.phone_no}</p>
              <p className='text-red-600'>Loan Request: {loan.loans.amount}</p>
              <div className='pt-3'>
                <LoanApprovalModal
                  admin_name={admin_name}
                    loan_id={loan.id}
                    loan_name={loan.username}
                    loan_amount={loan.loans.amount}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Loans