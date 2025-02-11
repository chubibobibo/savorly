function LandingPage() {
  return (
    <section className=' flex flex-col items-center h-max-screen'>
      <img
        src='./registerBg.png'
        alt='background image'
        className='w-screen h-screen fixed object-cover opacity-30'
      />
      <section className='p-15 md:p-35'>
        <img
          src='./logo.png'
          alt='savorly logo'
          className='w-50 rounded-full relative md:w-90'
        />
      </section>
      <section className='flex flex-col items-center gap-3 md:gap-6 md:text-lg'>
        <section className='text-center pb-8'>
          <span className='font-rubik '>
            Create and save your own recipe by logging in
          </span>
        </section>
        <section className='flex flex-col gap-3 md:flex-row md:gap-5'>
          <button>Register</button>
          <button>Login</button>
          <button>Recipes</button>
        </section>
      </section>
    </section>
  );
}
export default LandingPage;
