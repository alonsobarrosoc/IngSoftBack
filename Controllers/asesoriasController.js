const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const empty = [undefined, "", [], {}];
exports.getAsesoria = async (req, res) => {
  const body = req.body;
  let as = [];
  if (empty.includes(body)) {
    as = await prisma.asesoria.findMany();
  } else {
    as = await prisma.asesoria.findMany(body);
  }
  res.status(200).json(as);
};
