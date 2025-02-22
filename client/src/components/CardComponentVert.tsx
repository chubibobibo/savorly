import { capitalize } from "../utils/capitalize";
import { RecipePropsIndex } from "../types/Types";

import { FaRegClock } from "react-icons/fa";

function CardComponentVert({
  recipeName,
  recipeDescription,
  cookingTime,
  category,
}: RecipePropsIndex) {
  return (
    <>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <img className='w-full' src='/logo.png' alt='Sunset in the mountains' />
        {/** Description body */}
        <div className='px-6 py-4 space-x-2'>
          <div className='font-bold text-xl mb-2'>{capitalize(recipeName)}</div>
          <div className='pt-4 pb-2'>
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              {category}
            </span>
          </div>
          <p className='text-gray-700 text-base'>{recipeDescription}</p>
          <p className='text-gray-700 text-base flex items-center gap-2'>
            <FaRegClock className='text-custom-blue' /> {cookingTime} minutes
          </p>
        </div>
      </div>
    </>
  );
}
export default CardComponentVert;
