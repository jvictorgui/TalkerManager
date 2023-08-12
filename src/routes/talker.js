talkerRouter = require ('express').Router();
const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '..', 'talker.json');

const readFile = async () => {
    const talkerData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(talkerData);
  };


talkerRouter.get('/', async (req, res) => {
     
        try{
            talkerData = await readFile();
         if (!talkerData){
            return res.status(200).send([]);
         } 
            res.status(200).send(talkerData);
        } catch (err){
            res.status(400).send({message: err.message})
        }
    })





module.exports = talkerRouter;