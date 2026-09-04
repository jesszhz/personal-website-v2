import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import Layout from "~/components/Layout";
import { allGenres, getBooks, type Book } from "~/lib/books.server";

export const meta: MetaFunction = () => [
  { title: "jessica zhang | books" },
  { name: "description", content: "books I've read" },
];

export const loader = async () => {
  return json({ books: getBooks(), genres: allGenres() });
};

export default function BooksIndex() {
  const { books, genres } = useLoaderData<typeof loader>();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filtered = useMemo(
    () =>
      books.filter((b) => {
        if (favoritesOnly && !b.favorite) return false;
        if (
          selectedGenres.length &&
          !b.genre.some((g) => selectedGenres.includes(g))
        )
          return false;
        return true;
      }),
    [books, selectedGenres, favoritesOnly],
  );

  const toggleGenre = (g: string) =>
    setSelectedGenres((s) =>
      s.includes(g) ? s.filter((x) => x !== g) : [...s, g],
    );

  return (
    <Layout className="" maxWidth="max-w-5xl">
      <h1 className="text-lg mb-6">books ⋆⭒˚｡⋆</h1>

      <div className="mb-8 flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() => setFavoritesOnly((v) => !v)}
          className={`px-3 py-1 rounded-full text-sm transition ${
            favoritesOnly
              ? "bg-gold text-bg"
              : "bg-overlay text-fg hover:bg-highlightMed"
          }`}
        >
          ★ favourites
        </button>
        {genres.length > 0 && <span className="mx-1 text-muted">|</span>}
        {genres.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => toggleGenre(g)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              selectedGenres.includes(g)
                ? "bg-foam text-bg"
                : "bg-overlay text-fg hover:bg-highlightMed"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted mt-8">no books match those filters.</p>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {filtered.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      )}
    </Layout>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <Link
      to={`/books/${book.slug}`}
      className="block mb-4 break-inside-avoid group"
    >
      <div className="relative overflow-hidden rounded bg-overlay aspect-[2/3]">
        {book.cover_url ? (
          <BookCover src={book.cover_url} alt={book.title} />
        ) : (
          <PlaceholderCover title={book.title} />
        )}
        {book.favorite && (
          <span className="absolute top-2 right-2 text-gold text-lg drop-shadow">
            ★
          </span>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-bg/85 flex flex-col justify-end p-3">
          <p className="font-bold text-sm">{book.title}</p>
          <p className="text-xs text-muted">{book.author}</p>
        </div>
      </div>
    </Link>
  );
}

function BookCover({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <PlaceholderCover title={alt} />;
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth <= 1) setFailed(true);
      }}
      onError={() => setFailed(true)}
    />
  );
}

function PlaceholderCover({ title }: { title: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 text-center text-fg/70 text-sm">
      {title}
    </div>
  );
}
