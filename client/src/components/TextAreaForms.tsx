function TextAreaForms() {
  return (
    <>
      <textarea
        id='story'
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-600 focus:border-2'
        placeholder='Recipe Description'
        rows={5}
      ></textarea>
    </>
  );
}
export default TextAreaForms;
