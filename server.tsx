import React from "react";
import { Application, Router } from "oak";
import { matchRoutes } from "react-router-dom";
import { renderToString } from "react-dom-server";
import { StaticRouter } from "react-router-dom-server";
import config from "./config.json" assert { type: "json" };
import { App, routes } from "./components/App.tsx";

const app = new Application();
const router = new Router();

// Stylesheet
const stylesheet = await Deno.readTextFile("stylesheet.css");
router.get("/main.css", (context) => {
  context.response.type = "text/css";
  context.response.body = stylesheet;
});

// Bundled script
const bundle = await Deno.readTextFile("bundle.js");
router.get("/main.js", (context) => {
  context.response.type = "application/javascript";
  context.response.body = bundle;
});

app.use(router.routes());
app.use(router.allowedMethods());

// Single Page Application
app.use((context) => {
  if (!matchRoutes(routes, context.request.url)) {
    context.response.redirect("/");
  }
  const html = renderToString(
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Deno React Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/main.css" />
        <script type="module" src="/main.js"></script>
      </head>
      <body>
        <StaticRouter location={context.request.url}>
          <App />
        </StaticRouter>
      </body>
    </html>,
  );
  context.response.type = "text/html";
  context.response.body = `<!DOCTYPE html>${html}`;
});

app.addEventListener("listen", (event) => {
  console.info(`Listening on port ${event.port}`);
});

app.addEventListener("error", (event) => {
  console.error(event.error);
});

app.listen({ port: config.port });
