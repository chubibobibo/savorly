import { useContext } from "react";
import { AllRecipesContext } from "../../context/contexts";
// import { RecipeContextType } from "../../context/contexts";

function DashboardLayout() {
  const context = useContext(AllRecipesContext);
  console.log(context);

  /** handle @context if it is null. (Initial value of context is null) */
  return (
    <div>
      {context && context.length !== 0 ? (
        <h1>Here are the recipes</h1>
      ) : (
        <h1>Wow sooo empty here</h1>
      )}
    </div>
  );
}
export default DashboardLayout;
