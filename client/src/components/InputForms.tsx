import { HTMLInputTypeAttribute } from "react";

type InputProps = {
  title: string;
  type: HTMLInputTypeAttribute;
  name: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
};

function InputForms({ title, type, name, id, onChange, value }: InputProps) {
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
          className='input input-primary md:w-12/12'
          id={id}
          type={type}
          placeholder={title}
          name={name}
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
}
export default InputForms;
