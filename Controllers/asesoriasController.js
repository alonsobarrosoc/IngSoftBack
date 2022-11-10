const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAsesoria = async (req, res) => {
  const body = req.body;
  const as = await prisma.asesoria.findMany();
  res.status(200).json(as);
};
