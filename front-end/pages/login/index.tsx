import LoginForm from "@/components/login/loginform";
import RegisterForm from "@/components/login/registerform";
import Head from "next/head";
import { useState } from "react";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const toggleForm = () => setIsRegistering(!isRegistering);

  return (
    <>
      <Head>
        <title>Rootz | Login</title>
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
