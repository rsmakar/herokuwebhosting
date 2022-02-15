const express =require('express');
const path=require('path');
const pug = require('pug');
const app=express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const port=8000;
app.use("/static", express.static('static'));
app.use(express.urlencoded());
app.set('view engine','pug');
app.set('views', path.join(__dirname,'views'));
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const contactSchema = new mongoose.Schema({
   name: String,
   address: String,
   number: String,
   email: String
 });
 

 var contact = mongoose.model('contact',contactSchema);

app.get("/",(req,res)=>{
        res.render('home.pug');
     });
app.get("/contact",(req,res)=>{
        res.render('contact.pug');
     });
app.post("/contact",(req,res)=>{
   var myData = new contact(req.body);
   myData.save().then(()=>{
      res.send("items has been saved to the database ")
   }).catch(()=>{
      res.status(400).send("item was not saved to the database")
   })
        
     });
     app.listen(port,()=>{
            console.log(`the application started successfully on port ${port}`);
         }); 