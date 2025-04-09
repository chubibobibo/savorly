import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
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
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: boolean;
  navigate: () => void;
}

function AddRecipeModal({
  setToggleModal,
  toggleModal,
  navigate,
}: setToggleModalType) {
  /** @selected state in the selectInput component that contains data of the recipe category selected */
  /** @recipeData state that handles of the data with regards to the recipe */
  /** @ingredients state that handles ingredient data that will be used to update with new data the recipeIngredient array in the recipeData */
  /** @handleInputChange handles input changes for input fields */
  /** @handleIngredientChange handles the ingredient name and ingredient qty fields */
  /** @onClickAddIngredients updates the recipeData with all the previous data then adds to the recipeData.ingredients the value from the ingredients state (ingredientName and ingredientQty). Implemented checks if ingredients.ingredientName and ingredientQty is undefined of empty throws a toast error. */
  /** @formData created a new form data to be used in the addRecipe API. This is because we need to convert the ... */
  /** @file the photoUrl from the image upload input (using e.target.files[0])*/
  /** @handleImageInput  handles the file upload in the file upload input. This directly updates the photoUrl in the recipeData */
  /** @handleSubmit created a new formData that will contain all the data of the recipe using data from the recipeData state. This will be sent as strings or blobs or files for multer to convert to req.file (which is an object). Clears the input field after submission by updating the ingredients state */
  /** @recipeDataStateSetter callback function that sets the state using setRecipeState and passed as props to the Ingredientable component */

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipeData, setRecipeData] = useState<RecipeTypes>({
    recipeName: "", // ensure this is always a string
    recipeDescription: "",
    recipeInstruction: "",
    category: "",
    cookingTime: 0,
    recipeIngredients: [],
    photoUrl: "",
    photoId: "",
    createdBy: "",
  });
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
    formData.append("recipeName", recipeData?.recipeName || "");
    formData.append("recipeDescription", recipeData?.recipeDescription || "");
    formData.append("recipeInstruction", recipeData?.recipeInstruction || "");
    formData.append("category", recipeData?.category || "");
    formData.append("cookingTime", recipeData?.cookingTime?.toString() || "");
    formData.append("photoUrl", recipeData?.photoUrl || "");
    recipeData?.recipeIngredients?.forEach((newIngredients) => {
      formData.append("recipeIngredients", JSON.stringify(newIngredients));
    });

    console.log(formData.getAll("recipeIngredients"));

    try {
      await axios.post("/api/recipe/createRecipe", formData);
      setToggleModal(false);
      toast.success("Created new recipe");
      navigate(); // defined in the parent component (included in react router dom)
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
    <section>
      <Dialog
        open={toggleModal}
        onClose={setToggleModal}
        className='relative z-10'
      >
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in '
        />

        <div className='fixed inset-0 z-10 w-screen overflow-y-scroll'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Form
              onSubmit={handleSubmit}
              method='POST'
              encType='multipart/form-data'
            >
              <DialogPanel
                transition
                className='relative transform overflow-auto rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 w-78 '
              >
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 md:w-[50rem]'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex flex-col gap-4'>
                      <DialogTitle
                        as='h3'
                        className='text-base font-semibold text-gray-900 pb-2'
                      >
                        Create your recipe
                      </DialogTitle>
                      <UploadPhotoForm onChange={handleImageInput} />
                      <InputForms
                        title={"Recipe Name"}
                        name={"recipeName"}
                        id={"recipeName"}
                        type={"text"}
                        onChange={handleInputChange}
                        // value={recipeData.recipeName}
                      />
                      <TextAreaForms
                        onChange={handleInputChange}
                        name={"recipeInstruction"}
                      />
                      <InputForms
                        title={"Recipe Description"}
                        name={"recipeDescription"}
                        id={"recipeDescription"}
                        type={"text"}
                        onChange={handleInputChange}
                        // value={recipeData.recipeDescription}
                      />
                      <SelectInputForms handleInputChange={handleInputChange} />
                      <InputForms
                        title={"Cooking Time"}
                        name={"cookingTime"}
                        id={"cookingTime"}
                        type={"number"}
                        onChange={handleInputChange}
                        // value={recipeData.cookingTime}
                      />
                      <section className='border-1 border-gray-300 p-2 flex flex-col justify-center items-center rounded-xl'>
                        <section className='bg-light-custom-purple p-2 rounded-2xl mb-2 h-30 flex flex-col justify-center'>
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
                    </div>
                    {/** ingredient list */}
                    <IngredientTable
                      data={recipeData}
                      recipeDataStateSetter={RecipeDataStateSetter}
                      recipeData={recipeData}
                    />
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-5 sm:flex sm:flex-row-reverse sm:px-6 flex flex-col gap-2'>
                  <Button
                    title={"Submit"}
                    type={"submit"}
                    isSubmitting={isSubmitting}
                    isDisabled={false}
                  />

                  <Button
                    title={"Cancel"}
                    type={"button"}
                    isSubmitting={isSubmitting}
                    isDisabled={false}
                    onClickProps={() => setToggleModal(false)}
                  />
                </div>
              </DialogPanel>
            </Form>
          </div>
        </div>
      </Dialog>
    </section>
  );
}

export default AddRecipeModal;
