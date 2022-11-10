const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()



exports.getAsesoria = async (req, res) => {
    const body = req.body
    const as = await prisma.asesoria.findMany({
        where:{
            1:1
        }
    })
    res.status(200).json(as)
}