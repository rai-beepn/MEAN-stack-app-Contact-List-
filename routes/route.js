const express = require('express');
const router = express.Router();

//const Contact = require('../models/contacts');

//for local host retrieving not needed this for mlab db use
 var mongojs = require('mongojs');
 var db= mongojs('mongodb://bipinrai:Password4059@ds127126.mlab.com:27126/contact',['contact'])


// //retrieving contacts local hosts..
// router.get('/contacts',(req, res, next)=>{
//    // res.send('Retrieving Contact list');
//    Contact.find(function(err,contacts){
//        res.json(contacts);
//    })
// });

// //retrieving by id
// router.get('/:id', function(req, res, next){
//      Contact.findOne({
//         _id:mongojs.ObjectId(req.params.id)
//       },function(err, todo){
//         if(err){
//          res.send(err);
//        }else{
//          res.json(todo);
//       }
//      });
//     });


// //add contact
// router.post('/contact',(req, res, next)=>{
//     let newContact = new Contact({
//         first_name : req.body.first_name,
//         last_name : req.body.last_name,
//         phone: req.body.phone
//     });
//     newContact.save((err, contact)=>{
//         if (err)
//         {
//            res.json({msg : 'failed to add contact'});
//         }
//         else{
//             res.json({msg : 'contact added'});
//         }
//     });
// });


// router.delete('/:id',function(req, res, next){
//     Contact.findByIdAndRemove(req.params.id,req.body,function(err,post){
//         if (err) return next(err);
//         res.json(post)
//     });
// });



 //for cloud
router.get('/contacts', function(req, res, next){
    db.contact.find(function(err, contact){
     if(err)
     {
       res.send(err);
     }
     else
     {
       res.json(contact);
     }
   });
 });

 //get by id
 router.get('/contacts/:id', function(req, res, next){
    db.contact.findOne({
      _id:mongojs.ObjectId(req.params.id)
    },function(err, contact){
      if(err)
      {
        res.send(err);
  
      }
      else
      {
        res.json(contact);
      }
    });
  });
  
 

//post method 
  router.post('/contacts', function(req, res, next){

    var newContact = req.body;
    //console.log(req.body.phone);
     
    if(req.body.phone == null){
      res.status(404);
      res.json({
        "error":"invalid Data"
      });
    }
    else
    {
      db.contact.save(newContact, function(err, contact){
        if(err)
        {
          res.send(err);
  
        }
        else
        {
          res.json(contact);
         
        }
      });
    }
  });
  

  //post new
  //router.post('/contacts', function(req, res) {
    //   var newContact = req.body;
    //   //newContact.createDate = new Date();
    
    //   if (!req.body.phone) {
    //     handleError(res, "Invalid user input", "Must provide a phone.", 400);
    //   }
    
    //   db.contact.insertOne(newContact, function(err,contact) {
    //     if (err) {
    //       handleError(res, err.message, "Failed to create new contact.");
    //     } 
    //     else 
    //     {
    //      // res.status(201).json(contact.ops[0]);
    //      res.json(contact)
    //     }
    //   });
    // });
  


  //update 
  // router.put('/contacts/:id', function(req, res, next){
  //   var todo = req.body;
  //   var updObj = {};
  //   if(todo.isCompleted){
  //     updObj.isCompleted = todo.isCompleted;
  //   }
  //   if(todo.text){
  //     updObj.text = todo.text;
  //   }
  
  //   if(!updObj){
  //     res.status(404);
  //     res.json({
  //       "error":"invalid Data"
  //     });
  //   }else{
  //     db.contact.update({
  //     _id: mongojs.ObjectId(req.params.id)
  
  //   }, updObj,{},function(err, result){
  //     if(err){
  //       res.send(err);
  //     }else{
  //       res.json(result);
  //     }
  //   });
  //   }
  // });
  
  
  // Delete 
  router.delete('/contacts/:id', function(req, res, next){
    // console.log(req.params.id);
    
      db.contact.remove({
          _id: mongojs.ObjectId(req.params.id)
      }, '', function(err, result){
          if(err){
              res.send(err);
          } else {
              res.json(result);
          
              
          }
      });
  });

 //Update Contact
 router.put('/contacts/:id', function(req, res, next){
  //console.log('Update a contact');
  db.contact.update({
    _id: mongojs.ObjectId(req.params.id)},
  {
      $set: {first_name: req.body.first_name, last_name: req.body.last_name, phone: req.body.phone}
  },
  {
      new: true
  },
  function(err, result){
      if(err){
          res.send("Error updating contact");
      }else{
          res.json(result);
      }
  }
  )
});

  

module.exports = router;