import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { getBook } from "~/lib/books.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const book = getBook(params.slug!);
  if (!book) throw new Response("Not found", { status: 404 });
  return json({ book });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "book not found" }];
  return [{ title: `${data.book.title} — jessica zhang` }];
};

export default function BookDetail() {
  const { book } = useLoaderData<typeof loader>();
  return (
    <Layout className="">
      <Link to="/books" className="text-sm">
        ← all books
      </Link>

      <div className="mt-6 mb-8 flex flex-col sm:flex-row gap-6">
        {book.cover_url && (
          <img
            src={book.cover_url}
            alt={book.title}
            className="w-40 rounded self-start"
          />
        )}
        <div>
          <h1 className="text-xl font-bold mb-1">
            {book.title}{" "}
            {book.favorite && <span className="text-gold">★</span>}
          </h1>
          <p className="text-muted mb-4">{book.author}</p>
          <dl className="text-sm space-y-1">
            <Row label="first read">{book.first_read || "—"}</Row>
            {book.reread_count > 0 && (
              <Row label="most recent">{book.most_recent_read}</Row>
            )}
            {book.reread_count > 0 && (
              <Row label="rereads">{book.reread_count}</Row>
            )}
            {book.reading_time_minutes != null && (
              <Row label="reading time">
                {formatReadingTime(book.reading_time_minutes)}
              </Row>
            )}
            {book.genre.length > 0 && (
              <Row label="genre">{book.genre.join(", ")}</Row>
            )}
          </dl>
        </div>
      </div>

      {book.body && (
        <div className="whitespace-pre-wrap text-fg">{book.body}</div>
      )}
    </Layout>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <dt className="text-muted w-28 shrink-0">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function formatReadingTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
