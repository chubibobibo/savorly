import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useLoaderData,
  redirect,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import LazyLoadingComponent from "../../components/LazyLoadingComponent";

import LoggedUserContextProvider from "../../context/LoggedUserContextProvider";

import { FaMagnifyingGlass } from "react-icons/fa6";

import NavigationComponent from "../../components/NavigationComponent";
import SearchBadge from "../../components/SearchBadge";

import { Form } from "react-router-dom";
import { badgeCategories } from "../../utils/badgeCategories";
import { RecipeTypes } from "../../types/Types";
import { LoaderFunctionArgs } from "react-router-dom";
import { SearchStateType } from "../../types/Types";
import CardComponentHorz from "../../components/CardComponentHorz";

import AddRecipeModal from "../../components/AddRecipeModal";


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
  /** @modalClick handles the rendering of modal to add recipes by updating the toggleModal state */
  /** @handleBadgeClick handles the querying of recipes by navigating to a url with the corresponding query hard coded to it */
  /** @handleChange handles the changes of values in the search input query */
  /** @navigateToDashboard function that employs useNavigate to /dashboard page which is passed as props to the modal to add recipes which allows navigation after successful submission of post request */

  const submit = useSubmit();
  const data = useLoaderData();
  const navigate = useNavigate();
  const allRecipes = data.data.foundRecipes;
  // console.log(data);

  /** @badgeId state that will be used to compare which badge is clicked */
  const [badgeId, setBadgeId] = useState("");
  const [searchInput, setSearchInput] = useState<SearchStateType>({
    search: "",
  });

  const [toggleModal, setToggleModal] = useState(false);

  const modalClick = () => {
    setToggleModal((prevToggle) => !prevToggle);
  };


  const handleBadgeClick = (badgeValue: string) => {
    setBadgeId(badgeValue);
    navigate(`/dashboard?category=${badgeValue}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput((prev: { search: string }) => {
      return { ...prev, search: e.target.value };
    });
    submit(e.currentTarget.form);
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };
  // console.log(searchInput);

  // console.log(toggleModal);


  return (
    <>
      {/** handle @context if it is null. (Initial value of context is null) */}
      {/* {allRecipes && allRecipes.length !== 0 ? ( */}
      <section>
        <LoggedUserContextProvider>
          <NavigationComponent />
        </LoggedUserContextProvider>


        <section className='w-screen flex justify-center flex-col items-center gap-2'>
          <Form
            className='px-2 py-4 flex justify-center items-center flex-col border-b-1 border-gray-200 gap-2 md:w-screen mb-2'

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
                      onClick={() => handleBadgeClick(allCategories.value)}
                      badgeId={badgeId}
                    />
                  </section>
                );
              })}
            </section>
          </Form>


          <section className=' bg-light-custom-purple w-10/12 rounded-3xl p-4 md:p-8 place-items-center'>
            <p className='pb-2'>
              Create your own recipes that will only be visible to you.
            </p>
            <p className='text-sm text-gray-500 place-items-center pb-5'>
              You can also check our collection of recipes from the internet.
            </p>
            <button
              className=' btn btn-primary btn-md btn-outline shadow-3xl text-base-content'
              onClick={modalClick}
            >
              Add Recipe
            </button>
          </section>
          <section>
            {toggleModal && (
              <AddRecipeModal
                setToggleModal={setToggleModal}
                toggleModal={toggleModal}
                navigate={navigateToDashboard}
              />
            )}
          </section>
        </section>
        <section className='p-5 flex flex-col gap-6 items-center'>
          {allRecipes.length === 0 ? (
            <>
              <h1>Wow, soooo empty</h1>
            </>
          ) : (
            <section className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
              {" "}
              {allRecipes.map((eachRecipes: RecipeTypes) => {
                return (
                  <LazyLoadingComponent key={eachRecipes._id}>
                    <section>
                      <CardComponentHorz
                        recipeName={eachRecipes.recipeName}
                        recipeDescription={eachRecipes.recipeDescription}
                        cookingTime={eachRecipes.cookingTime}
                        category={eachRecipes.category}
                      />
                    </section>
                  </LazyLoadingComponent>
                );
              })}
            </section>
          )}
        </section>
      </section>

    </>
  );
}
export default DashboardLayout;
