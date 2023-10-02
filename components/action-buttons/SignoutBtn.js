import Image from "next/image";

const SignOut = ({ classnames }) => {
  return (
    <div>
      <form action='/auth/signout' method='post'>
        <button type='submit' className={classnames}>
          <Image alt='logout' fill priority src='/logout.svg' />
        </button>
      </form>
    </div>
  );
};

export default SignOut;
