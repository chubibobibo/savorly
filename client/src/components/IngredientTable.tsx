import { RecipeDataProps } from "../types/Types";
import { IoIosCloseCircle } from "react-icons/io";

function IngredientTable({
  data,
  recipeData,
  recipeDataStateSetter,
  isForDisplay,
}: RecipeDataProps) {
  /** @filteredRecipes function that filters recipesIngredients by it's id then updates the recipeIngredient in the recipeData state to the filtered ingredients */
  /** @isForDisplay passed boolean as props, used to determine if ingredient table is for adding ingredients or just displaying */
  /** @recipeDataDateSetter callback  function that allows the setting of recipeData state. Implemented this so that we won't have to pass the setRecipeData function */

  // console.log(data);
  const filteredRecipes = (id: string) => {
    const filtered = recipeData?.recipeIngredients?.filter((recipesFiltered) =>
      recipesFiltered.id
        ? recipesFiltered.id !== id
        : recipesFiltered._id !== id
    );
    if (recipeDataStateSetter) {
      recipeDataStateSetter((prev) => {
        return { ...prev, recipeIngredients: [...filtered] }; //uses the previous recipe data then access the recipeIngredients and use the filtered data as it's value
      });
      // console.log(filtered);
    }
  };
  return (
    <>
      <div className='overflow-x-auto border-b-1 border-gray-400'>
        <table className='table table-zebra'>
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th className='paragraphMd'>Ingredient Name</th>
              <th className='paragraphMd'>Quantity</th>
            </tr>
          </thead>
          <tbody className='text-[14px] bg-custom-yellow'>
            {/* row 1 */}
            {data?.recipeIngredients.length !== 0 ? (
              data?.recipeIngredients.map((prev, idx) => {
                // console.log(prev);
                return (
                  <tr key={idx}>
                    <th
                      onClick={() => {
                        filteredRecipes(prev.id ? prev.id : prev._id);
                      }}
                    >
                      {!isForDisplay ? (
                        <IoIosCloseCircle
                          size={20}
                          color='red'
                          cursor='pointer'
                        />
                      ) : (
                        idx + 1
                      )}
                    </th>
                    <td className='paragraphMd'>{prev.ingredientName}</td>
                    <td className='paragraphMd'>{prev.ingredientQty}</td>
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
