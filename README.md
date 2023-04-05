# Stupid Spotify

This is the final project for the course [DH2642 Interaction Programming and the Dynamic Web](https://www.kth.se/student/kurser/kurs/DH2642?l=en)
given at KTH during the spring of 2023.

## Getting started

There are a couple of steps in order to run the software:

### Environment variables

To get the application working correctly make a copy of [`.env.example`](./.env.example)
called `.env` and fill out the fields.

| Variable                | Default                 | Purpose                                                                                          |
| ----------------------- | ----------------------- | ------------------------------------------------------------------------------------------------ |
| `NEXTAUTH_URL`          | `http://localhost:3000` | URL of the host                                                                                  |
| `NEXTAUTH_SECRET`       |                         | See the NextAuth [documentation](https://next-auth.js.org/configuration/options#nextauth_secret) |
| `SPOTIFY_CLIENT_ID`     |                         | Id of the Spotify application                                                                    |
| `SPOTIFY_CLIENT_SECRET` |                         | Spotify application access key                                                                   |

### Installation

In order to proceed with the rest of the project you first have to run:

```bash
yarn
```

### Running

To run the development server:

```bash
yarn dev
```

## TechStack

### NextJS

This project is using [NextJS](https://nextjs.org/). For more information on features
and such see their [documentation](https://nextjs.org/docs).

### Yarn

Install Yarn by following the instructions on their [website](https://yarnpkg.com/getting-started/install).

Since this project is using [Plug'n'Play](https://yarnpkg.com/features/pnp) an
editor SDK is required for TypeScript intellisense to work. For instruction on
how to do that see the [documentation](https://yarnpkg.com/getting-started/editor-sdks).

### Husky

This project also uses [husky](https://typicode.github.io/husky/#/) for pre-commit
linting and formating.

A quirk of how it's currently implemented is that it stages ALL files after
linting and formating, even if they were not staged to begin with.

The recommended way to solve this is by stashing the files you do not wish to commit
(`git stash -- <path/to/file>`) prior to commiting.

A not so recommended way to circumvent this is by commiting with the `--no-verify`
flag. This skips running the pre-commit script.

### Tailwind CSS

The project uses [Tailwind CSS](https://tailwindcss.com/) for styling. For more
information and documentation see the [documentation](https://tailwindcss.com/docs/).

Also make sure that you have the [recommended plugins](https://tailwindcss.com/docs/editor-setup)
installed.

### NextAuth

In order for users to make requests to the Spotify API they have to be authenticated.
This is done using [NextAuth](https://next-auth.js.org/).

More information and documentation can be found [here](https://next-auth.js.org/getting-started/introduction).
