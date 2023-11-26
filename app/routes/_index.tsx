import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import Layout from "~/components/Layout";

export const meta: MetaFunction = () => {
  return [
    { title: "jessica zhang | howdy!" },
    {
      name: "description",
      content: "the website/bulliten/dumping ground of Jessica Zhang",
    },
  ];
};

export const loader = async () => {
  return { ok: true };
};

export default function Index() {
  useEffect(() => {
    console.log(data);
  });

  const data = useLoaderData();

  return (
    <Layout className="bg-[#EDFFED]">
      <div>
        <h1 className="text-lg mb-12">jsczhkdjs ⋆⭒˚｡⋆{"\u200E"}♡‧₊˚</h1>
        <p className="mb-4">Hey! Welcome to my personal bashing ground.</p>
        <p className="mb-4">
          If you're an employer, feel free to take a browse through my{" "}
          <a
            className="text-amber-600 hover:text-amber-800 transition ease-in-out duration-300"
            href="https://www.linkedin.com/in/jesszhz/"
          >
            LinkedIn
          </a>{" "}
          and{" "}
          <a
            className="text-amber-600 hover:text-amber-800 transition ease-in-out duration-300"
            href="https://github.com/jesszhz"
          >
            GitHub
          </a>
          .
        </p>
        <p className="mb-4">
          If you're a friend, here's my{" "}
          <a
            className="text-amber-600 hover:text-amber-800 transition ease-in-out duration-300"
            href="https://docs.google.com/document/d/1aUQ7djrpsxkkIcZthPRUq2dBezo5oJDwg9HNby-Tkng/edit?usp=sharing"
          >
            ideal hotpot night game plan
          </a>{" "}
          and my{" "}
          <a
            className="text-amber-600 hover:text-amber-800 transition ease-in-out duration-300"
            href="https://docs.google.com/spreadsheets/d/1LS9LdJ1sXdwsJSLQ0w2uVwDahs10Dkh9WmecSx-f8Yc/edit?usp=sharing"
          >
            catagorical classification of study spaces on campus
          </a>{" "}
          (msg me for editing permissions).
        </p>
        {/* <h2 className="mt-12">
          Looking for a place to study on the UWaterloo campus{" "}
          <em>right now</em>?
        </h2> */}
        <p></p>
      </div>
    </Layout>
  );
}
