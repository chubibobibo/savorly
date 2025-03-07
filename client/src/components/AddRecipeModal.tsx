import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import InputForms from "./inputForms";
import TextAreaForms from "./TextAreaForms";
import SelectInputForms from "./SelectInputForms";
import React, { useState } from "react";
// import { badgeCategories } from "../utils/badgeCategories";

import UploadPhotoForm from "./UploadPhotoForm";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { Form } from "react-router-dom";

import { IconType } from "react-icons";

interface setToggleModalType {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: boolean;
}

type RecipeDataType = {
  recipeName?: string;
  recipeDescription?: string;
  recipeInstruction?: string;
  category?: string;
  cookingTime?: string;
  recipeIngredients?: {
    ingredientName?: string;
    ingredientQty?: string | null;
    id?: string | null;
  }[];
  photoUrl?: File | string | null;
  photoId?: string | null;
};

type IngredientType = {
  ingredientName?: string;
  ingredientQty?: string | null;
  id?: string | null;
};

function AddRecipeModal({ setToggleModal, toggleModal }: setToggleModalType) {
  /** @selected state in the selectInput component that contains data of the recipe category selected */
  /** @recipeData state that handles of the data with regards to the recipe */
  /** @ingredients state that handles ingredient data that will be used to update with new data the recipeIngredient array in the recipeData */
  /** @handleInputChange handles input changes for input fields */
  /** @handleIngredientChange handles the ingredient name and ingredient qty fields */
  /** @onClickAddIngredients updates the recipeData with all the previous data then adds to the recipeData.ingredients the value from the ingredients state (ingredientName and ingredientQty) */
  /** @formData created a new form data to be used in the addRecipe API. This is because we need to convert the ... */
  /** @file the photoUrl from the image upload input (using e.target.files[0])*/
  /** @handleImageInput  handles the file upload in the file upload input. This directly updates the photoUrl in the recipeData */
  /** @handleSubmit created a new formData that will contain all the data of the recipe using data from the recipeData state. This will be sent as strings or blobs or files for multer to convert to req.file (which is an object) */

  type BadgeType = {
    name: string;
    value: string;
    description: string;
    href: string;
    badgeId: number;
    icon: IconType | null;
  };

  const [selected, setSelected] = useState<BadgeType>({
    name: "",
    value: "",
    description: "",
    href: "",
    badgeId: 0,
    icon: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipeData, setRecipeData] = useState<RecipeDataType>({
    recipeName: "",
    recipeDescription: "",
    recipeInstruction: "",
    category: "",
    cookingTime: "",
    recipeIngredients: [],
    photoUrl: "",
    photoId: "",
  });
  const [ingredients, setIngredients] = useState<IngredientType>();
  //   const [photoUpload, setPhotoUpload] = useState({});

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
    const file = e.target.files ? e.target.files[0] : null; //image upload input uses files instead of values
    //update the state of photoUrl with the file
    setRecipeData((prev) => {
      return { ...prev, photoUrl: file };
    });
  };

  const onClickAddIngredients = () => {
    const genId = uuidv4();
    setRecipeData((prev) => {
      return {
        ...prev,
        recipeIngredients: [
          ...(prev.recipeIngredients || []), // or empty array because we initialized recipeIngredients in the state as an empty array therefore it can be empty.
          {
            ingredientName: ingredients?.ingredientName,
            ingredientQty: ingredients?.ingredientQty,
            id: genId,
          },
        ],
      };
    });
    setIngredients({ ingredientName: "", ingredientQty: "", id: null });
  };

  //   console.log(recipeData);
  //   console.log(selected);
  //   console.log(ingredients);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("recipeName", recipeData?.recipeName || "");
    formData.append("recipeDescription", recipeData?.recipeDescription || "");
    formData.append("recipeInstruction", recipeData?.recipeInstruction || "");
    formData.append("category", recipeData?.category || "");
    formData.append("cookingTime", recipeData?.cookingTime || "");
    formData.append("photoUrl", recipeData?.photoUrl || "");
    recipeData?.recipeIngredients?.forEach((newIngredients) => {
      formData.append("recipeIngredients", JSON.stringify(newIngredients));
    });

    try {
      await axios.post("/api/recipe/createRecipe", formData);
      setToggleModal(false);
      toast.success("Created new recipe");
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
        <Form
          onSubmit={handleSubmit}
          method='POST'
          encType='multipart/form-data'
        >
          <DialogBackdrop
            transition
            className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
          />

          <div className='fixed inset-0 z-10 w-screen overflow-y-scroll'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 '>
              <DialogPanel
                transition
                className='relative transform overflow-auto rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 w-78'
              >
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
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
                        value={recipeData.recipeName}
                      />
                      <TextAreaForms onChange={handleInputChange} />
                      <InputForms
                        title={"Recipe Description"}
                        name={"recipeDescription"}
                        id={"recipeDescription"}
                        type={"text"}
                        onChange={handleInputChange}
                        value={recipeData.recipeDescription}
                      />
                      <SelectInputForms
                        selected={selected}
                        setSelected={setSelected}
                        handleInputChange={handleInputChange}
                      />
                      <InputForms
                        title={"Cooking Time"}
                        name={"cookingTime"}
                        id={"cookingTime"}
                        type={"number"}
                        onChange={handleInputChange}
                        value={recipeData.cookingTime}
                      />
                      <section className='border-1 border-gray-300 p-2'>
                        <section className='bg-light-custom-purple p-2 rounded-2xl mb-2'>
                          <p className='text-sm'>
                            Add your ingredients and their quantity
                          </p>
                        </section>
                        <InputForms
                          title={"Recipe Ingredients"}
                          name={"ingredientName"}
                          id={"ingredientName"}
                          type={"text"}
                          onChange={handleIngredientChange}
                          value={ingredients?.ingredientName ?? ""} // ?? = right side is used if left is null or undefined
                        />
                        <InputForms
                          title={"Ingredient Quantity"}
                          name={"ingredientQty"}
                          id={"ingredientQty"}
                          type={"number"}
                          onChange={handleIngredientChange}
                          value={ingredients?.ingredientQty ?? ""}
                        />
                        {/* <button
                          className='custom-buttons m-auto bg-light-custom-green active:bg-green-200 border-1 border-green-100'
                          onClick={onClickAddIngredients}
                          type='button'
                        >
                          Add Ingredient
                        </button> */}
                        <button
                          type='button'
                          data-autofocus
                          onClick={onClickAddIngredients}
                          className='mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-green-200 ring-inset hover:bg-green-400 sm:mt-0 sm:w-auto bg-light-custom-green cursor-pointer '
                        >
                          Add Ingredients
                        </button>
                      </section>
                      {/** ingredient list */}
                      <section className='h-40 border-1 border-gray-300 overflow-y-scroll p-1'>
                        <section className='bg-light-custom-purple rounded-md h-10 flex items-center justify-center'>
                          <p className='my-auto '>Ingredient List</p>
                        </section>
                        <section className='grid grid-cols-2'>
                          <section>
                            <h2 className='text-sm border-b-1 mt-2 border-gray-300'>
                              Name
                            </h2>
                            {recipeData?.recipeIngredients?.length !== 0 ? (
                              recipeData?.recipeIngredients?.map((prev) => {
                                return (
                                  <section key={prev.id}>
                                    <p className='text-sm mb-2'>
                                      {prev.ingredientName}
                                    </p>
                                  </section>
                                );
                              })
                            ) : (
                              <p>Empty</p>
                            )}
                          </section>
                          <section>
                            <h2 className='text-sm border-b-1 border-gray-300 mt-2'>
                              Quantity
                            </h2>
                            {recipeData?.recipeIngredients?.length !== 0 ? (
                              recipeData?.recipeIngredients?.map((prev) => {
                                return (
                                  <section key={prev.id}>
                                    <p className='text-sm mb-2'>
                                      {prev.ingredientQty}
                                    </p>
                                  </section>
                                );
                              })
                            ) : (
                              <p>Empty</p>
                            )}
                          </section>
                        </section>
                      </section>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    type='submit'
                    className='inline-flex w-full justify-center rounded-md bg-light-custom-green px-3 py-2 text-sm font-semibold text-black shadow-xs ring-green-200 hover:bg-green-500 sm:ml-3 sm:w-auto cursor-pointer'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating your recipe..." : "Submit"}
                  </button>
                  <button
                    type='button'
                    data-autofocus
                    onClick={() => setToggleModal(false)}
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer'
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Form>
      </Dialog>
    </section>
  );
}

export default AddRecipeModal;
