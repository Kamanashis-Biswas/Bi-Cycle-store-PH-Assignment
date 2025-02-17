import { Link } from "react-router-dom";

const Error = () => {
    return (
        <main className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-blue-600 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-700 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={'/'}
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    );
};

export default Error;