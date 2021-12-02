import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

const Error404: NextPage = () => {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white">
      <Head>
        <title>NoerNova_Error404</title>
      </Head>

      <main className={styles.main}>
        <h1 className="text-2xl">404 | Error not found</h1>
        <Link href="/" passHref>
          <button className="mt-10 text-blue-400 hover:text-green-400">
            back to home.
          </button>
        </Link>
      </main>
    </div>
  );
};

export default Error404;
