import React from "react";

const Pricing: React.FC = () => {
  return (
    <div>
      <div className="relative w-screen">
        <div className="absolute -z-10 hidden h-96 w-full bg-gray-50 lg:block"></div>
        <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
          <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
            <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 -mt-8 -ml-20 hidden w-32 text-emerald-600/30 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
                >
                  <defs>
                    <pattern
                      id="2c67e949-4a23-49f7-bf27-ca140852cf21"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7"></circle>
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#2c67e949-4a23-49f7-bf27-ca140852cf21)"
                    width="52"
                    height="24"
                  ></rect>
                </svg>
                <span className="leading-10">Simple Pricing Model</span>
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              We offers straightforward and transparent pricing structures
              without unnecessary complexities or hidden fees, providing users
              with clear and easily understandable cost structures.
            </p>
          </div>

          <div className="mx-auto grid max-w-screen-md gap-4 px-5 sm:grid-cols-1 sm:px-20 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg border bg-white px-4 py-4 shadow md:items-start">
              <div className="block h-12 w-12">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  enableBackground="new 0 0 512 512"
                  xmlSpace="preserve"
                >
                  <linearGradient
                    id="SVGID_1_"
                    gradientUnits="userSpaceOnUse"
                    x1="250.3955"
                    y1="477.9871"
                    x2="250.3955"
                    y2="147.2783"
                    className="gradient-element"
                  >
                    <stop
                      offset="0"
                      className="primary-color-gradient"
                      style={{ stopColor: "#81FBB8" }}
                    ></stop>
                    <stop
                      offset="1"
                      className="secondary-color-gradient"
                      style={{ stopColor: "#28C76F" }}
                    ></stop>
                  </linearGradient>
                  <path
                    fill="url(#SVGID_1_)"
                    d="M383.9,169v72.2l25,16.2v33.1v93.2c0,2.5-1,4.9-2.7,6.5c-1.7,1.7-4,2.7-6.5,2.7	c-22,1.3-87.6,73.9-110.2,80.9c-75.5,23.4-125.7-14.8-188.3-35.6c-5.1,0-9.2-4.1-9.2-9.2v-14.4c0-12.1,9.8-21.9,21.9-21.9h98v79.5	h73.6l-0.6-79.5h43.3c3.9,0,7.3-2.5,8.6-5.9l0.6-175.2L330,207l0-15.9c0-20.2,6.5-31.3,26.7-38.6C367.2,149.5,375.2,158.7,383.9,169	z M274.3,377.9h-55.9v-40.6H174v40.6h-55.9v-82.4h43.3c3.9,0,7.3-2.5,8.6-5.9l0.6-175.2c0.7-1.6,1.8-3,3.2-3.9c1.4-0.9,3-1.4,4.8-1.4	s3.4,0.5,4.8,1.4c1.4,0.9,2.5,2.2,3.2,3.9l0.6,175.2c1.3,3.4,4.7,5.9,8.6,5.9h43.3L274.3,377.9z M389.1,239.6	c7.9,0,14.5,6.4,14.5,14.5v15.9l-34.2-21.9L389.1,239.6z M389.1,284.1v0.6l-28.3,18l-11.2-7.2l-0.2-0.1L233.1,230l-0.2-0.1l-3.5-2.2	l-0.3-0.2l-0.1-0.1L159.4,172H132l0,12.1c0,9.3-7.6,16.9-16.9,16.9s-16.9-7.6-16.9-16.9V104.7c0-9.3,7.6-16.9,16.9-16.9h5.4	c14.3,0,80,58.6,96,72.4v37.6c0,1.4,0.6,2.8,1.6,3.8l42.3,38.5c1.6,1.5,3.7,2.2,5.8,2.2c1.8,0,3.6-0.6,5.1-1.7c3.2-2.3,3.9-6.7,1.6-9.9	c-4.3-6.3-7.6-12.6-10-18.7c-1.1-3.2-1.9-6.6-2.2-9.8c-1.2-9.7,4.8-19.4,14.5-20.6c9.7-1.2,19.4,4.8,20.6,14.5	c0.3,2.7,0.9,5.5,1.7,8.3c1.7,6,4.2,11.9,7.6-3.3c3.1-13.3,12.5-31.3,25.3-41.6c1.5-1.2,3.2-2.3,4.9-3.1c6.4-3.1,14-4,22.1-2.8	c19.1,2.7,33.5,16.3,40,34.1c6.6,17.7,3,36.4-9.3,49.8c-1.7,2-3.5,3.9-5.4,5.7L389.1,284.1z"
                  ></path>
                </svg>
              </div>
              <h6 className="mt-5 text-xl font-semibold text-gray-900">
                Starter
              </h6>
              <p className="mt-2 text-gray-500">For small teams or startups</p>
              <div className="mt-4">
                <p className="text-gray-900 font-semibold">$29</p>
                <p className="text-gray-500">per user per month</p>
              </div>
              <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
                Get Started
              </button>
            </div>

            <div className="flex flex-col items-center rounded-lg border bg-white px-4 py-4 shadow md:items-start">
              <div className="block h-12 w-12">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  enableBackground="new 0 0 512 512"
                  xmlSpace="preserve"
                >
                  <linearGradient
                    id="SVGID_1_"
                    gradientUnits="userSpaceOnUse"
                    x1="250.3955"
                    y1="477.9871"
                    x2="250.3955"
                    y2="147.2783"
                    className="gradient-element"
                  >
                    <stop
                      offset="0"
                      className="primary-color-gradient"
                      style={{ stopColor: "#81FBB8" }}
                    ></stop>
                    <stop
                      offset="1"
                      className="secondary-color-gradient"
                      style={{ stopColor: "#28C76F" }}
                    ></stop>
                  </linearGradient>
                  <path
                    fill="url(#SVGID_1_)"
                    d="M376.3,91.5c0-32.3-7.4-58.4,37.4-58.4h7.7v68.7h-45.1V91.5z M444,126.4h-23.8	c-46.3,0-38.7,26.2-38.7,58.4v210.3c0,20.8-22.2,38-51,40.6c-2.6,0.2-52,0.4-54.7,0.4c-30.5,0-55.2,17.2-55.2,38.4v13.9h228.1	l1.7-357.6C450.3,128.4,447.5,126.4,444,126.4z M121.5,449.3c-12.1,0-23,3.5-30.9,9.2c-7.9,5.7-12.8,13.6-12.8,22.2v11.4h136.6	v-53.3c-7.2,5.4-16.8,9.1-27.6,10.2C184.9,449.2,123.6,449.3,121.5,449.3z"
                  ></path>
                  <path d="M239.4,101.7v-63c0-4.4,3.6-8,8-8h174.1c4.4,0,8,3.6,8,8v63c0,4.4-3.6,8-8,8h-150c-4.4,0-8-3.6-8-8s3.6-8,8-8h142v-47H255.4	v55c0,4.4-3.6,8-8,8S239.4,106.1,239.4,101.7z M248.1,309.2c-4.4,0-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8s-3.6-8-8-8	h-15.3v-15.3C256.1,312.8,252.5,309.2,248.1,309.2z M298.1,309.2c-4.4,0-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8	s-3.6-8-8-8h-15.3v-15.3C306.1,312.8,302.5,309.2,298.1,309.2z M348.1,309.2c-4.4,0-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3	c4.4,0,8-3.6,8-8s-3.6-8-8-8h-15.3v-15.3C356.1,312.8,352.5,309.2,348.1,309.2z M398.1,309.2c-4.4,0-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8	h23.3c4.4,0,8-3.6,8-8s-3.6-8-8-8h-15.3v-15.3C406.1,312.8,402.5,309.2,398.1,309.2z M271.4,272.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S275.9,272.5,271.4,272.5z M321.4,272.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S325.9,272.5,321.4,272.5z M371.4,272.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S375.9,272.5,371.4,272.5z M421.4,272.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S425.9,272.5,421.4,272.5z M271.4,222.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S275.9,222.5,271.4,222.5z M321.4,222.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S325.9,222.5,321.4,222.5z M371.4,222.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S375.9,222.5,371.4,222.5z M421.4,222.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S425.9,222.5,421.4,222.5z M271.4,172.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S275.9,172.5,271.4,172.5z M321.4,172.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S325.9,172.5,321.4,172.5z M371.4,172.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S375.9,172.5,371.4,172.5z M421.4,172.5h-15.3v-15.3c0-4.4-3.6-8-8-8	s-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S425.9,172.5,421.4,172.5z M473.4,488.1c0,4.4-3.6,8-8,8h-417	c-4.4,0-8-3.6-8-8s3.6-8,8-8h21.4v-218v-43.2c0-4.4,3.6-8,8-8h130.7v-45.3v-43.2c0-4.4,3.6-8,8-8h230.6c4.4,0,8,3.6,8,8v43.2V467	c0,4.4-3.6,8-8,8s-8-3.6-8-8V165.5v-35.2H224.5v35.2v314.6h128.1v-70.4c0-11.3-4.3-11.6-6.7-11.7h-28.6c-1.9,0-6.2,0-6.4,11.9v57	c0,4.4-3.6,8-8,8s-8-3.6-8-8v-57.1c0,0,0-0.1,0-0.1c0.4-25.7,17.3-27.7,22.4-27.7H346c0.1,0,0.2,0,0.2,0c5.2,0.2,22.3,2.6,22.3,27.7	v70.4h96.8C469.8,480.1,473.4,483.7,473.4,488.1z M85.8,480.1h122.7V226.9H85.8v35.2V480.1z M136.4,277.4h-15.3v-15.3	c0-4.4-3.6-8-8-8c-4.4,0-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S140.8,277.4,136.4,277.4z M163.1,293.4h23.3	c4.4,0,8-3.6,8-8s-3.6-8-8-8h-15.3v-15.3c0-4.4-3.6-8-8-8c-4.4,0-8,3.6-8,8v23.3C155.1,289.9,158.6,293.4,163.1,293.4z M136.4,332.5	h-15.3v-15.3c0-4.4-3.6-8-8-8c-4.4,0-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S140.8,332.5,136.4,332.5z M186.4,332.5	h-15.3v-15.3c0-4.4-3.6-8-8-8c-4.4,0-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S190.8,332.5,186.4,332.5z M186.4,387.1	h-15.3v-15.3c0-4.4-3.6-8-8-8c-4.4,0-8,3.6-8,8v23.3c0,4.4,3.6,8,8,8h23.3c4.4,0,8-3.6,8-8S190.8,387.1,186.4,387.1z M299.2,65.2	c-0.9-2.9-3.4-5-6.5-5.4l-3.8-0.6l-1.7-3.4c-1.3-2.7-4.1-4.5-7.2-4.5s-5.8,1.7-7.2,4.5l-1.7,3.4l-3.8,0.6c-3,0.4-5.5,2.5-6.5,5.4	c-0.9,2.9-0.2,6.1,2,8.2l2.7,2.7l-0.6,3.8c-0.5,3,0.7,6,3.2,7.8c2.5,1.8,5.7,2,8.4,0.6l3.4-1.8l3.4,1.8c1.2,0.6,2.4,0.9,3.7,0.9	c1.7,0,3.3-0.5,4.7-1.5c2.5-1.8,3.7-4.8,3.2-7.8l-0.6-3.8l2.7-2.7C299.3,71.2,300.1,68,299.2,65.2z M350.6,65.2	c-0.9-2.9-3.4-5-6.5-5.4l-3.8-0.6l-1.7-3.4c-1.3-2.7-4.1-4.5-7.2-4.5s-5.8,1.7-7.2,4.5l-1.7,3.4l-3.8,0.6c-3,0.4-5.5,2.5-6.5,5.4	c-0.9,2.9-0.2,6.1,2,8.2l2.7,2.7l-0.6,3.8c-0.5,3,0.7,6,3.2,7.8c2.5,1.8,5.7,2,8.4,0.6l3.4-1.8l3.4,1.8c1.2,0.6,2.4,0.9,3.7,0.9	c1.7,0,3.3-0.5,4.7-1.5c2.5-1.8,3.7-4.8,3.2-7.8l-0.6-3.8l2.7-2.7C350.8,71.2,351.6,68,350.6,65.2z M402.1,65.2	c-0.9-2.9-3.4-5-6.5-5.4l-3.8-0.6l-1.7-3.4c-1.3-2.7-4.1-4.5-7.2-4.5c-3,0-5.8,1.7-7.2,4.5l-1.7,3.4l-3.8,0.6	c-3,0.4-5.5,2.5-6.5,5.4s-0.2,6.1,2,8.2l2.7,2.7l-0.6,3.8c-0.5,3,0.7,6,3.2,7.8c1.4,1,3,1.5,4.7,1.5c1.3,0,2.6-0.3,3.7-0.9l3.4-1.8	l3.4,1.8c2.7,1.4,6,1.2,8.4-0.6c2.5-1.8,3.7-4.8,3.2-7.8l-0.6-3.8l2.7-2.7C402.2,71.2,403,68,402.1,65.2z"></path>
                  <path d="M156.5,425.1c0,4.4-3.6,8-8,8H50.2c-4.4,0-8-3.6-8-8s3.6-8,8-8h98.3C152.9,417.1,156.5,420.7,156.5,425.1z M99.5,390.1	c0-4.4-3.6-8-8-8H14.3c-4.4,0-8,3.6-8,8s3.6,8,8,8h77.2C95.9,398.1,99.5,394.5,99.5,390.1z M44.4,78.2h15.8V94c0,4.4,3.6,8,8,8	s8-3.6,8-8V78.2H92c4.4,0,8-3.6,8-8s-3.6-8-8-8H76.2V46.4c0-4.4-3.6-8-8-8s-8,3.6-8,8v15.8H44.4c-4.4,0-8,3.6-8,8S40,78.2,44.4,78.2	z M151.2,113.6h3.9v3.9c0,4.4,3.6,8,8,8c4.4,0,8-3.6,8-8v-3.9h3.9c4.4,0,8-3.6,8-8s-3.6-8-8-8h-3.9v-3.9c0-4.4-3.6-8-8-8	c-4.4,0-8,3.6-8,8v3.9h-3.9c-4.4,0-8,3.6-8,8S146.8,113.6,151.2,113.6z M173.1,160.9h-57.4c-4.4,0-8,3.6-8,8s3.6,8,8,8h57.4	c4.4,0,8-3.6,8-8S177.5,160.9,173.1,160.9z"></path>
                  <path
                    fill="#81FBB8"
                    className="primary-color"
                    d="M57.3,186.2H22.6v-34.7h34.7V186.2z"
                  ></path>
                </svg>
              </div>
              <p className="mt-3 text-lg font-medium">Enterprise</p>
              <p className="text-sm">Upto 50,000 Credits</p>
              <p className="mt-2">
                <span className="text-3xl font-bold">$189</span>
                <span className="text-sm">/mo</span>
              </p>
              <button className="mx-auto mt-4 block h-12 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 focus:ring">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
