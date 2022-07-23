import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../types";
import useAuth from "../hooks/useAuth";

const login = () => {
  const [login, setLogin] = useState<boolean>(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    if (login) {
      signIn(input);
    } else {
      signUp(input);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!flex"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        className="relative mt-24 space-y-8 rounded-lg bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-3xl">Sign In</h1>
        <div className="space-y-4 flex flex-col">
          <label>
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="input-error">Please enter a valid email.</p>
            )}
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="input"
            />
            {errors.password && (
              <p className="input-error">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded transition bg-[#e50914] hover:bg-[#fa0225] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            className="text-white hover:underline"
            type="submit"
            onClick={() => setLogin(false)}
          >
            Sign up now!
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;