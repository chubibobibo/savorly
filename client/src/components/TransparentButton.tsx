import { FaRegUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { customBtnSize } from "../utils/customBtnSize";
import { useNavigate } from "react-router-dom";

/** @keyof creates a new type that is the keys of the object type eg. customBtnSize has type of small meaning it will accept the type if the value passed is 'small'*/
/** @typeof gives you the type of an object e.g: customBtnSize has the type of small: 'w-[20rem] */
type buttonProps = {
  btnName: string;
  size: keyof typeof customBtnSize;
  icon: string;
  nav: string | null;
};

function TransparentButton({ btnName, size, icon, nav }: buttonProps) {
  const navigate = useNavigate();

  const handleNavClick = (linkStr: string | null) => {
    return navigate(`${linkStr}`);
  };

  return (
    <section className='cursor-pointer'>
      <button
        className={`${customBtnSize[size]} bg-white flex items-center text-gray-700 dark:text-gray-700 justify-center gap-x-3 text-sm sm:text-base dark:bg-white dark:border-white dark:hover:bg-gray-800 rounded-lg dark:hover:text-white hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5 cursor-pointer m-auto`}
        onClick={() => handleNavClick(nav)}
      >
        {icon === "user" ? <FaRegUser /> : <FaBook />}
        <span>{btnName}</span>
      </button>
    </section>
  );
}
export default TransparentButton;
