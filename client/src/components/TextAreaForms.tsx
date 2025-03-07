type ChangeType = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextAreaForms({ onChange }: ChangeType) {
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
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-600 focus:border-2'
        placeholder='Recipe Description'
        rows={5}
        onChange={onChange}
        name='recipeInstruction'
        required
      ></textarea>
    </>
  );
}
export default TextAreaForms;
