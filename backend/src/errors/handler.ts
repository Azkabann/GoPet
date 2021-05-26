import {ErrorRequestHandler} from 'express';
import {ValidationError} from 'yup';


interface ValidationErrors{
  [key:string]:string[] //Aqui a chave é uma string e o valor é um array de string
};

const errorHandler:ErrorRequestHandler = (error, request, response, next)=>{
  
  if(error instanceof ValidationError){

    let errors:ValidationErrors={};

    error.inner.forEach(err => {
      errors[err.path]= err.errors; //atenção para nao ter algum problema de versão com o path 
      
    })

    return response.status(400).json({message:'Validation fails', errors});

  }

  console.error(error);
  return response.status(500).json({message:'Internal server error'})
};

export default errorHandler; 

