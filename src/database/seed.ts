import { database } from "./"

async function main() {
    const categories = await database.category.createMany({
        data: [
            {
                id: 1,
                name: "OUTROS",
                color: "#909090"
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
                name: "PIBIC",
                color: "#2F9E41"
            },
            {
                id: 5,
                name: "PIVITI",
                color: '#F5D100'
            },
            {
                id: 6,
                name: "MONOGRAFIA",
                color: "#AD00FF"
            }
        ]
    })
    return categories
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