//main back-end server file
//importing modules

var express  = require('express');
//var mongoose = require('mongoose'); //Mongoose allows us to have access to the MongoDB commands for CRUD simply and easily
var bodyParser = require('body-parser');
var cors = require('cors');

// var index = require('./routes/index');
// var tasks = require('./routes/task');

var path = require('path');


const port = 3000;

var app = express(); //assigning express to app
const route = require('./routes/route');

//NOTE: DB connection mongojs ho and chaine sabai connectionstring provide gareko route.js file ma xa

////connect to mongoDB (for local host)
//mongoose.connect('mongodb://localhost:27017/contactlist');
//mongoose.connect('mongodb://bipinrai:Password4059@ds127126.mlab.com:27126/contact',['contact']) //for cloud db

//connect to mongoDB for cloud using mongojs node's default driver
//  var mongojs = require('mongojs');
//  var db= mongojs('mongodb://bipinrai:Password4059@ds127126.mlab.com:27126/contact',['contact'])


//on connection (local host)
// mongoose.connection.on('connected',()=>{
// console.log('Connected to database mongodb @ 27017');
// });

//if connection error
// mongoose.connection.on('error',(err)=>{
//     if(err)
//     {
//        console.log('Error in Database connection'+err);
//     }
   
//     });

//adding middleware
app.use(cors());

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//flashing messages


//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes to route folder's route.js file
app.use('/api', route);

//update from chini
// $scope.update = function() {
//     console.log($scope.contact._id);
//     $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
//       refresh();
//     })
//   };


//testing server root page
app.get('/Home', (req, res,)=>{
    res.send('Welcome Root Page');

})

//view Engine

app.listen(port,function(){
    console.log('Server started on port' +port);

})

