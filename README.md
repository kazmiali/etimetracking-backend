# ETimeTracking Backend - ExpressJS App w/ Firebase & Stripe.

- Its a server for a timetracking web app like Clockify.com and it has Stripe payment implementation with basic NodeJS Express server.

## Installation & Initial Setup

Please install [Git](https://git-scm.com/downloads) & [NodeJS](https://nodejs.org/en/download/) in your machine. Once done, open your terminal/command prompt & make sure you are at the root of this project. Then run the commands below:

### Clone the repo

```bash
git clone https://github.com/kazmiali/etimetracking-backend.git etimetracking-backend  # clone the repository

cd etimetracking-backend  # navigate to project folder
```

### Install dependencies

```bash
npm/yarn install # install nodejs server dependencies

cd client # cd into the client folder
npm/yarn install # install react app dependencies

cd .. # go back to project's root
```

## Note for firebase

In order to do use firebase with this project, get the serviceAccountInfo.json file from your firebase project and add it to the directory.

## Note for stripe payments

In order to do stripe payments, create a account on stripe and copy the api key from there and add it to a .env file like this

```bash
STRIPE_SECRET_KEY=yourkey
```


## Running NodeJS server

```bash
npm/yarn run server
```

## Live URL

https://etimetracking-backend.up.railway.app/check
