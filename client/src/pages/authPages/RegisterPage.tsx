import FormsRegister from "../../components/FormsRegister";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ActionFunctionArgs, redirect } from "react-router-dom";

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
  return (
    <section className='p-2 md:p-30'>
      <FormsRegister />
    </section>
  );
}
export default RegisterPage;
