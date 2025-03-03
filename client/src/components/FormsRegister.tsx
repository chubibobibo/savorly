import { Form, Link } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/solid";

function FormsRegister() {
  return (
    <section className='forms-register'>
      <div className='w-full max-w-lg '>
        <Form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  md:flex md:flex-col md:gap-3'
          method='POST'
          encType='multipart/form-data'
        >
          {/** Upload avatar */}
          <div className='col-span-full'>
            <label
              htmlFor='cover-photo'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Cover photo
            </label>
            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
              <div className='text-center'>
                <PhotoIcon
                  aria-hidden='true'
                  className='mx-auto size-12 text-gray-300'
                />
                <div className='mt-4 flex text-xs text-gray-600 md:text-sm/6'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500'
                  >
                    <span>Upload a file</span>
                    <input
                      id='file-upload'
                      name='photoUrl'
                      type='file'
                      className='sr-only'
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs/5 text-gray-600'>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

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
          <div className='flex flex-col items-center justify-center'>
            <span className='pt-2'>Already have an account?</span>
            <Link to='/login' className='pb-2 cursor-pointer'>
              Login
            </Link>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
              type='submit'
            >
              Register
            </button>
          </div>
        </Form>
        <p className='text-center text-gray-500 text-xs pb-2'>
          &copy;2022 SAVORLY All rights reserved.
        </p>
      </div>
    </section>
  );
}
export default FormsRegister;
