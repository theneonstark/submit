const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/connection')
  .then(() => console.log('Database connection successful'))
  .catch(err => console.error('Database connection error:', err));


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
});

const User = mongoose.model('user', UserSchema);
UserSchema.clearIndexes();

const express = require('express');
const app = express();
const cors = require('cors');
console.log('I am on port 9000');
app.use(express.json());
app.use(cors());
app.get('/',(req, resp)=>{
    resp.send('Finally working');
});

app.post("/submit", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("user already registered");
        }
    } catch (e) {
        console.error("Error saving user:", e);
    }
});


app.listen(9000);