import {Entity, Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn} from 'typeorm';
import Kennels from './kennels'

@Entity('Images')
export default class Images{

  @PrimaryGeneratedColumn('increment')
  id:number;

  @Column()
  path:string;

  @ManyToOne(()=>Kennels,kennel=>kennel.images)
  @JoinColumn({name:'kennel_id'})
  kennels:Kennels;
}