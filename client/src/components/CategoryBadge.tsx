import { badgeProperties } from "../utils/badgeProperties";
import { capitalize } from "../utils/capitalize";

/** This component is rendered in it's parent component CardComponentHorz.tsx */
type CategoryProps = {
  category:
    | "pork"
    | "beef"
    | "fish"
    | "chicken"
    | "vegetarian"
    | "vegan"
    | "dessert";
};

function CategoryBadge({ category }: CategoryProps) {
  /** @badgeColor accessing the colors (from the badgeProperties) for a certain badge  depending on the category props */
  const badgeColor = badgeProperties[category];

  return (
    <>
      <span
        className={`inline-block ${badgeColor} rounded-full px-3 py-1  text-xs font-semibold text-gray-700 -ml-1 mb-2`}
      >
        {capitalize(category)}
      </span>
    </>
  );
}
export default CategoryBadge;
