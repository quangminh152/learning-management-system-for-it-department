import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import type { ListResult } from "pocketbase";
import type { RelationshipsResponse } from "server-cheesecake";
import { Collections } from "server-cheesecake";
import MainLayout from "src/components/layouts/MainLayout";
import { getPBServer } from "src/lib/pb_server";
import SuperJSON from "superjson";

interface PeopleData {
  relationships: ListResult<RelationshipsResponse>;
}

function People({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!data) {
    return <ErrorPage statusCode={404} />;
  }

  const dataParse = SuperJSON.parse<PeopleData>(data);

  const RelationshipList = dataParse.relationships.items.map((relationship) => (
    <li key={relationship.id}>
      {`${relationship.expand?.fromPerson.name} - ${relationship.expand?.toPerson.name}`}
    </li>
  )) ?? <p>{"Error when fetching full documents :<"}</p>;

  return (
    <>
      <Head>
        <title>People relationship</title>
      </Head>
      <h1>People relationship</h1>
      <ol>{RelationshipList}</ol>
    </>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const pbServer = await getPBServer(req, res);
  const relationships = await pbServer
    .collection(Collections.Relationships)
    .getList<RelationshipsResponse>(1, 50, {
      expand: "fromPerson,toPerson",
    });

  return {
    props: {
      data: SuperJSON.stringify({ relationships }),
    },
  };
};

People.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default People;
