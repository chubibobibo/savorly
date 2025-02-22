import { SyntheticEvent, useState } from "react";
// import { AllRecipesContext } from "../../context/contexts";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useLoaderData, redirect } from "react-router-dom";

import { FaMagnifyingGlass } from "react-icons/fa6";

import CardComponentVert from "../../components/CardComponentVert";
import NavigationComponent from "../../components/navigationComponent";
import SearchBadge from "../../components/SearchBadge";

import { Form } from "react-router-dom";
import { badgeCategories } from "../../utils/badgeCategories";
import {
  HandleEventQueryChange,
  RecipeTypes,
  SearchQueryType,
} from "../../types/Types";
import { LoaderFunctionArgs } from "react-router-dom";

/** @request used as argument to obtain the url in the request body */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const data = await axios.get("/api/recipe/getAllRecipes", { params });
    return data;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      toast.error(err?.response?.data?.message);
      return redirect("/login");
    }
  }
};

function DashboardLayout() {
  // const context = useContext(AllRecipesContext);
  const data = useLoaderData();
  const allRecipes = data.data.foundRecipes;
  console.log(data);

  /** @badeId state that will be used to compare which badge is clicked */
  const [badgeId, setBadgeId] = useState("");
  const [searchInput, setSearchInput] = useState<SearchQueryType>({
    search: "",
  });

  const handleBadgeClick = (badgeName: string) => {
    setBadgeId(badgeName);
  };

  const handleChange = (e: HandleEventQueryChange): void => {
    setSearchInput((prev: SearchQueryType) => {
      return { ...prev, search: e.target.value };
    });
  };
  console.log(searchInput);
  return (
    <>
      {/** handle @context if it is null. (Initial value of context is null) */}
      {allRecipes && allRecipes.length !== 0 ? (
        <section>
          <NavigationComponent />
          <section className='w-screen flex justify-center'>
            <Form
              className='px-2 flex justify-center items-center flex-col'
              action='/dashboard'
            >
              <section className='flex w-full items-center pb-4'>
                <input
                  className='shadow-lg border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline block max-w-2xl m-auto '
                  id='search'
                  type='search'
                  placeholder='Search Recipes...'
                  name='search'
                  onChange={handleChange}
                  value={searchInput.search}
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
            {allRecipes.map((allRecipes: RecipeTypes) => {
              return (
                <section key={allRecipes._id}>
                  <CardComponentVert
                    recipeName={allRecipes.recipeName}
                    recipeDescription={allRecipes.recipeDescription}
                    cookingTime={allRecipes.cookingTime}
                    category={allRecipes.category}
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
