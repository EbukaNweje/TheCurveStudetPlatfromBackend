const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config({ path: "./config/index.env" });

const Db = process.env.DATABASE

mongoose.connect(Db, {
/*     useNewUrlParser: true,
    useUnifiedTopology: true */
}).then(()=>{
    console.log("MongoDB Connected!")
})

const app = require("./index")

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Conneted")
})