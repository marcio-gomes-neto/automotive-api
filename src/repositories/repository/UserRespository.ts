import { EntityRepository, Repository, createConnection } from "typeorm";
import { IUser } from "../intefaces/user/IUser";
import { user } from "../entities/User";
import { IUserRepository } from "../intefaces/user/IUserRepository";

@EntityRepository(user)
export class UserRepository extends Repository<user> implements IUserRepository{

    findAll(){
      return this.createQueryBuilder("user")
        .getManyAndCount();
    }

    findById(id: number){
      return this.createQueryBuilder("user")
      .where("user.id = :id", { id: id })
      .getOne();
    }

    findByName(name: string) {
    return this.createQueryBuilder("user")
      .where("user.name = :name", { name: name })
      .getMany();
    }

    findByCpf(cpf: string){
      return this.createQueryBuilder("user")
      .where("user.cpf = :cpf", { cpf: cpf })
      .getOne();
    }

    saveUser(userData: IUser){
      return this.createQueryBuilder("user")
      .insert()
      .into(user)
      .values(userData)
      .execute();
    }

    addOneClaim(id: number, claims: number){
      return this.createQueryBuilder("user")
      .update()
      .set({ claims: claims })
      .where("id = :id", { id: id })
      .execute();
    }
}