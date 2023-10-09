import LogoComponent from "@/components/LogoComponent";
import LoginPage from "@/components/logins/Login";

export default function Home() {
  return (
    <main className='min-h-screen px-6 pt-20 flex flex-col '>
      <div className=' pb-4 max-w-sm mx-auto'>
        <LogoComponent classnames='w-[72px] h-[72px] ' />
     
           <h1 className='text-2xl font-bold text-[#D76F30]'>
        NFVCB Multipurpose Cooperative Society Ltd
      </h1>
      <h2 className="text-xl font font-semibold py-4 tracking-widest">Welcome.</h2>
      </div>

     
     
     
      <LoginPage />
    </main>
  );
}
