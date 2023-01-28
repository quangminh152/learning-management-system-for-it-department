import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import type { ListResult } from "pocketbase";
import type { CoursesResponse } from "server-cheesecake";
import { Collections } from "server-cheesecake";
import MainLayout from "src/components/layouts/MainLayout";
import { getPBServer } from "src/lib/pb_server";
import SuperJSON from "superjson";

interface LectureCoursesData {
  lectureCourses: ListResult<CoursesResponse>;
}

function LectureCourses({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!data) {
    return <ErrorPage statusCode={404} />;
  }

  const dataParse = SuperJSON.parse<LectureCoursesData>(data);

  const LectureCoursesList = dataParse.lectureCourses.items.map((courseDoc) => (
    <li key={courseDoc.id}>
      {JSON.stringify(courseDoc.expand?.document.name)}
    </li>
  )) ?? <p>{"Error when fetching full documents :<"}</p>;

  return (
    <>
      <Head>
        <title>LectureCourses</title>
      </Head>
      <h1>LectureCourses</h1>
      <ol>{LectureCoursesList}</ol>
    </>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const pbServer = await getPBServer(req, res);
  const lectureCourses = await pbServer
    .collection(Collections.Courses)
    .getList<CoursesResponse>(1, 50, {
      expand: "document",
    });

  return {
    props: {
      data: SuperJSON.stringify({ lectureCourses }),
    },
  };
};

LectureCourses.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default LectureCourses;
