import axios from "axios";
import { LoaderFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";

import { FaRegClock } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { capitalize } from "../../utils/capitalize";
import IngredientTable from "../../components/IngredientTable";
import ConfirmDeleteModal from "../../components/confirmDeleteModal";
import ModalUpdateRecipe from "../../components/ModalUpdateRecipe";
import { ToastContainer, Zoom } from "react-toastify";

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
  const recipeData = specificRecipeData?.data?.foundRecipe;
  const navigate = useNavigate();
  // console.log(recipeData);

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

  const navigateToDashboard = () => {
    navigate("/dashboard/home");
  };

  const navigateToRecipe = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  const openDeleteModal = () => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    modal?.showModal();
  };

  const openUpdateModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal.showModal();
  };

  const closeUpdateModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal?.close();
  };
  // console.log(specificRecipeData);
  return (
    <section className='p-1 w-12/12 md:w-10/12 md:place-self-center md:pt-15'>
      <ToastContainer
        position='top-center'
        closeOnClick
        transition={Zoom}
        autoClose={5000}
        hideProgressBar={true}
        theme='colored'
      />
      <div className='card bg-base-100 w-12/12 shadow-sm md:flex md:items-center'>
        <figure>
          <img
            src={recipeData.photoUrl ? recipeData.photoUrl : "/logo.png"}
            alt='recipe photo'
            className='w-[40rem] rounded-t-none'
          />
        </figure>
        <div className='card-body overflow-y-auto overflow-x-hidden md:flex md:justify-center'>
          <h2 className='card-title md:place-self-center'>
            {capitalize(recipeData.recipeName)}
          </h2>
          <p className='flex items-center gap-2 md:place-self-center paragraphMd'>
            <MdOutlineDescription size={15} />
            {recipeData.recipeDescription}
          </p>
          <p className='flex items-center gap-2 md:place-self-center paragraphMd'>
            <FaRegClock size={15} />
            {recipeData.cookingTime} minutes
          </p>
          <section className='pb-4 md:w-7/12 md:place-self-center'>
            <IngredientTable data={recipeData} isForDisplay={true} />
          </section>
          <h1 className='font-semibold text-sm bg-custom-blue translate-y-2.5 pt-2 pb-1 px-1 rounded-t-lg md:w-7/12 md:place-self-center paragraphMd'>
            How To Cook:
          </h1>
          <section className='bg-custom-blue p-2 rounded-b-lg h-[10rem] w-12/12 overflow-y-scroll mb-2 text-gray-800 md:w-7/12 md:place-self-center paragraphMd'>
            <p className='text-wrap'>
              {recipeData.recipeInstruction}
              asdasdasdasdasd asdasd asdasdasdasdasdasdasd asdasdasd
              asdasdasdasdasdasdasdasdasdasd sadfdasfdsadfsdfsdfgdsfgdsfg
              asdasdasdasdasdasdasd a asdasdasd sadasdasd asdasdsad
              asdasddasdfgasd sadasdasdas saddas
            </p>
          </section>
          <div className='card-actions justify-start'>
            {/* <button
              className='btn btn-error md:m-auto md:w-32 md:h-12'
              onClick={() => {
                handleDelete(recipeData._id);
              }}
            >
              Delete
            </button> */}
            <button
              className='btn btn-error md:m-auto md:w-32 md:h-12'
              onClick={openDeleteModal}
            >
              Delete
            </button>
            {/** confirm delete modal */}
            <section>
              <ConfirmDeleteModal
                handleClick={handleDelete}
                recipeId={recipeData._id}
              />
            </section>
            {/** update recipe modal button */}
            <button
              className='btn btn-error md:m-auto md:w-32 md:h-12'
              onClick={openUpdateModal}
            >
              Update
            </button>
            <button
              className='btn btn-error md:m-auto md:w-32 md:h-12'
              onClick={navigateToDashboard}
            >
              Home
            </button>

            <ModalUpdateRecipe
              navigate={navigateToRecipe}
              closeModal={closeUpdateModal}
              updateRecipeData={recipeData}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default RecipePage;
