# SkyBeat Clothing - React App w/ Redux, Firebase & Stripe.

- Its a E-Commerce clothing store, created with React, react-router, redux, redux-saga, Firebase, and Stripe with basic NodeJS Express server.

## Features

- Used React Hooks.
- Used Redux with redux-saga for asynchronous code.
- Stripe payments with backend server for making request to stripe API.
- Clean and scalable code.
- Best practices involved.
- Performance optimazations made where required.

## Installation & Initial Setup

Please install [Git](https://git-scm.com/downloads) & [NodeJS](https://nodejs.org/en/download/) in your machine. Once done, open your terminal/command prompt & make sure you are at the root of this project. Then run the commands below:

### Clone the repo

```bash
git clone https://github.com/kazmiali/skybeat-clothing.git skybeat-clothing  # clone the repository

cd skybeat-clothing  # navigate to project folder
```

### Install dependencies

```bash
npm/yarn install # install nodejs server dependencies

cd client # cd into the client folder
npm/yarn install # install react app dependencies

cd .. # go back to project's root
```

## Note for stripe payments

In order to do stripe payments, create a account on stripe and copy the api key from there and add it to a .env file like this

```bash
STRIPE_SECRET_KEY=yourkey
```

## Running Nodejs server and React app together

Make sure you're at the project's root

```bash
npm/yarn run dev

# starts both the client (React) and server (NestJS) apps in watch mode
# the react app runs at port 3000 while the nestjs server runs at 5000
```

## Running NodeJS server only

```bash
npm/yarn run start
```

## Running React app only

```bash
cd client
npm/yarn run start
```
