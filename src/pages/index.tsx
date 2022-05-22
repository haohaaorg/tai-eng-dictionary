import * as React from "react";

import type { NextPage } from "next";
import Head from "next/head";

import axios from "axios";

const endpointURL =
  `${process.env.ENDPOINT_URL}${process.env.API_KEY}` ||
  `${process.env.BASE_URL}`;

type Translation = {
  Antonym: {
    word_id: number;
    english: string;
    shan: string;
  };
  Definition: {
    word_id: number;
    english: string;
    shan: string;
    pos: string;
    uncount: string;
  };
  english: string;
  shan: string;
  id: number;
};

const Home: NextPage = () => {
  const [endpoint, setEndpoint] = React.useState<"eng" | "shn">("eng");
  const [searchWord, setSearchWord] = React.useState("");

  const [result, setResult] = React.useState<Translation[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  const [mounted, setMounted] = React.useState(false);

  const handleSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const toggleEndpoint = () => {
    setResult([]);
    setSearchWord("");
    setEndpoint(endpoint === "eng" ? "shn" : "eng");
  };

  const handleSearch = async () => {
    if (!searchWord) {
      return;
    }
    setLoading(true);
    setResult([]);

    await axios
      .get(`${endpointURL}/${endpoint}/${searchWord.toLowerCase()}`)
      .then((res) => {
        if (!res.data.data) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setNotFound(false);
        setLoading(false);
        setResult(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        setNotFound(true);
      });
  };

  React.useMemo(async () => {
    await axios.get(`${process.env.BASE_URL}`).catch((err) => {
      console.log("Api not ready, Please try again later");
    });
  }, []);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div>
      <Head>
        <title>Tai-Eng Dictionary</title>
        <meta name="description" content="Tai-Eng easy dictionary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <header className="rounded-3xl">
          <div
            className="bg-gradient-to-br from-blue-100 via-orange-200 to-yellow-600 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-900"
            style={{
              height: "32rem",
            }}
          >
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-center">
                <h1 className="font-extrabold text-transparent text-5xl p-10 bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                  Tai - Eng easy Dictionary
                </h1>
                <div className="m-5">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={toggleEndpoint}
                  >
                    {endpoint === "eng" ? "Eng - Tai" : "Tai - Eng"}
                  </button>
                </div>
                <div className="flex bg-white rounded-lg overflow-hidden px-1 py-1 mx-3">
                  <input
                    className="bg-white input input-info input-bordered text-base text-black-400 flex-grow outline-none px-2 text-black leading-3"
                    type="text"
                    placeholder={
                      endpoint === "eng" ? "English text" : "ၶေႃႈၵႂၢမ်းတႆး"
                    }
                    value={searchWord}
                    onChange={handleSearchWord}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-base rounded-lg px-4 py-2 font-thin"
                    onClick={handleSearch}
                  >
                    {endpoint === "eng" ? "Search" : "သွၵ်ႈႁႃ"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        <body>
          {loading && (
            <div className="border border-gray-300 shadow rounded-3xl p-4 mx-5 mt-5">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {result?.length > 0 && !loading ? (
            <div className="md:mx-20 p-3">
              {result.map((item) => (
                <div
                  key={item.id}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 border rounded-3xl girder-gray-200 shadow"
                >
                  <h1 className="text-2xl font-semibold md:text-3xl capitalize my-3">
                    {endpoint === "eng" ? item.english : item.shan}
                  </h1>
                  <hr />
                  <div className="my-3">
                    <div className="flex">
                      <b>{`[${item.Definition.pos}.]`}</b>
                      <p className="ml-2">
                        {endpoint === "eng" ? item.shan : item.english}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="my-3">
                      <div className="flex">
                        <b>Definition</b>
                      </div>
                    </div>
                    <div className="mx-5">
                      <div className="my-3">
                        <div className="flex">
                          <b>Shan</b>
                          <p className="ml-2">{item.Definition.shan}</p>
                        </div>
                      </div>
                      <div className="my-3">
                        <div className="flex">
                          <b>English</b>
                          <p className="ml-2">{item.Definition.english}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {(item.Antonym.english.length > 0 ||
                    item.Antonym.shan.length > 0) && (
                    <div>
                      <div className="my-3">
                        <div className="flex">
                          <b>Antonym</b>
                        </div>
                      </div>
                      <div className="mx-5">
                        <div className="my-3">
                          <div className="flex">
                            <b>Shan</b>
                            <b className="ml-2">{item.Antonym.shan}</b>
                          </div>
                        </div>
                        <div className="my-3">
                          <div className="flex">
                            <b>English</b>
                            <b className="ml-2">{item.Antonym.english}</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            !loading &&
            notFound && (
              <div className="flex items-center justify-center h-full w-full">
                <p className="text-center text-gray-500 font-extrabold text-transparent text-2xl p-10">
                  Nothing Found!
                </p>
              </div>
            )
          )}
        </body>
      </main>
    </div>
  );
};

export default Home;
