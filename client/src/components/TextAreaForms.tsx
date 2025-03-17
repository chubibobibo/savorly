type ChangeType = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  value: string;
};

function TextAreaForms({ onChange, name, value }: ChangeType) {
  return (
    <>
      <label
        className='block text-gray-700 text-sm font-bold mb-1'
        htmlFor='recipeInstruction'
      >
        Recipe Instruction
      </label>
      <textarea
        id='recipeInstruction'
        className='textarea textarea-primary md:w-12/12'
        placeholder='Recipe Instruction'
        rows={5}
        onChange={onChange}
        name={name}
        value={value}
      ></textarea>
    </>
  );
}
export default TextAreaForms;
