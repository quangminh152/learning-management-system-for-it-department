import { useRouter } from "next/router";
import { useContext } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { AuthContext } from "src/contexts/AuthContext";
import { useAuthContext } from "src/lib/auth_client";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  // const [provider, setProvider] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { pbClient, signInWithPassword, signOut } = useAuthContext();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await signInWithPassword(data.email, data.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-4 overflow-hidden px-4 sm:px-0">
        <div className="relative h-96">
          <div>
            <h1 className="text-white">App Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="email" {...register("email", { required: true })} />
              {errors.email && <span>Email is required</span>}

              <input
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>Password is required</span>}

              <input
                className="border bg-indigo-800 p-2 text-white hover:bg-indigo-700"
                type="submit"
              />
            </form>

            {/* <span
              className="cursor-pointer text-center text-sm text-gray-600"
              onClick={() => {
                setShowForgotPassword(!showForgotPassword);
              }}
            >
              Forgotten Password?
            </span> */}
          </div>
          <button
            className="border bg-indigo-800 p-2 text-white hover:bg-indigo-700"
            onClick={() => console.log(pbClient.authStore.token)}
          >
            Check status
          </button>
          <button
            className="border bg-indigo-800 p-2 text-white hover:bg-indigo-700"
            onClick={signOut}
          >
            Sign out
          </button>
          {/* <div
            className={classNames(
              !showForgotPassword
                ? "-z-10 h-0 translate-y-3 opacity-0"
                : "translate-y-0 opacity-100",
              "flex w-full flex-col items-center space-y-4 transition-all"
            )}
          >
            <SubHeading>Recover you Password</SubHeading>
            <InputField
              name="recoverEmail"
              label="Email"
              icon={EnvelopeIcon}
              required={true}
              type="email"
            />

            <StyledButton
              name="Send Recovery Link"
              type={StyledButtonType.Primary}
              icon={EnvelopeOpenIcon}
              iconAnimation={false}
              onClick={handleForgotPassword}
            />

            <StyledButton
              name="Back to Login"
              type={StyledButtonType.Secondary}
              onClick={() => {
                setShowForgotPassword(!showForgotPassword);
              }}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
