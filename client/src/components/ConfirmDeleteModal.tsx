type HandleDeleteType = {
  handleClick: (id: string) => void;
  recipeId: string;
};

function ConfirmDeleteModal({ handleClick, recipeId }: HandleDeleteType) {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            You are about to delete this recipe!
          </h3>
          <p className='py-4'>Are you sure you want to delete this recipe</p>
          <div className='modal-action'>
            <form method='dialog' className='flex gap-2'>
              {/* if there is a button in form, it will close the modal */}
              <button
                className='btn btn-error'
                onClick={() => {
                  handleClick(recipeId);
                }}
              >
                Confirm Delete
              </button>
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
export default ConfirmDeleteModal;
