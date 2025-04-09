/** Page that contains the form to update the user. */
/** User data comes from the LoggedUserContext that is wrapped around this component in App.tsx */

import { useContext } from "react";
import { LoggedUserContext } from "../../context/contexts";

import {
  Form,
  Link,
  redirect,
  ActionFunctionArgs,
  useNavigation,
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import InputForms from "../../components/InputForms";
import UploadPhotoForm from "../../components/UploadPhotoForm";

/** action function to submit form */
/** @password1 and @password2 are obtained to throw an error if both values are not the same */
/** @action function sending form data to update user profile. formData not being converted into objects because of multer middleware that converts data into objects including photo url */

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData(); // obtains form data from the request
  const password1 = formData.get("password");
  const password2 = formData.get("reEnterPassword");
  if (password1 !== password2) {
    return toast.error("Passwords do not match");
  }

  try {
    await axios.patch("/api/auth/updateUser", formData);
    toast.success("User Profile successfully updated!");
    return redirect("/dashboard/home");
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
    }
  }
};

function UpdateUserPage() {
  const data = useContext(LoggedUserContext);
  const userData = data?.userData;
  //   console.log(userData);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section className='forms-register'>
      <div className='w-full max-w-lg '>
        <Form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  md:flex md:flex-col md:gap-3'
          method='PATCH'
          encType='multipart/form-data'
        >
          {/** Upload avatar */}
          <UploadPhotoForm />

          <InputForms
            title={"Username"}
            type={"text"}
            name={"username"}
            id={"username"}
            dValue={userData?.username}
          />
          <InputForms
            title={"First name"}
            type={"text"}
            name={"firstName"}
            id={"firstName"}
            dValue={userData?.firstName}
          />
          <InputForms
            title={"Last name"}
            type={"text"}
            name={"lastName"}
            id={"lastName"}
            dValue={userData?.lastName}
          />
          <InputForms
            title={"Email"}
            type={"email"}
            name={"email"}
            id={"email"}
            dValue={userData?.email}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating Profile..." : "Update Profile"}
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
export default UpdateUserPage;
