import Link from "next/link";

export const revalidate = 0;

const Unconfirmed = ({ unconfirmed }) => {
  return (
    <div>
      {unconfirmed && unconfirmed.length < 1 ? (
        <div className='text-center py-6'>
          No unconfirmed member at the moment.
        </div>
      ) : (
        <>
          {unconfirmed.map((user) => (
            <Link key={user.id} href={`/admin-dashboard/${user.id}`}>
              <div className=' bg-[#fcf0e9] mb-4 p-4 rounded-xl overflow-hidden'>
                <h1 className='text-lg text-[#f7a572] font-medium truncate'>
                  {user.username}
                </h1>
                <p className='text-sm text-[#D76F30]'>{user.station}</p>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Unconfirmed;
