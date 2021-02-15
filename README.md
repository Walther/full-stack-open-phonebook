# full-stack-open-phonebook

## Frontend

`frontend/` contains the frontend. In that directory, run `yarn server` and `yarn start` to start a local development version.

## Backend

This root directory contains the backend. Start local dev with `yarn run dev`.

Note that the backend server soft-depends on `frontend/build` to exist with a built frontend. That directory is served as static files.

## Production Deployment

For a production deployment, `yarn deploy`. The frontend and backend should get built properly.

This project is served at <http://fullstack-phonebook-walther.herokuapp.com/>
