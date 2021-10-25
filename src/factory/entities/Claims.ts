import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { IClaims } from '../intefaces/claims/IClaims'

@Entity()
export class claims implements IClaims{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({ type: "varchar", length: 255, nullable: false})
    desc: string

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    type: string
    
    @Column({ type: "varchar", length: 255, nullable: false})
    vehicle: string

    @Column({ type: "varchar", length: 11, unique: true, nullable: false })
    cpf_user: string

    @Column({ type: "varchar", length: 11, nullable: true})
    cpf_outsource: string
}