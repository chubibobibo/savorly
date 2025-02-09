import { Form } from "react-router-dom";
function Forms_Register() {
  return (
    <section className='forms-register'>
      <div className='w-full max-w-lg '>
        <Form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:h-[40rem] md:flex md:flex-col md:gap-3'
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
              htmlFor='firstName'
            >
              First Name
            </label>
            <input
              className='input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-600 focus:border-2'
              id='firstName'
              type='text'
              placeholder='First Name'
              name='firstName'
            />
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-1'
              htmlFor='lastName'
            >
              Last Name
            </label>
            <input
              className='input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-600 focus:border-2'
              id='lastName'
              type='text'
              placeholder='Last Name'
              name='lastName'
            />
          </div>
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-1'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-600 focus:border-2'
              id='email'
              type='text'
              placeholder='Email'
              name='email'
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
          <div className='mb-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-1'
              htmlFor='reEnterPassword'
            >
              Re-enter your password
            </label>
            <input
              className='input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-600 focus:border-2'
              id='reEnterPassword'
              type='password'
              placeholder='*******'
              name='reEnterPassword'
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
              type='submit'
            >
              Register
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
export default Forms_Register;
