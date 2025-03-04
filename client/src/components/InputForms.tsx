type InputProps = {
  title: string;
  type: string;
  name: string;
  id: string;
};

function InputForms({ title, type, name, id }: InputProps) {
  return (
    <>
      <div className='mb-2'>
        <label
          className='block text-gray-700 text-sm font-bold mb-1'
          htmlFor={id}
        >
          {title}
        </label>
        <input
          className='input-field input-field-forms'
          id={id}
          type={type}
          placeholder={title}
          name={name}
        />
      </div>
    </>
  );
}
export default InputForms;
