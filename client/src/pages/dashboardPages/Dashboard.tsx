import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import CardComponentHorz from "../../components/CardComponentHorz";
import axios from "axios";
import { toast } from "react-toastify";

import { RecipePropsIndex } from "../../types/Types";
import LazyLoadingComponent from "../../components/LazyLoadingComponent";

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

/** HOME PAGE THAT CONTAINS THE MAPPED CARDS FOR RECIPES */
function Dashboard() {
  /** @data @allRecipes data obtained from the loader function */

  const data = useLoaderData();
  const allRecipes = data.data.foundRecipes;
  return (
    <>
      <section className='p-5 flex flex-col gap-6 items-center'>
        {allRecipes.length === 0 ? (
          <>
            <h1 className='md:text-lg'>Wow, soooo empty</h1>
          </>
        ) : (
          <section className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {" "}
            {allRecipes.map((eachRecipes: RecipePropsIndex) => {
              return (
                <section key={eachRecipes._id}>
                  <LazyLoadingComponent>
                    <CardComponentHorz
                      recipeName={eachRecipes.recipeName}
                      recipeDescription={eachRecipes.recipeDescription}
                      cookingTime={eachRecipes.cookingTime}
                      category={eachRecipes.category}
                      photo={eachRecipes.photoUrl}
                      id={eachRecipes._id}
                    />
                  </LazyLoadingComponent>
                </section>
              );
            })}
          </section>
        )}
      </section>
    </>
  );
}
export default Dashboard;
