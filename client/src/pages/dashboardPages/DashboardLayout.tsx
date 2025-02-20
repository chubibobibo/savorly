import { useContext } from "react";
import { AllRecipesContext } from "../../context/contexts";

import { FaMagnifyingGlass } from "react-icons/fa6";

import CardComponentVert from "../../components/CardComponentVert";
import NavigationComponent from "../../components/navigationComponent";

import { Form } from "react-router-dom";

function DashboardLayout() {
  const context = useContext(AllRecipesContext);
  console.log(context);

  /** handle @context if it is null. (Initial value of context is null) */
  return (
    <>
      {context && context.length !== 0 ? (
        <section>
          <NavigationComponent />
          <Form className='px-2 flex justify-center items-center'>
            <input
              className='shadow-lg border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline block max-w-2xl'
              id='search'
              type='text'
              placeholder='Search Recipes...'
            />
            {/** logo for the search bar */}
            <FaMagnifyingGlass
              className='-right-4 px-1 text-gray-600'
              size={30}
            />
          </Form>
          <section className='p-5 flex flex-col gap-6'>
            {context.map((allContext) => {
              return (
                <section key={allContext._id}>
                  <CardComponentVert
                    recipeName={allContext.recipeName}
                    recipeDescription={allContext.recipeDescription}
                    cookingTime={allContext.cookingTime}
                    category={allContext.category}
                  />
                </section>
              );
            })}
          </section>
        </section>
      ) : (
        <h1>Wow sooo empty here</h1>
      )}
    </>
  );
}
export default DashboardLayout;
