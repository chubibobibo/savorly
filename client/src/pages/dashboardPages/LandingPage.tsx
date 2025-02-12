import TransparentButton from "../../components/TransparentButton";

// import { FaRegUser } from "react-icons/fa";
// import { FaBook } from "react-icons/fa";

function LandingPage() {
  return (
    <section className='flex flex-col items-center h-max-screen'>
      <img
        src='./registerBg.png'
        alt='background image'
        className='w-screen h-screen fixed object-cover opacity-20'
      />
      <section className='p-15 md:p-20'>
        <img
          src='./logo.png'
          alt='savorly logo'
          className='w-50 rounded-full relative md:w-90'
        />
      </section>
      <section className='flex flex-col items-center gap-3 md:gap-6 md:text-lg z-10'>
        <section className='text-center pb-8'>
          <span className='font-rubik '>
            Create and save your own recipe by logging in
          </span>
        </section>
        <section className='flex flex-col gap-3 md:flex-row md:gap-5 z-10 items-center'>
          <TransparentButton
            btnName={"Login"}
            size={"small"}
            icon={"user"}
            nav={"/login"}
          />
          <TransparentButton
            btnName={"Register"}
            size={"small"}
            icon={"user"}
            nav={"/register"}
          />
          <TransparentButton
            btnName={"Recipe Library"}
            size={"small"}
            icon={"library"}
            nav={null}
          />
        </section>
      </section>
    </section>
  );
}
export default LandingPage;
