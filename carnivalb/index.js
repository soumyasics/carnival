const express=require('express')
const bodyParser=require('body-parser')
const db=require('./database')
const app=express()
const cors=require('cors')
const route=require('./routes')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/upload`));

app.use(cors())

app.use("/carnival_api",route )



app.listen(4014,function(){
    console.log("worked")
})


