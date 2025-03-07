import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
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
  setSelected: (value: {
    name: string;
    value: string;
    description: string;
    href: string;
    badgeId: number;
    icon: IconType;
  }) => void;
};

function SelectInputForms({ selected, setSelected }: ChangeType) {
  //   const [selected, setSelected] = useState(badgeCategories[3]);

  //   console.log(selected);
  return (
    <section>
      <Listbox value={selected} onChange={setSelected} name='category'>
        <Label className='block  text-gray-700 text-sm font-bold mb-1'>
          Recipe Category
        </Label>
        <div className='relative mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-600 focus:border-2'>
          <ListboxButton className='grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'>
            <span className='col-start-1 row-start-1 flex items-center gap-3 pr-6'>
              <span className='block truncate'>{selected.name}</span>
            </span>
            <ChevronUpDownIcon
              aria-hidden='true'
              className='col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4'
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm'
          >
            {badgeCategories.map((eachCat) => (
              <ListboxOption
                key={eachCat.badgeId}
                value={eachCat}
                className='group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden'
              >
                <div className='flex items-center'>
                  <span className='ml-3 block truncate font-normal group-data-selected:font-semibold'>
                    {eachCat.name}
                  </span>
                </div>

                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white'>
                  <CheckIcon aria-hidden='true' className='size-5' />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </section>
  );
}
export default SelectInputForms;
