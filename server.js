const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database

connectDB();

// init middleware that we can extract data from ( req.body; )

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use('*', (req, res) =>
		res.sendFile(path.join(__dirname + '/client/build/index.html'))
	);
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`server started at port ${port}`);
});
