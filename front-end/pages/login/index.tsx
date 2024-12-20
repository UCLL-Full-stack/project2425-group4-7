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
        <table className="text-zinc-400 w-fit table-auto h-fit fixed right-10 bottom-10">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-zinc-400">Username</th>
              <th className="py-2 px-4 border-b border-zinc-400">Password</th>
              <th className="py-2 px-4 border-b border-zinc-400">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-zinc-400">peter</td>
              <td className="py-2 px-4 border-b border-zinc-400">spiderman</td>
              <td className="py-2 px-4 border-b border-zinc-400">User</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-zinc-400">tony</td>
              <td className="py-2 px-4 border-b border-zinc-400">stark</td>
              <td className="py-2 px-4 border-b border-zinc-400">Premium</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-zinc-400">admin</td>
              <td className="py-2 px-4 border-b border-zinc-400">admin123</td>
              <td className="py-2 px-4 border-b border-zinc-400">Admin</td>
            </tr>
          </tbody>
        </table>
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
