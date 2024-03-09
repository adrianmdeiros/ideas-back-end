import { database } from "../database";
import { Servant } from "../types/Servant";

export class ServantRepository {
    async save(servant: Servant){
        const savedServant = await database.servant.create({
            data: {
                user: {
                    create: {
                        id: servant.id,
                        name: servant.name,
                        email: servant.email,
                        phone: servant.phone, 
                        bond: "Servant"
                    }
                },
                department: {
                    connectOrCreate: {
                        where: {
                            name: servant.department
                        },
                        create: {
                            name: servant.department
                        }
                    }
                }
            }
        })
        return savedServant
    }

    async findById(id: number){
        const servant = await database.servant.findFirst({
            where: {
                servantId: id
            }
        })
        return servant
    }

    
}