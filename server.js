const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');
const admin = require('firebase-admin');
const ServiceAccount = require('./serviceAccountInfo.json');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
});

const firestore = admin.firestore();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.get('/service-worker.js', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '..', 'build', 'service-worker.js'),
  );
});

app.post('/payment', (req, res) => {
  // console.log('payment route called ', req);
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  };

  stripe.charges.create(body, async (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      const {
        userId,
        isOnTrial,
        hasPaid,
        paidAmount,
        employeesAllowed,
      } = req.body.currentUser;

      let currentUser = req.body.currentUser;

      const userRef = firestore.collection('users').doc(userId);

      let updatedCurrentUser = {};

      // user was on trial
      if (isOnTrial && !hasPaid) {
        updatedCurrentUser.isOnTrial = false;
        updatedCurrentUser.hasPaid = true;
        updatedCurrentUser.paidAmount = req.body.price;
        updatedCurrentUser.workspacesLimit = 15;
        updatedCurrentUser.employeesAllowed = req.body.employeesNum;
        updatedCurrentUser.trialEndsAt = new Date();

        currentUser.isOnTrial = false;
        currentUser.hasPaid = true;
        currentUser.paidAmount = req.body.price;
        currentUser.workspacesLimit = 15;
        currentUser.employeesAllowed = req.body.employeesNum;
        currentUser.trialEndsAt = new Date();
        // user has paid before
      } else if (!isOnTrial && hasPaid) {
        updatedCurrentUser.paidAmount =
          Number(paidAmount) + Number(req.body.price);
        updatedCurrentUser.workspacesLimit = 20;
        updatedCurrentUser.employeesAllowed =
          Number(employeesAllowed) + Number(req.body.employeesNum);

        currentUser.paidAmount =
          Number(paidAmount) + Number(req.body.price);
        currentUser.workspacesLimit = 20;
        currentUser.employeesAllowed =
          Number(employeesAllowed) + Number(req.body.employeesNum);

        // user trial has ended
      } else if (!isOnTrial && !hasPaid) {
        // @user when trial will also end if the user is invited by another user
        // will have to creata a popover of inivitation
        updatedCurrentUser.paidAmount = req.body.price;
        updatedCurrentUser.workspacesLimit = 15;
        updatedCurrentUser.employeesAllowed = req.body.employeesNum;

        currentUser.paidAmount = req.body.price;
        currentUser.workspacesLimit = 15;
        currentUser.employeesAllowed = req.body.employeesNum;
      }
      await userRef.update(updatedCurrentUser);
      res
        .status(200)
        .send({ success: stripeRes, userRes: currentUser });
    }
  });
});
