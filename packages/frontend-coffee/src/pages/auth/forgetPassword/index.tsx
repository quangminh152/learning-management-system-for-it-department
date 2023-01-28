import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useAuthContext } from "src/lib/auth_client";

interface LoginInputs {
  email: string;
}

const ForgetPassword: NextPage = () => {
  // const [provider, setProvider] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>();

  const { requestPasswordResetEmail } = useAuthContext();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const hasSent = await requestPasswordResetEmail(data.email);
      if (hasSent) {
        router.push("/auth/forgetPassword/new");
      } else {
        console.error("Failed to send. Please try again.");
        setErrorMessage("Failed to send. Please try again.");
      }
    } catch (e) {
      const error = e as Error;
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-4 overflow-hidden px-4 sm:px-0">
        <div className="relative h-96">
          <div>
            <h1>Forget Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="border"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && <span>Email is required</span>}
              <input
                className="border bg-indigo-800 p-2 text-white hover:bg-indigo-700"
                value={"Send"}
                type="submit"
              />
            </form>
            {!!errorMessage && errorMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
