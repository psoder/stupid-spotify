# Stupid Spotify

The idea behind Stupid Spotify is to create an interface that generats playlists
based on stupid criteria, for instance, creating a playlist based on which date
the song was released, the birthdate of an artist, or any other interesting aspect
of the metadata that doesn’t have any correlation to song coherence. It should be
a way of discovering new music in ways that are not supposed to be. We will implement
different filters to enable the user’s journey to new music, and finally, save the
song you found to your own Spotify playlist.

This is the final project for the course [DH2642 Interaction Programming and theDynamic Web](https://www.kth.se/student/kurser/kurs/DH2642?l=en)
given at KTH during the spring of 2023.

## Getting started

### Running

To run the development server:

```bash
yarn dev
```

### Environment variables

To get the application working correctly make a copy of [`.env.example`](./.env.example)
called `.env` and fill out the fields.

| Variable                | Default                 | Purpose                                                                                          |
| ----------------------- | ----------------------- | ------------------------------------------------------------------------------------------------ |
| `NEXTAUTH_URL`          | `http://localhost:3000` | URL of the host                                                                                  |
| `NEXTAUTH_SECRET`       |                         | See the NextAuth [documentation](https://next-auth.js.org/configuration/options#nextauth_secret) |
| `SPOTIFY_CLIENT_ID`     |                         | Id of the Spotify application                                                                    |
| `SPOTIFY_CLIENT_SECRET` |                         | Spotify application access key                                                                   |

### Spotify

In order to access Spotify's API you need to create an application in their
[developer dashboard](https://developer.spotify.com/dashboard). After having
created the app you get access to the client id and client secret that
you can use to access the Spotify API. Put these in the `.env` and don't share them!

You also need to add users that are allowedto sign in to the application. This
can be done in the user management tab. Use the email that's linked to the persons
Spotify account.

### Authentication

In order to be able to authenticate need to add a callback URI under `Redirect URIs`
on the Spotify dashboard.

The URI should be on the format `<protocol>://<hostname>:<port>/api/auth/callback/spotify`
(_note:_ the port is optional).

For local development the URI would be `http://localhost:3000/api/auth/callback/spotify`.

### Deploying

The recommended way to deploy is on [Vercel](https://vercel.com/solutions/nextjs).
For more information on how to deploy see <https://nextjs.org/docs/deployment>.

Make sure to add the correct redirect URI to the Spotify dashboard (see [above](#authentication)).

_Note:_ When deploying on Vercel `NEXTAUTH_URL` can be omitted.

## Stack

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

## Structure

The structure of the `src/` directory can be broken down like this:

```
src
├── components
├── hooks
├── modules
├── pages
│   └── api
├── styles
├── types
└── util
```

-   `components/` contains the different components that's used in the application.
-   `hooks/` contains hooks used in components.
-   `modules/` contains modules. Modules are larger components.
-   `pages/` contains the different pages. Since NextJS uses directory based routing the different files create different pages.
-   `pages/api/` contains is the applications api and all routes are files in this folder.
-   `styles/` contains global styling.
-   `types/` contains our custom types
-   `util/` contains utility functions

<img src="docs/component-explanation.png" height="300px" />

Some other interesting files and folders are:

-   `public/`: icons and public assets
-   `docs/`: documentation
-   `.husky`: commit hooks
-   `.yarn\*`, `.pnp*`: dependency management
-   `.eslint*`, `.prettier*`: code linting and formating
-   `.editorconfig`, `.vscode/`, `.idea/`: editor configuration

Other files under the root:

-   `.env.example`: environment variables
-   `next.config.js`: NextJS configuration
-   `tsconfig.json`: typescript configuration
-   `tailwind.config.js`, `postcss.config.js`: Tailwind configuration.

## Project Status

### Current status

This far we've implemented,

-   sign in with Spotify account
-   proof of concept Spotify API querying
-   music playback

We've also designed a mockup which can be found [here](https://www.figma.com/file/anULqp2wd40BEJHPuRkjJq/stupid-spotify?node-id=0%3A1&t=4sbfSEoTeGaGTbdX-1).

### Future plans

In the future we plan to

-   add more search and filter options
-   add functionality to save songs to your own Spotify playlist
-   improve the layout and looking with color and style
