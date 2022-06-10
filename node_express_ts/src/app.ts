import express,{Request,Response,NextFunction} from 'express';
import {json} from 'body-parser';
import  todoRouter  from './routes/todos';
const app = express();
app.use(json());
app.use('/todos', todoRouter);
app.use((error :Error,req : Request,res : Response,next : NextFunction)=>{
    res.json({message:error.message});
});
app.listen(3000, () => {

});