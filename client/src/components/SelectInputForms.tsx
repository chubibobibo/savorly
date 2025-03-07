import { badgeCategories } from "../utils/badgeCategories";
import { IconType } from "react-icons";

type ChangeType = {
  selected: {
    name: string;
    value: string;
    description: string;
    href: string;
    badgeId: number;
    icon: IconType;
  };

  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectInputForms({ selected, handleInputChange }: ChangeType) {
  // console.log(selected);
  return (
    <section className='flex flex-col'>
      <label className='block text-gray-700 text-sm font-bold mb-1'>
        Category
      </label>
      <select
        name='category'
        value={selected.name}
        onChange={handleInputChange}
        className='border-1 border-gray-700 rounded-sm h-10 focus:border-green-700 focus:border-2'
        required
      >
        {badgeCategories.map((newCat) => (
          <option value={newCat.name} key={newCat?.badgeId}>
            {newCat.name}
          </option>
        ))}
      </select>
    </section>
  );
}
export default SelectInputForms;
