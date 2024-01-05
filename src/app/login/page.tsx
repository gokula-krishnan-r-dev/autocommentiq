"use client";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section>
      <>
        <div className="container flex flex-col mx-auto bg-black rounded-lg pt-12 my-5">
          <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
            <div className="flex items-center justify-center w-full lg:p-12">
              <div className="flex items-center xl:p-10">
                <form className="flex flex-col w-full h-full pb-6 text-center bg-black rounded-3xl">
                  <h3 className="mb-3  text-4xl font-extrabold text-dark-grey-900">
                    Sign In
                  </h3>
                  <p className="mb-4 text-grey-700">
                    Enter your email and password
                  </p>
                  <Link
                    href="http://localhost:3000/auth/google"
                    className="flex border px-24 border-white items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
                  >
                    <img
                      className="h-5 mr-2"
                      src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                      alt=""
                    />
                    Sign in with Google
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default page;
