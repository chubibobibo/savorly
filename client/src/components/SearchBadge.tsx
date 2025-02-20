import { SearchBadgeProps } from "../types/Types";

function SearchBadge({ name, BadgeIcon, onClick, badgeId }: SearchBadgeProps) {
  return (
    <>
      <section
        className={`badges-sm badges-md m-2 rounded-full bg-green-200 px-3 py-1 font-semibold text-gray-700 -ml-1 mb-2 flex items-center gap-1 hover:bg-red-100 cursor-pointer active:bg-light-custom-rose ${
          badgeId === name && "bg-yellow-600 text-white "
        }`}
        onClick={onClick}
      >
        <BadgeIcon />
        {name}
      </section>
    </>
  );
}
export default SearchBadge;
