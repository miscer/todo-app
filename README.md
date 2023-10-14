# Toodles

## Technologies used

- Next.js as a framework, although its SSR capabilities are not used here at all. But it's nice to have all the asset compilation, routing, and stuff like that sorted out from the start.
- Tailwind for UI - for prototypes like this it's great.
- TanStack Query for fetching data from the API. I used SWR at first, but it was giving me problems with optimistic updates, for example. Changing to TanStack Query was easy, thanks to the fact that everything was nicely hidden in the hooks.
- react-hook-form and zod for forms and validation.
- day.js for working with dates.
- lodash for some useful features.

## Notable features

Instead of a real API server, I used [msw](https://mswjs.io/), which uses Service Worker to catch requests from the application and respond to them. This way the demo app works offline, and the mock API server can also be used to test the app. Each request has an artificial delay of 300 ms to see the loading states in the application. The mock API server is started automatically when the application starts in the browser.

## Possible improvements

- Adding todo lists and items could have a better managed loading state. Optimistic inserts would be ideal, where a new list or item would be displayed immediately, without waiting for the server.
- Deadline of items is done via native datetime input, which is not supported in all browsers, and doesn't exactly have the best UX. It would be better to make a customized input.
- Items can't be moved within a list, or between lists. There is support in the API for this (each item has a list ID and weight attributes).
- Mock API doesn't store data in local storage, so when the application is reopened, everything is deleted, and everything has a new ID.
- If I used GraphQL and [urql](https://formidable.com/open-source/urql/), I wouldn't have to deal with manually invalidating queries after mutations. I would also be able to generate request and response types from the GraphQL schema using [GraphQL code generator](https://the-guild.dev/graphql/codegen).
