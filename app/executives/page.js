import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";

const executives = [
  {
    id: 1,
    position: "PRESIDENT",
    name: "Mary Eseoghene",
    tel: 2348035672400,
    img: "",
  },
  {
    id: 2,
    position: "V. PRESIDENT",
    name: "Mary Eseoghene",
    tel: 2348035672400,
    img: "",
  },
  {
    id: 3,
    position: "SEC. GENERAL",
    name: "Mary Eseoghene",
    tel: 2348035672400,
    img: "",
  },
  {
    id: 4,
    position: "ASST. SECRETARY",
    name: "Mary Eseoghene",
    tel: 2348035672400,
    img: "",
  },
  {
    id: 5,
    position: "FINANCIAL SEC.",
    name: "Mary Eseoghene",
    tel: 2348035672400,
    img: "",
  },
  {
    id: 6,
    position: "ASST. FIN. SEC.",
    name: "Mary Eseoghene",
    tel: 2348035672400,
    img: "",
  },
  {
    id: 7,
    position: "TREASURER",
    name: "Mary Eseoghene",
    tel: 2348035672400,
    img: "",
  },
  {
    id: 8,
    position: "PRO",
    name: "Mary Eseoghene",
    tel: 2348035672400,
    img: "",
  },
  {
    id: 9,
    position: "AUDITOR",
    name: "Mary Eseoghene",
    tel: 2348035672400,
    img: "",
  },
];

const Executives = () => {
  return (
    <div className='px-4 py-12 min-h-screen max-w-6xl mx-auto'>
      <h1 className='text-center font-medium text-4xl md:text-5xl'>
        Coop. Executives
      </h1>
      <div className=' grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-3 md:gap-6 mt-8'>
        {executives.map((exec) => (
          <div
            key={exec.id}
            className='py-4 w-full flex flex-col items-center justify-center bg-gradient-to-tr from-green-100 to-red-100 rounded-xl overflow-hidden'>
            {exec.img ? (
              <div className='px-4 pt-3 pb-2'>
                <div className='relative   w-[123px] h-[123px] rounded-full overflow-hidden'>
                  <Image alt='' fill priority src={exec.img} />
                </div>
              </div>
            ) : (
              <div>
                <IoMdContact className='text-[150px] text-[#D76F30]' />
              </div>
            )}

            <h1 className='text-2xl text-center text-green-600'>
              {exec.position}
            </h1>
            <p className='text-xl text-center w-full'>{exec.name}</p>
            <div className='w-full'>
              <Link
                href={`https://wa.me/${exec.tel}`}
                target='_blank'
                className='my-4 flex items-center justify-center gap-3'>
                <FaWhatsapp className='text-[#D76F30] text-3xl' />
                <span>Chat with me</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Executives;
