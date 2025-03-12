import { RecipeDataProps } from "../types/Types";
import { IoIosCloseCircle } from "react-icons/io";

function IngredientTable({
  data,
  recipeData,
  recipeDataStateSetter,
}: RecipeDataProps) {
  /** @filteredRecipes function that filters recipesIngredients by it's id then updates the recipeIngredient in the recipeData state to the filtered ingredients */
  const filteredRecipes = (id: string) => {
    const filtered = recipeData?.recipeIngredients?.filter(
      (recipesFiltered) => recipesFiltered.id !== id
    );
    recipeDataStateSetter((prev) => {
      return { ...prev, recipeIngredients: [...filtered] };
    });
    // console.log(filtered);
  };
  return (
    <>
      <div className='overflow-x-auto border-b-1 border-gray-400'>
        <table className='table table-zebra'>
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Ingredient Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody className='text-[14px]'>
            {/* row 1 */}
            {data?.recipeIngredients.length !== 0 ? (
              data?.recipeIngredients.map((prev) => {
                return (
                  <tr key={prev.id}>
                    {/* <th>{index + 1}</th> */}
                    <th
                      onClick={() => {
                        filteredRecipes(prev.id ? prev.id : "");
                      }}
                    >
                      <IoIosCloseCircle size={20} color='red' />
                    </th>
                    <td>{prev.ingredientName}</td>
                    <td>{prev.ingredientQty}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <th>1</th>
                <td>Empty</td>
                <td>Empty</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default IngredientTable;
