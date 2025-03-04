import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import InputForms from "./inputForms";
import TextAreaForms from "./TextAreaForms";
import SelectInputForms from "./SelectInputForms";

interface setToggleModalType {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: boolean;
}

function AddRecipeModal({ setToggleModal, toggleModal }: setToggleModalType) {
  //   const [open, setOpen] = useState(true);
  //   console.log(toggleModal);
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
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <DialogPanel
              transition
              className='relative transform overflow-auto rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95'
            >
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
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
                    />
                    <TextAreaForms />
                    <InputForms
                      title={"Recipe Instructions"}
                      name={"recipeInstructions"}
                      id={"recipeInstructions"}
                      type={"text"}
                    />
                    <SelectInputForms />
                    <InputForms
                      title={"Cooking Time"}
                      name={"cookingTime"}
                      id={"cookingTime"}
                      type={"number"}
                    />
                    <InputForms
                      title={"Recipe Ingredients"}
                      name={"recipeIngredients"}
                      id={"recipeIngredients"}
                      type={"text"}
                    />
                    <section className='h-30 border-1 border-gray-300 overflow-y-scroll p-1'>
                      Recipe Ingredient List
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
