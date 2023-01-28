import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthContext } from "src/lib/auth_client";

interface LoginInputs {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const router = useRouter();

  const { signInWithPassword, signOut } = useAuthContext();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      await signInWithPassword(data.email, data.password);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-4 overflow-hidden px-4 sm:px-0">
        <div className="relative h-96">
          <div>
            <h1>App Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="border"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && <span>Email is required</span>}

              <input
                className="border"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>Password is required</span>}

              <input
                className="border bg-indigo-800 p-2 text-white hover:bg-indigo-700"
                type="submit"
              />
            </form>
            <button
              className="border bg-indigo-800 p-2 text-white hover:bg-indigo-700"
              onClick={signOut}
            >
              Sign out
            </button>
            {/* <a
              className="cursor-pointer text-center text-sm text-gray-600"
              onClick={() => {
                router.push("forgetPassword");
              }}
            >
              Forgotten Password?
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
