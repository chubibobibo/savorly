import { badgeProperties } from "../utils/badgeProperties";
import { capitalize } from "../utils/capitalize";

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
        className={`inline-block ${badgeColor} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 -ml-1 mb-21`}
      >
        {capitalize(category)}
      </span>
    </>
  );
}
export default CategoryBadge;
