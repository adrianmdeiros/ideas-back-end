import { BondType } from "@prisma/client"
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

async function populateDepartments(){
    const departments = await database.department.createMany({
        data: [
            { id: 1, name: 'DCOMP-MTC' },
            { id: 2, name: 'DAB-MTC' },
            { id: 3, name: 'DCC-MTC' },
            { id: 4, name: 'DFIS-MTC' },
            { id: 5, name: 'DEMAT-MTC' },
            { id: 6, name: 'DAQ-MTC' },
            { id: 7, name: 'DMM-MTC' },
        ]
    });
    return departments;
}

async function populateUsers() {
    const users = await database.user.createMany({
        data: [
            // Professores do departamento DCOMP (id: 1)
            {
                id: 1,
                name: "Professor A",
                email: "professor.a@dcomp.edu",
                phone: "123456789",
                bond: BondType.Servant
            },
            {
                id: 2,
                name: "Professor B",
                email: "professor.b@dcomp.edu",
                phone: "987654321",
                bond: BondType.Servant
            },
            {
                id: 3,
                name: "Professor C",
                email: "professor.c@dcomp.edu",
                phone: "456123789",
                bond: BondType.Servant
            },
            {
                id: 4,
                name: "Professor D",
                email: "professor.d@dcomp.edu",
                phone: "321654987",
                bond: BondType.Servant
            },
            // Professores do departamento DAB (id: 2)
            {
                id: 5,
                name: "Professor E",
                email: "professor.e@dab.edu",
                phone: "111222333",
                bond: BondType.Servant
            },
            {
                id: 6,
                name: "Professor F",
                email: "professor.f@dab.edu",
                phone: "444555666",
                bond: BondType.Servant
            },
            // Professores do departamento DCC (id: 3)
            {
                id: 7,
                name: "Professor G",
                email: "professor.g@dcc.edu",
                phone: "777888999",
                bond: BondType.Servant
            },
            {
                id: 8,
                name: "Professor H",
                email: "professor.h@dcc.edu",
                phone: "000111222",
                bond: BondType.Servant
            },
            // Professores do departamento DFIS (id: 4)
            {
                id: 9,
                name: "Professor I",
                email: "professor.i@dfis.edu",
                phone: "333444555",
                bond: BondType.Servant
            },
            {
                id: 10,
                name: "Professor J",
                email: "professor.j@dfis.edu",
                phone: "666777888",
                bond: BondType.Servant
            },
            // Professores do departamento DEMAT (id: 5)
            {
                id: 11,
                name: "Professor K",
                email: "professor.k@demat.edu",
                phone: "999000111",
                bond: BondType.Servant
            },
            {
                id: 12,
                name: "Professor L",
                email: "professor.l@demat.edu",
                phone: "222333444",
                bond: BondType.Servant
            },
            // Professores do departamento DAQ (id: 6)
            {
                id: 13,
                name: "Professor M",
                email: "professor.m@daq.edu",
                phone: "555666777",
                bond: BondType.Servant
            },
            {
                id: 14,
                name: "Professor N",
                email: "professor.n@daq.edu",
                phone: "888999000",
                bond: BondType.Servant
            },
            // Professores do departamento DMM (id: 7)
            {
                id: 15,
                name: "Professor O",
                email: "professor.o@dmm.edu",
                phone: "123123123",
                bond: BondType.Servant
            },
            {
                id: 16,
                name: "Professor P",
                email: "professor.p@dmm.edu",
                phone: "456456456",
                bond: BondType.Servant
            }
        ]
    });
    return users;
}

