# Deno React Demo

## Usage

Install or upgrade to [Deno](https://deno.land) v1.22.0 or newer.

In the directory root, run

```
$ deno cache --no-check deps.ts
```

Deno will download and cache the required dependencies.

Open `config.json` and make any necessary changes. Fields are type-sensitive.

Bundle the client-side code with

```
$ deno bundle --no-check client.tsx bundle.js
```

A `bundle.js` file will be emitted to the root directory.

To start the server, run

```
$ deno run --allow-net --allow-read=. server.tsx
```
