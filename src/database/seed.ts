import { database } from "./"

async function populateModalities(){
    const modalities = await database.modality.createMany({
        data: [
            {
                id: 1,
                name: "BOLSA"
            },
            {
                id: 2,
                name: "VOLUNTÁRIO"
            }
        ]
    })
    return modalities
}

async function populateCategories(){
    const categories = await database.category.createMany({
        data: [
            {
                id: 1,
                name: "OUTROS",
            },
            {
                id: 2,
                name: "PIBIT",
            },
            {
                id: 3,
                name: "PIVIC",
            },
            {
                id: 4,
                name: "PIBIC",
            },
            {
                id: 5,
                name: "PIVITI",
            },
            {
                id: 6,
                name: "MONOGRAFIA",
            }
        ]
    })
    return categories
}

async function main() {
    await populateModalities()
    await populateCategories()
}

main()
.then(async () => {
    await database.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await database.$disconnect()
    process.exit(1)
})