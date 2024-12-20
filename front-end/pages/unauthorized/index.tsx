import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";

const Unauthorized = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleButton = () => {
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Rootz | {t("unauthorized.title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col items-center mt-20">
        <h1 className="text-white text-3xl font-bold">
          {t("unauthorized.message")}
        </h1>
        <button
          onClick={handleButton}
          className="text-white mt-5 px-4 pb-1 font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-[1px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
        >
          {t("unauthorized.button")}
        </button>
      </main>
    </>
  );
};

export default Unauthorized;

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
