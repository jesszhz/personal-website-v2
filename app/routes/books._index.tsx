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
      <p className="mb-6">
        <Link to="/">← home</Link>
      </p>
      <h1 className="text-lg mb-6">reading log ⋆⭒˚｡⋆</h1>

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      )}
    </Layout>
  );
}

const GLOW_COLORS = [
  "var(--color-love)",
  "var(--color-gold)",
  "var(--color-rose)",
  "var(--color-pine)",
  "var(--color-foam)",
  "var(--color-iris)",
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function BookCard({ book }: { book: Book }) {
  const h = hashSlug(book.slug);
  const glow = GLOW_COLORS[h % GLOW_COLORS.length];
  const tilt = `${(h % 2 === 0 ? 1 : -1) * (1 + ((h >> 3) % 2) * 0.5)}deg`;
  return (
    <Link
      to={`/books/${book.slug}`}
      style={
        { "--glow": glow, "--tilt": tilt } as React.CSSProperties
      }
      className="block transition duration-300 hover:rotate-[var(--tilt)] hover:[filter:drop-shadow(0_0_14px_rgb(var(--glow)/0.75))]"
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
