const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models/model.js');
const keys = require('./keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const query = `SELECT * FROM applicants WHERE id = $1`;
  const value = [id];
  try {
    const data = await db.query(query, value);
    const user = data.rows[0];
    console.log('user found===>', user);
    done(null, user);
  } catch (err) {
    console.log('error finding id===>', err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      // clientID: process.env.googleclientID,
      // clientSecret: process.env.googleclientSecret,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
    },

    function (accessToken, refreshToken, profile, done) {
      console.log('profile==>', profile);
      const qText = `SELECT * FROM applicants WHERE email = $1`;
      const email = [profile._json.email];
      console.log('email', email);

      db.query(qText, email, (err, data) => {
        if (data.rows.length === 0) {
          const {
            given_name,
            family_name,
            email,
            sub,
            picture,
          } = profile._json;
          const queryText = `INSERT INTO applicants (first_name, last_name, email, password, avatar) VALUES ($1, $2, $3, $4,$5) RETURNING *`;
          const value = [given_name, family_name, email, sub, picture];
          db.query(queryText, value, (err, data) => {
            if (err) {
              console.log('errCreatingUser==>', err);
            }
            console.log('userCreated===>', data.rows[0]);
            const newUser = data.rows[0];
            done(null, newUser);
          });
        }
        console.log('userAlreadyExists==>', data.rows[0]);
        const currentUser = data.rows[0];

        done(null, currentUser);
      });
    }
  )
);
