import {Entity,Column, PrimaryGeneratedColumn ,CreateDateColumn , UpdateDateColumn} from 'typeorm'

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column()
  userName:string;

  @Column({unique:true})
  email:string;
  
  @Column()
  password:string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}