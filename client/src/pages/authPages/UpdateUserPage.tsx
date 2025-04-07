/** Page that contains the form to update the user. */
/** User data comes from the LoggedUserContext that is wrapped around this component in App.tsx */

import { useContext } from "react";
import { LoggedUserContext } from "../../context/contexts";

function UpdateUserPage() {
  const data = useContext(LoggedUserContext);
  const userData = data?.userData;
  //   console.log(userData);

  return <>{userData?.username}</>;
}
export default UpdateUserPage;
