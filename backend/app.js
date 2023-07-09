const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes');
const handleError = require('./middlewares/handleError');


const app = express();
app.use(cors({
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
  ],
  credentials: true,
  maxAge: 30,
}));
const { PORT = 3000 } = process.env;
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
//   useNewUrlParser: true,
// });

app.use(router);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
