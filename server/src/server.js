const express=require('express');

const app=express();

app.get('/',(req,res)=>{
    res.send(' backend is running');
})


const PORT=5000;
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})