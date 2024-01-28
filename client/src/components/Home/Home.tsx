import React from "react";
import code1 from "../../assets/code-1.png";
import code2 from "../../assets/code-2.png";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mx-auto flex max-w-lg flex-col px-4 py-20 lg:max-w-screen-xl lg:flex-row">
        <div className="mb-10 max-w-lg lg:mb-0 lg:pr-16 xl:pr-20">
          <div className="mb-5 text-4xl font-bold text-blue-600">
            An innovative, web-based code editor platform
          </div>
          <div className="mb-5 text-gray-600">
            "Discover the power of Ecoditor, a cutting-edge web-based platform
            designed for effortless code creation and collaborative programming.
            Embrace efficiency with our intuitive features, enabling you to
            write, share, and iterate on code seamlessly. Explore the future of
            coding with Ecoditor, where precision meets collaboration, and your
            coding experience reaches new heights."
          </div>
          <div className="">
            <p className="font-bold text-blue-600">Olaoluwa IBUKUN</p>
            <p className="text-gray-500">CEO, eCoditor</p>
          </div>
        </div>
        <div className="mr-10 mb-6 lg:mb-0">
          <img
            src={code1}
            className="shadow-blue-600/10 w-full max-w-sm object-contain object-left shadow-lg"
          />
          <div className="p-4">
            <p className="mb-1 font-medium uppercase text-blue-600">
              Who we are
            </p>
            <h5 className="text-gray-600">
              At Ecoditor, we empower developers with a cutting-edge, web-based
              code editor platform.
            </h5>
            <div
              onClick={() => navigate("/faq")}
              className="cursor-pointer mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="">
          <img
            src={code2}
            className="shadow-blue-600/10 w-full max-w-sm object-contain object-left shadow-lg"
          />
          <div className="p-4">
            <p className="mb-1 font-medium uppercase text-blue-600">
              Our Practices
            </p>
            <h5 className="text-gray-600">
              "At Ecoditor, we uphold the highest standards in our coding
              practices. Our commitment to excellence is reflected in our
              collaborative approach...
            </h5>
            <div
              onClick={() => navigate("/faq")}
              className="cursor-pointer mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
