import { badgeCategories } from "../utils/badgeCategories";
// import { IconType } from "react-icons";

type ChangeType = {
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectInputForms({ handleInputChange }: ChangeType) {
  // console.log(typeof updateRecipeData.category);
  return (
    <section className='flex flex-col'>
      <label
        className='block text-gray-700 text-sm font-bold mb-1'
        htmlFor='recipeInstruction'
      >
        Category
      </label>
      <select
        // value={updateRecipeData.category || "pork"}
        className='select select-primary md:w-12/12'
        name='category'
        onChange={handleInputChange}
        required
      >
        {badgeCategories.map((newCat) => (
          <option value={newCat.name} key={newCat?.badgeId}>
            {newCat.name}
          </option>
        ))}
        <option selected disabled hidden value=''>
          Choose the category...
        </option>
      </select>
    </section>
  );
}
export default SelectInputForms;
