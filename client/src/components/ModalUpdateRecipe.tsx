import InputForms from "./InputForms";
import TextAreaForms from "./TextAreaForms";
import SelectInputForms from "./SelectInputForms";
import React, { useState } from "react";
// import { badgeCategories } from "../utils/badgeCategories";

import UploadPhotoForm from "./UploadPhotoForm";
import Button from "./Button";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { Form } from "react-router-dom";
import IngredientTable from "./IngredientTable";
import { RecipeTypes, IngredientType } from "../types/Types";

interface setToggleModalType {
  //   setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  //   toggleModal: boolean;
  navigate: (id: string) => void;
  closeModal: () => void;
  updateRecipeData: {
    recipeName: string;
    recipeInstruction: string;
    recipeDescription: string;
    // recipeIngredients: [{ ingredientName: string; ingredientQty: string }];
    recipeIngredients: [{ ingredientName: string; ingredientQty: string }];
    category: string;
    cookingTime: number;
    _id: string;
  };
}

function ModalUpdateRecipe({
  closeModal,
  navigate,
  updateRecipeData,
}: setToggleModalType) {
  /** @selected state in the selectInput component that contains data of the recipe category selected */
  /** @recipeData state that handles of the data with regards to the recipe. When modal is used in updating, used as initial value the updateRecipeData passed as props from the RecipePage component. */
  /** @ingredients state that handles ingredient data that will be used to update with new data the recipeIngredient array in the recipeData */
  /** @handleInputChange handles input changes for input fields */
  /** @handleIngredientChange handles the ingredient name and ingredient qty fields */
  /** @onClickAddIngredients updates the recipeData with all the previous data then adds to the recipeData.ingredients the value from the ingredients state (ingredientName and ingredientQty). Implemented checks if ingredients.ingredientName and ingredientQty is undefined of empty throws a toast error. */
  /** @formData created a new form data to be used in the addRecipe API. This is because we need to convert the ... */
  /** @file the photoUrl from the image upload input (using e.target.files[0])*/
  /** @handleImageInput  handles the file upload in the file upload input. This directly updates the photoUrl in the recipeData */
  /** @handleSubmit created a new formData that will contain all the data of the recipe using data from the recipeData state. This will be sent as strings or blobs or files for multer to convert to req.file (which is an object). Clears the input field after submission by updating the ingredients state */
  /** @recipeDataStateSetter callback function that sets the state using setRecipeState and passed as props to the Ingredient table component */
  /** @ToastContainer placed on top of the main container for the modal dialog to render toast alerts on top of modal */

  //   console.log(updateRecipeData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipeData, setRecipeData] = useState<RecipeTypes>({
    recipeName: updateRecipeData.recipeName || "", // ensure this is always a string
    recipeDescription: updateRecipeData.recipeDescription || "",
    recipeInstruction: updateRecipeData.recipeInstruction || "",
    category: updateRecipeData.category || "",
    cookingTime: updateRecipeData.cookingTime || 0,
    recipeIngredients: updateRecipeData.recipeIngredients || [],
    photoUrl: "",
    photoId: "",
    createdBy: "",
  });

  //   console.log(updateRecipeData);
  const [ingredients, setIngredients] = useState<IngredientType>();

  /** used multiple types for event in @handleInputChange because it is used in different input types */
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRecipeData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : ""; //image upload input uses files instead of values
    //update the state of photoUrl with the file
    setRecipeData((prev) => {
      return { ...prev, photoUrl: file };
    });
  };

  const onClickAddIngredients = () => {
    // console.log(ingredients?.ingredientName, ingredients?.ingredientQty);
    const genId = uuidv4();
    if (ingredients === undefined) {
      toast.error("Please add ingredients");
    } else if (
      ingredients?.ingredientName === "" ||
      ingredients?.ingredientName === undefined ||
      null
    ) {
      toast.error("Please add ingredients!!");
    } else if (
      ingredients?.ingredientQty === "" ||
      ingredients?.ingredientQty === undefined ||
      null
    ) {
      toast.error("Please add ingredients quantity!!");
    } else {
      setRecipeData((prev) => {
        return {
          ...prev,
          recipeIngredients: [
            ...(prev?.recipeIngredients || []), // or empty array because we initialized recipeIngredients in the state as an empty array therefore it can be empty.
            {
              ingredientName: ingredients?.ingredientName,
              ingredientQty: ingredients?.ingredientQty,
              id: genId,
            },
          ],
        };
      });
      setIngredients({ ingredientName: "", ingredientQty: "", id: null });
    }
  };

  const RecipeDataStateSetter = (data: RecipeTypes) => {
    setRecipeData(data);
  };

  // console.log(recipeData.recipeIngredients);
  // console.log(ingredients);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("recipeName", recipeData?.recipeName);
    formData.append("recipeDescription", recipeData?.recipeDescription);
    formData.append("recipeInstruction", recipeData?.recipeInstruction);
    formData.append("category", recipeData?.category);
    formData.append("cookingTime", recipeData?.cookingTime?.toString());
    formData.append("photoUrl", recipeData?.photoUrl || "");

    recipeData?.recipeIngredients?.forEach((newIngredients) => {
      formData.append("recipeIngredients", JSON.stringify(newIngredients));
    });

    // console.log(formData.getAll("recipeIngredients"));

    try {
      await axios.patch(
        `/api/recipe/updateRecipe/${updateRecipeData._id}`,
        formData
      );
      toast.success("recipe Updated");
      setRecipeData((prev) => {
        return {
          ...prev,
          recipeName: "", // ensure this is always a string
          recipeDescription: "",
          recipeInstruction: "",
          category: "",
          cookingTime: 0,
          recipeIngredients: [],
          photoUrl: "",
          photoId: "",
          createdBy: "",
        };
      });
      closeModal();
      navigate(updateRecipeData._id); // defined in the parent component (included in react router dom)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        toast.error(
          Array.isArray(err?.response?.data?.message)
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message
        );
      }
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <dialog id='my_modal_1' className='modal'>
        {/** MAIN CONTAINER */}
        <div className='modal-box md:w-5/12 md:max-w-7xl md:h-[70rem]'>
          <h3 className='font-bold text-lg'>Create your Recipe</h3>
          <p className='py-4'>
            Press ESC key or click the button below to close
          </p>
          <div className='modal-action flex flex-col items-center'>
            <Form
              onSubmit={handleSubmit}
              method='POST'
              encType='multipart/form-data'
              className='w-12/12 md:w-7/12'
            >
              <div className='md:flex md:flex-col md:w-full gap-6'>
                <UploadPhotoForm onChange={handleImageInput} />
                <InputForms
                  title={"Recipe Name"}
                  name={"recipeName"}
                  id={"recipeName"}
                  type={"text"}
                  onChange={handleInputChange}
                  value={recipeData.recipeName}
                />
                <TextAreaForms
                  onChange={handleInputChange}
                  name={"recipeInstruction"}
                  value={recipeData.recipeInstruction}
                />
                <InputForms
                  title={"Recipe Description"}
                  name={"recipeDescription"}
                  id={"recipeDescription"}
                  type={"text"}
                  onChange={handleInputChange}
                  value={recipeData.recipeDescription}
                />
                <SelectInputForms handleInputChange={handleInputChange} />
                <InputForms
                  title={"Cooking Time"}
                  name={"cookingTime"}
                  id={"cookingTime"}
                  type={"number"}
                  onChange={handleInputChange}
                  value={recipeData.cookingTime}
                />
                <section className='border-1 border-gray-300 p-0 flex flex-col justify-center items-center rounded-xl pb-4'>
                  <section className='bg-light-custom-purple p-10 rounded-t-xl mb-2 h-25 flex justify-center items-center md:w-full'>
                    <p className='text-sm'>
                      Add your ingredients and their quantity in the table
                      below.
                    </p>
                  </section>
                  <InputForms
                    title={"Recipe Ingredients"}
                    name={"ingredientName"}
                    id={"ingredientName"}
                    type={"text"}
                    onChange={handleIngredientChange}
                    value={ingredients?.ingredientName ?? ""} //value is indicated to allow us to reset the input field after adding the ingredient.
                  />
                  <InputForms
                    title={"Ingredient Quantity"}
                    name={"ingredientQty"}
                    id={"ingredientQty"}
                    type={"text"}
                    onChange={handleIngredientChange}
                    value={ingredients?.ingredientQty ?? ""} //value is indicated to allow us to reset the input field after adding the ingredient.
                  />
                  <Button
                    type={"button"}
                    onClickProps={onClickAddIngredients}
                    title={"Add Ingredients"}
                    isDisabled={false}
                    isSubmitting={false}
                  />
                </section>
                {/** ingredient list */}
                <IngredientTable
                  data={recipeData}
                  recipeDataStateSetter={RecipeDataStateSetter}
                  recipeData={recipeData}
                />
                <div className='bg-gray-50 px-4 py-5 sm:flex sm:flex-row-reverse sm:px-6 flex flex-col gap-2'>
                  <Button
                    title={"Update"}
                    type={"submit"}
                    isSubmitting={isSubmitting}
                    isDisabled={false}
                  />
                </div>
              </div>
            </Form>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
export default ModalUpdateRecipe;
