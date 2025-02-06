import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as { status: number };
  console.log(error);
  return (
    <>
      <section className='error-container text-header-lg'>
        {error?.status === 404 ? (
          <>
            <p>The page cannot be found</p>
            <img src='../error.png' alt='' className='error-image' />
          </>
        ) : (
          <p>Something went wrong</p>
        )}
      </section>
    </>
  );
}
export default ErrorPage;
