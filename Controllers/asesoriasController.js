const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const empty = [undefined, "", [], {}];

exports.newAsesoria = async (req, res) => {
  let body = req.body;
  let code = 500
  let json = { error: "Asesoria not created" }
  await prisma.asesoria.create(body).then((resp, err) => {
    if (!err) {
      code = 200
      json = "created"
    }
  }).finally(() => {
    prisma.$disconnect()
  })
  res.status(code).json(json)
};

exports.getAsesoria = async (req, res) => {
  const body = req.body;
  let code = 500;
  let json = { error: "Error getting" };
  if (empty.includes(body)) {
    await prisma.asesoria.findMany().then((resp, err) => {
      if (!err) {
        code = 200;
        json = resp;
      }
    });
  } else {
    await prisma.asesoria.findMany(body).then((resp, err) => {
      if (!err) {
        code = 200;
        json = resp;
      }
    }).finally(() => {
      prisma.$disconnect()
    });
  }
  res.status(code).json(json);
};

exports.deleteAsesoria = async (req, res) => {
  const idAsesoria = req.query.idAsesoria;
  let code = 500;
  let json = { error: "Error deleting" };
  await prisma.asesoria
    .delete({
      where: {
        idAsesoria: idAsesoria,
      },
    })
    .then((resp, err) => {
      if (!err) {
        code = 500;
        json = { msg: "Deleted correctly" };
      }
    })
    .finally(() => {
      prisma.$disconnect()
    });
  res.status(code).json(json)
};

exports.putAsesoria = async (req, res) => {
  const idAsesoria = req.query.idAsesoria;
  const body = req.body;
  let code = 500;
  let json = { error: "Error updating" };
  await prisma.asesoria
    .update({
      where: {
        idAsesoria: idAsesoria,
      },
      data: body,
    })
    .then((resp, err) => {
      if (!err) {
        code = 200;
        json = { msg: "Updated correctly" };
      }
    })
    .finally(() => {
      prisma.$disconnect()
    });
  res.status(200).json(json);
};
