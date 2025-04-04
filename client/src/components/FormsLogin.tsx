import { Form, Link } from "react-router-dom";

function FormsLogin() {
  return (
    <section className='flex justify-center'>
      <div className='md:w-4/12 flex flex-col'>
        <Form
          className='bg-white shadow-md rounded h-[20rem] flex flex-col justify-center px-8 pt-6 pb-8 mb-4 md:h-[40rem] md:flex md:flex-col md:gap-3 '
          method='POST'
        >
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-1'
              htmlFor='username'
            >
              Username
            </label>
            <input
              className='input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-600 focus:border-2'
              id='username'
              type='text'
              placeholder='Username'
              name='username'
            />
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-1'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-600 focus:border-2'
              id='password'
              type='password'
              placeholder='*******'
              name='password'
            />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <span className='pt-4'>No account yet?</span>
            <Link to='/register' className='cursor-pointer pb-4'>
              Login
            </Link>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
              type='submit'
            >
              Login
            </button>
          </div>
        </Form>
        <p className='text-center text-gray-500 text-xs'>
          &copy;2022 SAVORLY All rights reserved.
        </p>
      </div>
    </section>
  );
}
export default FormsLogin;
