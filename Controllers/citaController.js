const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


export const addCita = async (req, res) => {
  let body = req.body
  let code = 500
  let json = { error: "Error creating cita" }
  await prisma.cita.create(body).then((resp, err) => {
    if (!err) {
      code = 200
      json = { msg: "Cita created correctly" }
    }
  })
  res.status(code).json(json)
}

export const getCitas = async (req, res) => {
  let body = req.body
  let code = 500
  let json = { error: "Error getting cita" }
  const cita = await prisma.cita.findMany(body).then((resp, err) => {
    if (!err) {
      code = 200
      json = resp
    }
  })
  res.status(code).json(json)

}
