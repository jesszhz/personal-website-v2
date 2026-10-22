import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
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

export default function Index() {
  return (
    <Layout className="">
      <div>
        <h1 className="text-lg mb-12">jsczhkdjs ⋆⭒˚｡⋆{"\u200E"}♡‧₊˚</h1>
        <p className="mb-4">Hey! It's really good to see you!</p>
        <p className="mb-4">
          If you're an employer, feel free to take a browse through my{" "}
          <a
            href="https://www.linkedin.com/in/jesszhz/"
          >
            LinkedIn
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/jesszhz"
          >
            GitHub
          </a>
          .
        </p>
        <p className="mb-4">
          If you're a friend, here's my{" "}
          <a
            href="https://docs.google.com/document/d/1aUQ7djrpsxkkIcZthPRUq2dBezo5oJDwg9HNby-Tkng/edit?usp=sharing"
          >
            ideal hotpot night game plan
          </a>{" "}
          and my{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1LS9LdJ1sXdwsJSLQ0w2uVwDahs10Dkh9WmecSx-f8Yc/edit?usp=sharing"
          >
            categorical classification of study spaces on campus
          </a>{" "}
          (msg me for editing permissions).
        </p>
        <p className="mt-8">
          <Link to="/books">reading log →</Link>
        </p>
      </div>
    </Layout>
  );
}
