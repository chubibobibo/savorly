import { Form, Link } from "react-router-dom";

import InputForms from "./InputForms";
import UploadPhotoForm from "./UploadPhotoForm";

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
          <UploadPhotoForm />

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
