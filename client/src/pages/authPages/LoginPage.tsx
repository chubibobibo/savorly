import FormsLogin from "../../components/FormsLogin";
// import "../../../utils/toastCss.css";

import { FaArrowCircleLeft } from "react-icons/fa";

import { ActionFunctionArgs, redirect, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/auth/login", data);
    toast.success("User logged in successfully");
    return redirect("/");
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError && err?.response?.data?.message) {
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
    } else if (err instanceof AxiosError) {
      toast.error(err?.response?.data?.error);
    }
    return err;
  }
};
function LoginPage() {
  const navigate = useNavigate();
  const handleBackNav = () => {
    return navigate(-1);
  };
  return (
    <section className='p-2 py-10 m-auto md:p-30 '>
      <span
        className='flex gap-2 items-center cursor-pointer focus:text-gray-300 hover:text-gray-500 active:text-gray-500'
        onClick={handleBackNav}
      >
        <FaArrowCircleLeft size={30} /> Back
      </span>
      <FormsLogin />
    </section>
  );
}
export default LoginPage;
