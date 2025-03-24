import axios from "axios";
import { LoaderFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";

import { FaRegClock } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { capitalize } from "../../utils/capitalize";
import IngredientTable from "../../components/IngredientTable";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const specificRecipeData = await axios.get(
      `/api/recipe/recipe/${params.id}`
    );
    // console.log(specificRecipeData);
    return specificRecipeData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
    }
    return null;
  }
};

function RecipePage() {
  /** @handleDelete event handler for button to delete a specific recipe */

  const specificRecipeData = useLoaderData();
  const recipeData = specificRecipeData.data.foundRecipe;
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/recipe/deleteRecipe/${id}`);
      navigate("/dashboard/home");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message);
      }
    }
  };
  // console.log(specificRecipeData);
  return (
    <section className='p-1 w-12/12'>
      <div className='card bg-base-100 w-12/12 shadow-sm'>
        <figure>
          <img
            src={recipeData.photoUrl ? recipeData.photoUrl : "/logo.png"}
            alt='recipe photo'
          />
        </figure>
        <div className='card-body overflow-y-auto overflow-x-hidden'>
          <h2 className='card-title'>{capitalize(recipeData.recipeName)}</h2>
          <p className='flex items-center gap-2'>
            <MdOutlineDescription size={15} />
            {recipeData.recipeDescription}
          </p>
          <p className='flex items-center gap-2'>
            <FaRegClock size={15} />
            {recipeData.cookingTime} minutes
          </p>
          <section className='pb-4'>
            <IngredientTable data={recipeData} isForDisplay={true} />
          </section>
          <h1 className='font-semibold text-sm bg-custom-blue translate-y-2.5 pt-2 pb-1 px-1 rounded-t-lg'>
            How To Cook:
          </h1>
          <section className='bg-custom-blue p-2 rounded-b-lg h-[10rem] w-12/12 overflow-y-scroll mb-2 text-gray-800'>
            <p className='text-wrap'>
              {recipeData.recipeInstruction}
              asdasdasdasdasd asdasd asdasdasdasdasdasdasd asdasdasd
              asdasdasdasdasdasdasdasdasdasd sadfdasfdsadfsdfsdfgdsfgdsfg
              asdasdasdasdasdasdasd a asdasdasd sadasdasd asdasdsad
              asdasddasdfgasd sadasdasdas saddas
            </p>
          </section>
          <div className='card-actions justify-end'>
            <button
              className='btn btn-primary'
              onClick={() => {
                handleDelete(recipeData._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default RecipePage;
