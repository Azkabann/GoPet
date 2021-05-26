import {getRepository} from 'typeorm';
import Kennels from '../models/kennels';
import {Request, Response} from 'express';
import kennelsViews from '../views/kennelsViews';
import * as Yup from 'yup';

export default {
  async index(request:Request, response:Response){

    const kennelsRepository=getRepository(Kennels);

    const kennels =  await kennelsRepository.find();

    return response.json(kennelsViews.renderMany(kennels));
  },


  async Show(request:Request, response:Response){

    const{id}=request.params;

    const kennelsRepository=getRepository(Kennels);
    
    const kennel= await kennelsRepository.findOneOrFail(id);
    
    return response.json(kennelsViews.render(kennel));
  },


  async create(request:Request, response:Response){

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
  
    const kennelsRepository= getRepository(Kennels);

    const requestImages= request.files as Express.Multer.File[]; //força o 'request.file' a ser um array de arquivos :)

    const images= requestImages.map(image=>{
      return {path:image.filename}
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    };

    const schema= Yup.object().shape({
      name:Yup.string().required(),
      latitude:Yup.number().required(),
      longitude:Yup.number().required(),
      about:Yup.string().required().max(350),
      instructions:Yup.string().required(),
      opening_hours:Yup.string().required(),
      open_on_weekends:Yup.boolean().required(),
      images:Yup.array(Yup.object().shape({

        path:Yup.string().required(),
  
      }))

    });

    schema.validate(data,{
      abortEarly:false
    });



    const kennel= kennelsRepository.create();
  
    await kennelsRepository.save(kennel)
  
    return response.status(201).json(kennel);
    
  },

 
  
};  