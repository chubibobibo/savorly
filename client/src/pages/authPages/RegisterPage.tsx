import FormsRegister from "../../components/FormsRegister";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ActionFunctionArgs, redirect, useNavigate } from "react-router-dom";

import { FaArrowCircleLeft } from "react-icons/fa";

//action function to submit form
// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData(); // obtains data from form
  // console.log(formData.get("reEnterPassword"));
  const reEnteredPassword = formData.get("reEnterPassword");
  const password = formData.get("password");
  if (password !== reEnteredPassword) {
    return toast.error("Passwords do no match");
  } else {
    const data = Object.fromEntries(formData); //converts form data to objects
    try {
      await axios.post("/api/auth/register", data);
      toast.success("Registration successful");
      return redirect("/login");
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error(
          Array.isArray(err?.response?.data?.message)
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message
        );
      }
      return err;
    }
  }
};

function RegisterPage() {
  const navigate = useNavigate();
  const handleBackNav = () => {
    return navigate(-1);
  };
  return (
    // <section className='p-2'>
    <section className='p-2 md:p-30'>
      <span
        className='flex gap-2 items-center cursor-pointer focus:text-gray-300 hover:text-gray-500 active:text-gray-500'
        onClick={handleBackNav}
      >
        <FaArrowCircleLeft size={30} /> Back
      </span>
      <FormsRegister />
    </section>
    // </section>
  );
}
export default RegisterPage;
