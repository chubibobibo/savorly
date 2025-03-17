import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as { status: number };
  return (
    <>
      <section className='error-container text-header-lg'>
        {error?.status === 404 ? (
          <>
            <p>The page cannot be found</p>
            <img src='/error.png' alt='' className='error-image' />
          </>
        ) : (
          <>
            <p>Something went wrong</p>
            <img src='/error1.png' alt='' className='error-image' />
          </>
        )}
      </section>
    </>
  );
}
export default ErrorPage;
