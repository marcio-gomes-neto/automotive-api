import { EntityRepository, Repository } from "typeorm";
import { claims } from "../entities/Claims";
import { IClaims } from "../intefaces/claims/IClaims";
import { IClaimsRepository } from "../intefaces/claims/IClaimsRepository";

@EntityRepository(claims)
export class ClaimsRepository extends Repository<claims> implements IClaimsRepository{

    findAll(){
        return this.createQueryBuilder("claims")
          .getManyAndCount();
      }

    findClaimsFromUser(cpf: string) {
        return this.createQueryBuilder("claims")
          .where("claims.cpf_user = :cpf", { cpf: cpf })
          .getManyAndCount();
    }

    findClaimsFromOutsource(cpf: string) {
        return this.createQueryBuilder("claims")
          .where("claims.cpf_outsource = :cpf", { cpf: cpf })
          .getManyAndCount();
    }

    findById(id: number){
        return this.createQueryBuilder("claims")
        .where("claims.id = :id", { id: id })
        .getOne();
    }  

    findByType(type: string){
        return this.createQueryBuilder("claims")
        .where ("claims.type = :type", {type: type})
        .getManyAndCount()
    }

    findByVehicle(vehicle: string){
      return this.createQueryBuilder("claims")
      .where ("claims.vehicle = :vehicle", {vehicle: vehicle})
      .getManyAndCount()
  }

    saveClaim(data: IClaims){
        return this.createQueryBuilder("claims")
        .insert()
        .into(claims)
        .values(data)
        .execute();
      }
}