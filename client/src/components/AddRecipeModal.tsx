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
import { badgeCategories } from "../utils/badgeCategories";

interface setToggleModalType {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: boolean;
}

type RecipeDataType = {
  recipeName: string;
  recipeDescription: string;
  recipeInstruction: string;
  category: string;
  cookingTime: number;
  recipeIngredients: { ingredientName: string; ingredientQty: number | null }[];
};

type IngredientType = {
  ingredientName: string | null;
  ingredientQty: string | null;
};

function AddRecipeModal({ setToggleModal, toggleModal }: setToggleModalType) {
  /** @selected state in the selectInput component that contains data of the recipe category selected */
  const [selected, setSelected] = useState(badgeCategories[3]);
  const [recipeData, setRecipeData] = useState<RecipeDataType>({
    recipeName: "",
    recipeDescription: "",
    recipeInstruction: "",
    category: "",
    cookingTime: 0,
    recipeIngredients: [{ ingredientName: "", ingredientQty: null }],
  });
  const [ingredients, setIngredients] = useState<IngredientType>();

  /** @handleInputChange handles input changes for input fields */
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

  /** @handleIngredientChange handles the ingredient name and ingredient qty fields */
  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  /** @onClickAddIngredients updates the recipeData with all the previous data then adds to the recipeData.ingredients the value from the ingredients state (ingredientName and ingredientQty) */
  const onClickAddIngredients = () => {
    setRecipeData((prev) => {
      return {
        ...prev,
        recipeIngredients: [
          ...prev.recipeIngredients,
          {
            ingredientName: ingredients?.ingredientName,
            ingredientQty: ingredients?.ingredientQty,
          },
        ],
      };
    });
    setIngredients({ ingredientName: "", ingredientQty: "" });
  };

  console.log(recipeData);
  //   console.log(selected);
  console.log(ingredients);

  return (
    <section>
      <Dialog
        open={toggleModal}
        onClose={setToggleModal}
        className='relative z-10'
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
                        value={ingredients?.ingredientName ?? ""}
                      />
                      <InputForms
                        title={"Ingredient Quantity"}
                        name={"ingredientQty"}
                        id={"ingredientQty"}
                        type={"number"}
                        onChange={handleIngredientChange}
                        value={ingredients?.ingredientQty ?? ""}
                      />
                      <button
                        className='custom-buttons m-auto bg-light-custom-green active:bg-green-200 border-1 border-green-100'
                        onClick={onClickAddIngredients}
                      >
                        Add Ingredient
                      </button>
                    </section>
                    <section className='h-30 border-1 border-gray-300 overflow-y-scroll p-1'>
                      Recipe Ingredient List
                      <section>
                        {recipeData.recipeIngredients.length !== 0 ? (
                          recipeData.recipeIngredients.map((prev) => {
                            return (
                              <>
                                <p>{prev.ingredientName}</p>
                                <p>{prev.ingredientQty}</p>
                              </>
                            );
                          })
                        ) : (
                          <p>Empty</p>
                        )}
                      </section>
                    </section>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  onClick={() => setToggleModal(false)}
                  className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto'
                >
                  Deactivate
                </button>
                <button
                  type='button'
                  data-autofocus
                  onClick={() => setToggleModal(false)}
                  className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto'
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </section>
  );
}

export default AddRecipeModal;
