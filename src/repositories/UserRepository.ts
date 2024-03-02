import { database } from "../database"

export class UserRepository {
    public async findById(id: number){
        const user = await database.user.findFirst({
            where: {
                id: id
            },
            select: {
                name: true,
                email: true,
                phone: true,
                bond: true,
                courseId: true
            }
        })
        return user
    }
} 