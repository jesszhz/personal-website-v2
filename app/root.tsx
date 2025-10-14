import type { LinksFunction } from "@remix-run/node";
import "@theme-toggles/react/css/Horizon.css"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { DarkModeToggle } from "~/components/DarkModeToggle";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export default function App() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var storageKey = 'theme-preference';
                  var classList = document.documentElement.classList;
                  var stored = localStorage.getItem(storageKey);
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored === 'light' || stored === 'dark' ? stored : (systemDark ? 'dark' : 'light');
                  classList.remove('light','dark');
                  classList.add(theme);
                } catch(_) {}
              })();
            `,
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
          <DarkModeToggle />
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