async function populateServants(){
    const servants = await database.servant.createMany({
        data: [
            // Servidores para DCOMP (departamento id: 1)
            { servantId: 1, departmentId: 1 },
            { servantId: 2, departmentId: 1 },
            { servantId: 3, departmentId: 1 },
            { servantId: 4, departmentId: 1 },
            // Servidores para DAB (departamento id: 2)
            { servantId: 5, departmentId: 2 },
            { servantId: 6, departmentId: 2 },
            // Servidores para DCC (departamento id: 3)
            { servantId: 7, departmentId: 3 },
            { servantId: 8, departmentId: 3 },
            // Servidores para DFIS (departamento id: 4)
            { servantId: 9, departmentId: 4 },
            { servantId: 10, departmentId: 4 },
            // Servidores para DEMAT (departamento id: 5)
            { servantId: 11, departmentId: 5 },
            { servantId: 12, departmentId: 5 },
            // Servidores para DAQ (departamento id: 6)
            { servantId: 13, departmentId: 6 },
            { servantId: 14, departmentId: 6 },
            // Servidores para DMM (departamento id: 7)
            { servantId: 15, departmentId: 7 },
            { servantId: 16, departmentId: 7 }
        ]
    });
    return servants;
}

async function populateProjectIdeas(){
    const projectIdeas = await database.project.createMany({
        data: [
            // Projetos dos professores de DCOMP
            {
                title: "Sistema de Gestão Acadêmica",
                description: "Desenvolvimento de um sistema para auxiliar na gestão de cursos e disciplinas.",
                studentsRequired: 3,
                modalityId: 1, // BOLSA
                categoryId: 2, // PIBIT
                servantId: 1,
            },
            {
                title: "Aplicativo de Monitoramento Ambiental",
                description: "Desenvolver um app para monitoramento de condições ambientais em tempo real.",
                studentsRequired: 4,
                modalityId: 2, // VOLUNTÁRIO
                categoryId: 3, // PIVIC
                servantId: 2,
            },
            {
                title: "Plataforma de Educação à Distância",
                description: "Criação de uma plataforma para EAD com foco em acessibilidade e usabilidade.",
                studentsRequired: 2,
                modalityId: 1, // BOLSA
                categoryId: 5, // PIVITI
                servantId: 1,
            },
            {
                title: "Sistema de Gerenciamento de Biblioteca",
                description: "Projeto para automatização e digitalização do acervo de uma biblioteca acadêmica.",
                studentsRequired: 3,
                modalityId: 2, // VOLUNTÁRIO
                categoryId: 1, // OUTROS
                servantId: 3,
            },
            {
                title: "Aplicativo para Gestão de Eventos",
                description: "Desenvolver um app para cadastro e gerenciamento de eventos acadêmicos e científicos.",
                studentsRequired: 5,
                modalityId: 1, // BOLSA
                categoryId: 4, // PIBIC
                servantId: 2,
            },
            {
                title: "Sistema de Automação Residencial",
                description: "Desenvolvimento de um sistema para controlar dispositivos eletrônicos residenciais.",
                studentsRequired: 2,
                modalityId: 2, // VOLUNTÁRIO
                categoryId: 6, // MONOGRAFIA
                servantId: 4,
            },
            {
                title: "Plataforma de Doação de Sangue",
                description: "Criação de uma plataforma para conectar doadores de sangue com hospitais e centros de doação.",
                studentsRequired: 3,
                modalityId: 1, // BOLSA
                categoryId: 5, // PIVITI
                servantId: 3,
            },
            {
                title: "Ferramenta de Análise de Dados Públicos",
                description: "Desenvolvimento de uma ferramenta para análise e visualização de dados públicos governamentais.",
                studentsRequired: 4,
                modalityId: 2, // VOLUNTÁRIO
                categoryId: 3, // PIVIC
                servantId: 4,
            },
            {
                title: "Sistema de Gerenciamento de Estágios",
                description: "Criação de um sistema para gerenciar estágios, incluindo cadastro de oportunidades e acompanhamento.",
                studentsRequired: 2,
                modalityId: 1, // BOLSA
                categoryId: 2, // PIBIT
                servantId: 1,
            },
            {
                title: "Aplicativo de Controle de Gastos Pessoais",
                description: "Desenvolvimento de um app para controlar finanças pessoais e gerar relatórios.",
                studentsRequired: 3,
                modalityId: 2, // VOLUNTÁRIO
                categoryId: 6, // MONOGRAFIA
                servantId: 2,
            },
            // Projetos para os professores dos demais departamentos
            // Departamento DAB (id: 2)
            {
                title: "Sistema de Controle de Acesso",
                description: "Desenvolvimento de um sistema para controle de acesso específico para o departamento DAB.",
                studentsRequired: 3,
                modalityId: 1,
                categoryId: 2,
                servantId: 5,
            },
            {
                title: "Aplicativo para Otimização de Recursos",
                description: "Criação de um aplicativo para otimização dos recursos do departamento DAB.",
                studentsRequired: 4,
                modalityId: 2,
                categoryId: 3,
                servantId: 6,
            },
            // Departamento DCC (id: 3)
            {
                title: "Plataforma de Colaboração Acadêmica",
                description: "Desenvolvimento de uma plataforma para fomentar a colaboração entre alunos e professores no departamento DCC.",
                studentsRequired: 3,
                modalityId: 1,
                categoryId: 5,
                servantId: 7,
            },
            {
                title: "Ferramenta de Análise de Dados",
                description: "Criação de uma ferramenta para análise de dados específicos do departamento DCC.",
                studentsRequired: 4,
                modalityId: 2,
                categoryId: 1,
                servantId: 8,
            },
            // Departamento DFIS (id: 4)
            {
                title: "Sistema de Monitoramento de Laboratórios",
                description: "Desenvolvimento de um sistema para monitorar o uso e a manutenção dos laboratórios do departamento DFIS.",
                studentsRequired: 3,
                modalityId: 1,
                categoryId: 4,
                servantId: 9,
            },
            {
                title: "Aplicativo de Gestão de Equipamentos",
                description: "Criação de um aplicativo para gerenciar equipamentos e materiais do departamento DFIS.",
                studentsRequired: 4,
                modalityId: 2,
                categoryId: 6,
                servantId: 10,
            },
            // Departamento DEMAT (id: 5)
            {
                title: "Plataforma de Ensino de Matemática",
                description: "Desenvolvimento de uma plataforma interativa para o ensino de matemática no departamento DEMAT.",
                studentsRequired: 3,
                modalityId: 1,
                categoryId: 2,
                servantId: 11,
            },
            {
                title: "Sistema de Avaliação de Desempenho",
                description: "Criação de um sistema para avaliar o desempenho acadêmico dos alunos no departamento DEMAT.",
                studentsRequired: 4,
                modalityId: 2,
                categoryId: 3,
                servantId: 12,
            },
            // Departamento DAQ (id: 6)
            {
                title: "Aplicativo de Otimização de Processos",
                description: "Desenvolvimento de um aplicativo para otimização dos processos internos do departamento DAQ.",
                studentsRequired: 3,
                modalityId: 1,
                categoryId: 5,
                servantId: 13,
            },
            {
                title: "Ferramenta de Suporte à Pesquisa",
                description: "Criação de uma ferramenta para apoiar as pesquisas realizadas no departamento DAQ.",
                studentsRequired: 4,
                modalityId: 2,
                categoryId: 1,
                servantId: 14,
            },
            // Departamento DMM (id: 7)
            {
                title: "Sistema de Gestão de Projetos",
                description: "Desenvolvimento de um sistema para gerenciamento de projetos acadêmicos no departamento DMM.",
                studentsRequired: 3,
                modalityId: 1,
                categoryId: 4,
                servantId: 15,
            },
            {
                title: "Aplicativo de Integração Acadêmica",
                description: "Criação de um aplicativo para promover a integração entre alunos e professores no departamento DMM.",
                studentsRequired: 4,
                modalityId: 2,
                categoryId: 6,
                servantId: 16,
            }
        ]
    });
    return projectIdeas;
}


async function main() {
    await populateModalities()
    await populateCategories()
    await populateDepartments()
    await populateUsers()
    await populateServants()
    await populateProjectIdeas()
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