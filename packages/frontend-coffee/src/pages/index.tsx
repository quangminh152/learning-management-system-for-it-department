import { type NextPage } from "next";
import Tiptap from "src/components/wysiwyg/TipTap";
import { useAuthContext } from "src/lib/auth_client";

const Home: NextPage = () => {
  const { user } = useAuthContext();
  return (
    <>
      <h1>Redirecting...</h1>
      <p>{ JSON.stringify(user?.first_name) }</p>
      <Tiptap />
    </>
  );
};

export default Home;
