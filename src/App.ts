const express = require('express')
const app = express()


app.use(express.json())



app.get('/', async function(req, res){
  try{
    res.send("Hello World")
    console.log("test complete")
  }catch(e){
    console.log(e)
  }
  
})

app.post('/', async(req, res) => {
  try{
    console.log(req.body)
  }catch(e){
    console.log(e)
  }
  
})


app.listen(3000, () => {
  console.log("Server On!")
})