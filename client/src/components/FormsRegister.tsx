import { Form, Link } from "react-router-dom";

import { PhotoIcon } from "@heroicons/react/24/solid";
import InputForms from "./inputForms";

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

          <InputForms
            title={"Username"}
            type={"text"}
            name={"username"}
            id={"username"}
          />
          <InputForms
            title={"First name"}
            type={"text"}
            name={"firstName"}
            id={"firstName"}
          />
          <InputForms
            title={"Last name"}
            type={"text"}
            name={"lastName"}
            id={"lastName"}
          />
          <InputForms
            title={"Email"}
            type={"email"}
            name={"email"}
            id={"email"}
          />
          <InputForms
            title={"Password"}
            type={"password"}
            name={"password"}
            id={"password"}
          />
          <InputForms
            title={"Re-enter your password"}
            type={"password"}
            name={"reEnterPassword"}
            id={"reEnterPassword"}
          />

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
