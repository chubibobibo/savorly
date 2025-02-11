import { FaRegUser } from "react-icons/fa";
import { customBtnSize } from "../utils/customBtnSize";

/** @keyof creates a new type that is the keys of the object type eg. customBtnSize has type of small */
/** @typeof gives you the type of an object e.g: customBtnSize has the type of small: 'w-[20rem] */
type buttonProps = {
  btnName: string;
  size: keyof typeof customBtnSize;
};

function TransparentButton({ btnName, size }: buttonProps) {
  return (
    <section className='cursor-pointer'>
      <button
        className={`${customBtnSize[size]} bg-white flex items-center text-gray-700 dark:text-gray-700 justify-center gap-x-3 text-sm sm:text-base dark:bg-white dark:border-white dark:hover:bg-gray-800 rounded-lg dark:hover:text-white hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5 cursor-pointer`}
      >
        <FaRegUser />
        <span>{btnName}</span>
      </button>
    </section>
  );
}
export default TransparentButton;
