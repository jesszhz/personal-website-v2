import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BOOKS_DIR = path.join(process.cwd(), "content", "books");
const WPM = 250;

export type BookFrontmatter = {
  title: string;
  author: string;
  genre?: string[];
  isbn?: string;
  cover?: string;
  read_dates: string[];
  favorite?: boolean;
  word_count?: number;
};

export type Book = {
  slug: string;
  title: string;
  author: string;
  genre: string[];
  isbn?: string;
  favorite: boolean;
  word_count?: number;
  body: string;
  first_read: string;
  most_recent_read: string;
  reread_count: number;
  reading_time_minutes: number | null;
  cover_url: string | null;
};

function resolveCover(fm: BookFrontmatter): string | null {
  if (fm.cover) return `/covers/${fm.cover}`;
  if (fm.isbn) return `https://covers.openlibrary.org/b/isbn/${fm.isbn}-L.jpg`;
  return null;
}

function toBook(filename: string): Book {
  const filepath = path.join(BOOKS_DIR, filename);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as BookFrontmatter;

  const dates = [...(fm.read_dates ?? [])].sort();
  const first_read = dates[0] ?? "";
  const most_recent_read = dates.at(-1) ?? "";

  return {
    slug: filename.replace(/\.md$/, ""),
    title: fm.title ?? filename,
    author: fm.author ?? "",
    genre: fm.genre ?? [],
    isbn: fm.isbn,
    favorite: !!fm.favorite,
    word_count: fm.word_count,
    body: content.trim(),
    first_read,
    most_recent_read,
    reread_count: Math.max(0, dates.length - 1),
    reading_time_minutes: fm.word_count ? Math.round(fm.word_count / WPM) : null,
    cover_url: resolveCover(fm),
  };
}

export function getBooks(): Book[] {
  if (!fs.existsSync(BOOKS_DIR)) return [];
  const files = fs
    .readdirSync(BOOKS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("."));
  const books = files.map(toBook);
  books.sort((a, b) => (a.most_recent_read < b.most_recent_read ? 1 : -1));
  return books;
}

export function getBook(slug: string): Book | undefined {
  return getBooks().find((b) => b.slug === slug);
}

export function allGenres(): string[] {
  const set = new Set<string>();
  for (const b of getBooks()) for (const g of b.genre) set.add(g);
  return [...set].sort();
}
