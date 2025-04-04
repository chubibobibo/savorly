type ButtonProps = {
  title: string;
  onClickAddIngredients?: () => void;
  type: "submit" | "button";
  isDisabled?: boolean;
  isSubmitting?: boolean;
  onClickProps?: () => void;
};

function Button({
  title,
  onClickProps,
  type,
  isSubmitting,
  isDisabled,
}: ButtonProps) {
  return (
    <>
      <button
        className=' btn btn-primary btn-sm  shadow-3xl text-base-content'
        onClick={onClickProps}
        type={type}
        disabled={isDisabled}
      >
        {isSubmitting ? "Submitting..." : title}
      </button>
    </>
  );
}
export default Button;
