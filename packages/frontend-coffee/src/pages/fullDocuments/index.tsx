import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import type { ListResult } from "pocketbase";
import type { FullDocumentsResponse } from "server-cheesecake";
import { Collections } from "server-cheesecake";
import MainLayout from "src/components/layouts/MainLayout";
import { getPBServer } from "src/lib/pb_server";
import SuperJSON from "superjson";

interface FullDocumentsData {
  fullDocuments: ListResult<FullDocumentsResponse>;
}

function FullDocuments({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!data) {
    return <ErrorPage statusCode={404} />;
  }

  const dataParse = SuperJSON.parse<FullDocumentsData>(data);

  const FullDocumentsList = dataParse.fullDocuments.items.map((fullDoc) => (
    <li key={fullDoc.id}>{JSON.stringify(fullDoc.expand?.document.name)}</li>
  )) ?? <p>{"Error when fetching full documents :<"}</p>;

  return (
    <>
      <Head>
        <title>FullDocuments</title>
      </Head>
      <h1>FullDocuments</h1>
      <ol>{FullDocumentsList}</ol>
    </>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const pbServer = await getPBServer(req, res);
  const fullDocuments = await pbServer
    .collection(Collections.FullDocuments)
    .getList<FullDocumentsResponse>(1, 50, {
      expand: "document",
    });

  return {
    props: {
      data: SuperJSON.stringify({ fullDocuments }),
    },
  };
};

FullDocuments.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default FullDocuments;
