import { RecipePropsIndex } from "../types/Types";
import { capitalize } from "../utils/capitalize";
import CategoryBadge from "./CategoryBadge";

import { FaRegClock } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";

function CardComponentHorz({
  recipeName,
  recipeDescription,
  cookingTime,
  category,
}: RecipePropsIndex) {
  return (
    <>
      <div className='max-w-md w-full lg:max-w-full lg:flex p-2'>
        <div className='h-48 w-auto sm:w-74 lg:h-auto lg:w-48  flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden'>
          <img
            src='/logo.png'
            alt='recipe image'
            className='h-48 w-90 object-cover lg:object-cover lg:h-60'
          />
        </div>
        <div className='border-r border-b border-l border-gray-300 lg:border-l-0 lg:border-t lg:border-gray-300 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 lg:w-80 flex flex-col justify-between leading-normal'>
          <div className='px-4 py-4 space-x-2'>
            <div className='font-bold text-xl mb-2'>
              {capitalize(recipeName)}
            </div>
            <div className='pt-1'>
              <CategoryBadge category={category} />
            </div>
            <p className='text-gray-700 text-base flex items-center gap-2 pb-2'>
              <FaRegClock className='text-custom-blue' /> {cookingTime} minutes
            </p>
            <p className='text-gray-700 text-base flex items-center gap-2'>
              <MdOutlineDescription className='text-custom-blue' size={20} />
              {recipeDescription}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default CardComponentHorz;
