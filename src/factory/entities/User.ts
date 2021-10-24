import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { IUser } from '../intefaces/user/IUser'

@Entity()
export class user implements IUser {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({ type: "varchar", length: 255, nullable: false})
    name: string

    @Column({ type: "varchar", length: 11, unique: true, nullable: false })
    cpf: string

    @Column({ type: "varchar", length: 10, unique: true, nullable: false })
    cnh: string

    @Column({ type: "varchar", length: 255, nullable: false})
    email: string

    @Column({ type: "varchar", length: 255, nullable: false})
    phone: string

    @Column({ type: "varchar", length: 255, nullable: true})
    gender: string

    @Column({ type: "varchar", length: 255, nullable: true})
    address: string

    @Column({ type: "varchar", length: 255, nullable: true})
    city: string

    @Column({ type: "integer"})
    claims: number

    @Column({ type: "varchar", length: 255, nullable: false})
    age: string

    @Column({ type: "boolean", nullable: false})
    active: boolean

    @Column({ type: "boolean", nullable: false})
    outsource: boolean
  }
  