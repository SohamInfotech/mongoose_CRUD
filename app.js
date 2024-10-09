const express =require('express')
const app=express()
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const friend=require('./modal/Friends')

mongoose.connect('mongodb://localhost:27017/kubavat-exam2')
.then((res)=>{
    console.log("sucsess");
})
.catch((err)=>{
console.log(err);
})
app.set('view engine','ejs')
app.use(bodyparser.urlencoded({extended:true}))
app.get('/',async(req,res)=>{
    const allData=await friend.find()
    res.render('index',{allData,update:null})

})
app.post('/createdata',async(req,res)=>{
    console.log(req.body);
    const data =req.body
    if(data.id !== "")
    {
       await friend.findByIdAndUpdate(data.id,data)
    }
    else{
        await friend.create(data)
    }
    res.redirect('/') 
})
app.get('/deleteData',async(req,res)=>{
    const deleteId = req.query.delete;
    console.log(deleteId);
   await friend.findByIdAndDelete(deleteId)
    res.redirect('/');  
})
app.get('/updateData',async(req,res)=>{
    const updateId = req.query.updatei;
    console.log(updateId);
    const update=await friend.findByIdAndUpdate(updateId)
    const allData=await friend.find()
    res.render('index',{allData,update})
})
app.listen(4000)