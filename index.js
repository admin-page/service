const express = require('express');
const app = express();

const {db, PORT} = require('./config')

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req,res) =>{
    res.send('asd')
})



app.use('/house', require('./routes/house'))

if(db){
    app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`)
    })
}
