import LoginForm from "@/components/login/loginform";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Rootz | Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex justify-center mt-20">
        <LoginForm></LoginForm>
      </main>
    </>
  );
};

export default Login;
