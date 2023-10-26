import { database } from "./"

async function main() {
    const categories = await database.category.createMany({
        data: [
            {
                id: 1,
                name: "PIBIC",
                color: "#2F9E41"
            },
            {
                id: 2,
                name: "PIBIT",
                color: "#00A3FF"
            },
            {
                id: 3,
                name: "PIVIC",
                color: "#FF7A00"
            },
            {
                id: 4,
                name: "MONOGRAFIA",
                color: "#AD00FF"
            },
            {
                id: 5,
                name: "OUTRO",
                color: "#909090"
            },
        ]
    })
    console.log('Seeded', categories)
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