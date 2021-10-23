import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { IOutsource } from '../intefaces/outsource/IOutsource'

@Entity()
export class outsource implements IOutsource {
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

    @Column({ type: "boolean", nullable: false})
    user: boolean

    @Column({ type: "integer", nullable: false})
    claims: number
}