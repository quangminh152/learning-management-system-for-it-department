import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useAuthContext } from "src/lib/auth_client";

interface passwordResetInputs {
  token: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const NewPassword: NextPage = () => {
  // const [provider, setProvider] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordResetInputs>();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>();

  const { confirmPasswordResetEmail } = useAuthContext();

  // Automatically add token and redirect back to forget password page
  // if there is no token

  const onSubmit: SubmitHandler<passwordResetInputs> = async (data) => {
    try {
      const isSuccess = await confirmPasswordResetEmail(
        data.token,
        data.newPassword,
        data.newPasswordConfirm
      );
      if (isSuccess) {
        router.push("/auth/login");
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
                type="text"
                {...register("token", { required: true })}
              />
              {errors.token && <span>Token is required</span>}
              <input
                className="border"
                type="password"
                {...register("newPassword", { required: true })}
              />
              {errors.newPassword && <span>New Password is required</span>}
              <input
                className="border"
                type="password"
                {...register("newPasswordConfirm", { required: true })}
              />
              {errors.newPasswordConfirm && (
                <span>New Password Confirm is required</span>
              )}
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

export default NewPassword;
