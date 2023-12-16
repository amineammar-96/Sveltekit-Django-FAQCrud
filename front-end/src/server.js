const sirv = require('sirv');
const polka = require('polka');
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
  .use(
    sirv('public', { dev }),
    (req, res, next) => {
      if (dev || req.originalUrl.startsWith('/api')) return next();
      res.end(fs.readFileSync('public/index.html'));
    }
  )
  .listen(PORT, err => {
    if (err) console.error(err);
    console.log(`> Running on localhost:${PORT}`);
  });
