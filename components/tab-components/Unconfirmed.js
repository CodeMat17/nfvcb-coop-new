import { CldImage } from "next-cloudinary";
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
              <div className='flex flex-col sm:flex-row sm:items-center sm:gap-3  bg-[#fcf0e9] mb-4 p-3 rounded-xl overflow-hidden'>
                {user.avatar && (
                  <div className=''>
                    <CldImage
                      width='60'
                      height='60'
                      crop='thumb'
                      gravity='faces'
                      src={user.avatar}
                      sizes='50vw'
                      alt='Profile image'
                      loading='lazy'
                      className='rounded-full'
                    />
                  </div>
                )}
                <div>
                  <h1 className='text-lg text-[#f7a572] font-medium truncate'>
                  {user.username}
                </h1>
                <p className='text-sm text-[#D76F30]'>{user.station}</p>
                </div>
                
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Unconfirmed;
