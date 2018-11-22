const express = require('express');

// Initiliazations 
const app = express();  

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares

// Global Variables

// Routes

// Static Files

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on por', app.get('port'));
});