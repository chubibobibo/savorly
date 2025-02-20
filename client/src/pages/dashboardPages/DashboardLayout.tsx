import { useContext, useState } from "react";
import { AllRecipesContext } from "../../context/contexts";

import { FaMagnifyingGlass } from "react-icons/fa6";

import CardComponentVert from "../../components/CardComponentVert";
import NavigationComponent from "../../components/navigationComponent";
import SearchBadge from "../../components/SearchBadge";

import { Form } from "react-router-dom";
import { badgeCategories } from "../../utils/badgeCategories";

function DashboardLayout() {
  const context = useContext(AllRecipesContext);

  /** @badeId state that will be used to compare which badge is clicked */
  const [badgeId, setBadgeId] = useState("");
  const handleBadgeClick = (badgeName: string) => {
    setBadgeId(badgeName);
  };

  return (
    <>
      {/** handle @context if it is null. (Initial value of context is null) */}
      {context && context.length !== 0 ? (
        <section>
          <NavigationComponent />
          <section className='w-screen flex justify-center'>
            <Form className='px-2 flex justify-center items-center flex-col'>
              <section className='flex w-full items-center pb-4'>
                <input
                  className='shadow-lg border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline block max-w-2xl m-auto '
                  id='search'
                  type='text'
                  placeholder='Search Recipes...'
                />
                {/** logo for the search bar */}
                <FaMagnifyingGlass
                  className='pl-2 md:mr-5 md:pl-0 text-gray-600'
                  size={30}
                />
              </section>
              <section className='flex flex-row flex-wrap justify-center gap-x-5'>
                {/** mapped badges */}
                {badgeCategories.map((allCategories) => {
                  return (
                    <section key={allCategories.name}>
                      <SearchBadge
                        name={allCategories.name}
                        BadgeIcon={allCategories.icon}
                        onClick={() => handleBadgeClick(allCategories.name)}
                        badgeId={badgeId}
                      />
                    </section>
                  );
                })}
              </section>
            </Form>
          </section>
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
