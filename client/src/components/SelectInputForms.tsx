import { badgeCategories } from "../utils/badgeCategories";
// import { IconType } from "react-icons";

type ChangeType = {
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectInputForms({ handleInputChange }: ChangeType) {
  return (
    <section className='flex flex-col'>
      <select
        defaultValue='Select a category'
        className='select select-primary'
        name='category'
        onChange={handleInputChange}
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
