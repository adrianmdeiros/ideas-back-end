import { database } from "../database";

export class ModalityRepository{
    async findAll(){
        const allModalities = await database.modality.findMany()
        return allModalities
    }
}