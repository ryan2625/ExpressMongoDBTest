const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

app.use(express.json())

//routes

app.get('/', (req, res) => {
    res.send('Hello WorldStill working');
})

app.get("/blog", (req, res) => {
    res.send("Blog page!!");
})

app.get("/products", async (req, res) => {
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    }catch (error){
        res.status(500).json({message : error.message})
    }
})

app.get("/products/:id", async (req, res) => {
    try{    
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

    app.put("/products/:id", async (req, res) => {
        try{
                const {id} = req.params;
                const product =  await Product.findByIdAndUpdate(id, req.body)
                if (!product){
                    return res.status(404).json({message : "Product not found"})
                }
                const updatedProduct = await Product.findById(id)
                res.status(200).json(updatedProduct)
        }catch (error){
            res.status(500).json({message  : error.message})
        }
})


app.post("/products", async (req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch (error){
        console.log(error)
        res.status(500).json({message : error.message})
    }
})


mongoose.connect("mongodb+srv://admin:zRuz1lrrPEYpgMbt@cluster0.hwumnog.mongodb.net/?retryWrites=true&w=majority")
.then(() =>{
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
     console.log('MongoDB connected...')})
     .catch(err => {console.log(err)})