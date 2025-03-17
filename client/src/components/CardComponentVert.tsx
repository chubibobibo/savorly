import { capitalize } from "../utils/capitalize";
import { RecipePropsIndex } from "../types/Types";
import CategoryBadge from "./CategoryBadge";

import { FaRegClock } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { Button } from "@headlessui/react";

function CardComponentVert({
  recipeName,
  recipeDescription,
  cookingTime,
  category,
}: RecipePropsIndex) {
  return (
    <>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <img className='w-full' src='/logo.png' alt='Recipe image' />
        {/** Description body */}
        <div className='px-4 py-4 space-x-2'>
          <div className='font-bold text-xl mb-2'>{capitalize(recipeName)}</div>
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
        <Button />
      </div>
    </>
  );
}
export default CardComponentVert;
