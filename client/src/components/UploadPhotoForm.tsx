import { PhotoIcon } from "@heroicons/react/24/solid";

type OnChangeType = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function UploadPhotoForm({ onChange }: OnChangeType) {
  return (
    <>
      <div className='col-span-full'>
        <label
          htmlFor='cover-photo'
          className='block text-sm/6 font-medium text-gray-900'
        >
          Cover photo
        </label>
        <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
          <div className='text-center'>
            <PhotoIcon
              aria-hidden='true'
              className='mx-auto size-12 text-gray-300'
            />
            <div className='mt-4 flex text-xs text-gray-600 md:text-sm/6'>
              <label
                htmlFor='file-upload'
                className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500'
              >
                <span>Upload a file</span>
                <input
                  id='file-upload'
                  name='photoUrl'
                  type='file'
                  className='sr-only'
                  onChange={onChange}
                />
              </label>
              <p className='pl-1'>or drag and drop</p>
            </div>
            <p className='text-xs/5 text-gray-600'>PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default UploadPhotoForm;
