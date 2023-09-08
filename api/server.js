// Initialize express app
import express from 'express'
import bodyParser from 'body-parser';

import {find,findById,insert, update,remove} from './users/model.js'

const app= express()
app.use(express.json());
app.use(bodyParser.json());

// GET ALL USERS

app.get('/api/users', async(req, res) => {
    const allUser=await find();
    res.json(allUser);
})

// GET USER BY ID 
app.get('/api/users/:id', async(req, res) =>{
    const user=await findById(req.params.id);
    if (user) {
        res.json(user);
    }else{
        res.status(404).json({message:"User not found"});
    }

})

// CREATE A NEW USER
 app.post('/api/users',async (req, res) => {
    const newUser=await insert(req.body);
   
    if (newUser){
    res.json(newUser);
    }
    else{
        res.status(400).json({message:"user was not added"
    })
}

 })


// UPDATE A USER

app.put('/api/users/update/:id', async (req,res)=>{
    const updateUser=await update(req.params.id,req.body);
    if(updateUser){
        res.json(updateUser);
    }else{
        res.status(400).json({status:400,message:'student was not updated'})
    }


})
// DELETE A USER
app.delete('/api/users/remove/:id',async (req,res)=>{
    const deleteUser =await delete(req.params.id);
    if(deleteUser){
        res.json(deleteUser);
    }else{
        res.status(400).json({status:400,message:"user was not deleted"})

    }
})
// export default app
export default app;
