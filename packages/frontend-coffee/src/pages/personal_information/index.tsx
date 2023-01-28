import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import type { ListResult } from "pocketbase";
import type { CurriculumsResponse, DepartmentsResponse, MajorsRecord, MajorsResponse, RegistrationsResponse, UsersResponse } from "server-cheesecake";
import { Collections } from "server-cheesecake";
import MainLayout from "src/components/layouts/MainLayout";
import { User } from "src/contexts/AuthContextProvider";
import { getPBServer } from "src/lib/pb_server";
import SuperJSON from "superjson";

interface UsersData {
    users: ListResult<UsersResponse>;
    record: UsersResponse
    curriculum: ListResult<CurriculumsResponse>
}

function Users({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!data) {
    return <ErrorPage statusCode={404} />;
  }

  const dataParse = SuperJSON.parse<UsersData>(data);

  const usersList = dataParse.users.items.map((user) => (
    <li key={user.id}>{JSON.stringify(user)}</li>
  )) ?? <p>{"Error when fetching event documents :<"}</p>;

  const currentUser = dataParse.record;
  const major = currentUser.expand?.major as MajorsResponse;
  const department = major.expand?.department as DepartmentsResponse;
  const curriculum = dataParse.curriculum;

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <h1>Users</h1>
      {/* <ol>{usersList}</ol> */}
      <p>{ JSON.stringify(dataParse.record) }</p>
      <p>Name: { currentUser.last_name } { currentUser.first_name }</p>
      <p>Student ID: { currentUser.studentID }</p>
      <p>Major: { major.name }</p>
      <p>Department: { department.name }</p>
      <p>Email: { currentUser.email }</p>
      <p>Curriculum: { JSON.stringify(curriculum.items) } </p>
    </>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const pbServer = await getPBServer(req, res);
  const user = pbServer.authStore.model as User;

  const temp = await pbServer 
    .collection(Collections.Users)
    .getList<UsersResponse>(1, 50, { 
      expand: "registrations(user).class",
    });

    console.log(temp);

  const userRegistration = await pbServer.collection(Collections.Registrations).getFirstListItem<RegistrationsResponse>(`student="${user.id}"`)

  const userRegistrations = await pbServer.collection(Collections.Registrations).getList<RegistrationsResponse>(1, 50, {
    filter: `student="${user.id}"`,
  })

  // for (const userRegistration of userRegistrations) {
  const curriculum = await pbServer.collection(Collections.Curriculums).getList<CurriculumsResponse>(1, 50, {
    filter: `class = "${userRegistration.class}"`,
});

  const users = await pbServer 
    .collection(Collections.Users)
    .getList<UsersResponse>(1, 50, { 
      expand: "major",
    });

    const record = await pbServer.collection(Collections.Users).getFirstListItem<UsersResponse>(`id="${user.id}"`, {
        expand: 'major,major.department',
    });
    
  return {
    props: {
      data: SuperJSON.stringify({ users, record, curriculum }),
    },
  };
};

Users.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Users;

