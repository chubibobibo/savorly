import axios from "axios";
import { LoaderFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

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
  const specificRecipeData = useLoaderData();
  const recipeData = specificRecipeData.data.foundRecipe;
  console.log(specificRecipeData);
  return (
    <section className='p-2'>
      <div className='card bg-base-100 w-12/12 shadow-sm'>
        <figure>
          <img
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
            alt='Shoes'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{recipeData.recipeName}</h2>
          <p>{recipeData.recipeDescription}</p>
          <div className='card-actions justify-end'>
            <button className='btn btn-primary'>Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default RecipePage;
