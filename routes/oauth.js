const passport = require('../config/passport');
const router = require('express').Router();

// testing
// router.get('/', (req, res) => {
//   res.send('<a href="auth/google">Authenticate with Google</a>');
// });

// Google login route
router.get('/auth/google', (req, res) => {
  const googleAuthUrl = 'https://accounts.google.com/o/oauth2/auth';
  // const googleAuthUrl = 'http://localhost:5001/google/callback';

  const params = new URLSearchParams({
    response_type: 'code',
    redirect_uri: 'http://localhost:5001/google/callback',
    scope: 'profile email',
    client_id: process.env.CLIENT_ID,
  });

  const authUrl = `${googleAuthUrl}?${params}`;

  res.send({ authUrl });
});

// Google callback route
router.get(
  '/auth/google/home',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: 'https://api-gatot-sprinter.niceblue.my.id/login',
  }),
  (req, res) => {
    const userId = req.user.id; // Assuming the user object is available in req.user
    console.log(userId);
    // Redirect to the home page with the userId as a query parameter
    // res.redirect(`https://challenge-9-gs.netlify.app/home?userId=${userId}`);
    // res.redirect(`/protected`);
  }
);

router.get('/protected', (req, res) => {
  res.send('Welcome !');
});

module.exports = router;
