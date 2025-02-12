import FormsLogin from "../../components/FormsLogin";

import { ActionFunctionArgs, redirect } from "react-router-dom";
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
    if (err instanceof AxiosError) {
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
    }
    return err;
  }
};
function LoginPage() {
  return (
    <section className='p-2 md:p-30 py-30'>
      <FormsLogin />
    </section>
  );
}
export default LoginPage;
