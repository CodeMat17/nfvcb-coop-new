import Image from "next/image";
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
    position: "TREASURER",
    name: "Mary Eseoghene",
    tel: 2348035672400,
    img: "",
  },
  {
    id: 7,
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
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-3 md:gap-6 mt-8'>
        {executives.map((exec) => (
          <div
            key={exec.id}
            className='flex flex-col items-center justify-center bg-green-100 rounded-xl overflow-hidden'>
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

            <h1 className='text-xl text-green-600'>{exec.position}</h1>
            <p>{exec.name}</p>
            <a
              href={`https://wa.me/${exec.tel}`}
              target='_blank'
              className='my-4'>
              <FaWhatsapp className='text-[#D76F30] text-3xl' />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Executives;
