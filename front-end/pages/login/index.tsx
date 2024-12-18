import LoginForm from "@/components/login/loginform";
import RegisterForm from "@/components/login/registerform";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const toggleForm = () => setIsRegistering(!isRegistering);
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("login.title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex justify-center mt-20">
        {isRegistering ? (
          <LoginForm toggleForm={toggleForm} />
        ) : (
          <RegisterForm toggleForm={toggleForm} />
        )}
      </main>
    </>
  );
};

export default Login;

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
