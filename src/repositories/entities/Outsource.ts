import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class Outsource {
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
}