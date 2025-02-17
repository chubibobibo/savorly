import { useContext } from "react";
import { AllRecipesContext } from "../../context/contexts";

import CardComponentVert from "../../components/CardComponentVert";
import NavigationComponent from "../../components/navigationComponent";

function DashboardLayout() {
  const context = useContext(AllRecipesContext);

  /** handle @context if it is null. (Initial value of context is null) */
  return (
    <>
      {context && context.length !== 0 ? (
        <section>
          <NavigationComponent />
          <section className='p-5'>
            <CardComponentVert />
          </section>
        </section>
      ) : (
        <h1>Wow sooo empty here</h1>
      )}
    </>
  );
}
export default DashboardLayout;
