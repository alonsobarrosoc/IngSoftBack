const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const prisma = require('../prisma')
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALTROUNDS);
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const fs = require("fs");
const key = process.env.KEY;

exports.newUser = async (req, res) => {
  try {
    let pass = "";
    let form = new formidable.IncomingForm();

    form.parse(req, async (er, fields, files) => {
      const usr = await prisma.usuario.findUnique({
        where: {
          email: fields.email,
        },
        select: {
          email: true,
        },
      });
      if (usr == null) {
        bcrypt.hash(fields.password, saltRounds, function(errorHash, hash) {
          pass = hash;
          let path = files.photo.filepath;
          let strFoto = "";
          if (files.photo) {
            if (files.photo.size > 10000000) {
              return res.status(400).json({
                error: "Image too big",
              });
            }
            var bitmap = fs.readFileSync(path);
            strFoto = new Buffer.from(bitmap);
          }
          prisma.usuario
            .create({
              data: {
                email: fields.email,
                name: fields.name,
                password: hash,
                photo: strFoto,
                role: Number(fields.role),
              },
            })
            .then((resp) => {
              res.json("created");
            }).finally(() => {
              prisma.$disconnect()
            });
          // res.json("created");

          // console.log(datos);
        });
      } else {
        res.status(500).json({
          error: "Email has already an account",
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.findWithoutPhoto = async (req, res) => {
  const body = req.body;
  const users = await prisma.usuario
    .findMany({
      select: {
        email: true,
        name: true,
      },
      where: body,
    })
    .catch((err) => {
      res.status(500).json(err);
    }).finally(() => {
      prisma.$disconnect()
    });
  res.status(200).json(users);
};
exports.findPhoto = async (req, res) => {
  const email = req.query.email;
  let respPhoto = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
    select: {
      photo: true,
    },
  }).finally(() => {
    prisma.$disconnect()
  });
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": respPhoto.photo.length,
  });
  res.end(respPhoto.photo);
};

exports.login = async (req, res) => {
  let body = req.body;
  const usr = await prisma.usuario.findUnique({
    where: {
      email: body.email,
    },
    select: {
      email: true,
      password: true,
      role: true,
    },
  });
  if (usr != null) {
    bcrypt.compare(body.password, usr.password).then(function(result) {
      if (result) {
        var token = jwt.sign(usr, key);
        res.status(200).json({ token });
      } else {
        res.status(403).send({ error: "Prohibido" });
      }
    });
  } else {
    res.status(500).json({ error: "User not found" });
  }
};

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[0];
    jwt.verify(token, key, (err, usr) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
exports.verifyTokenAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[0];
    jwt.verify(token, key, (err, usr) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (usr.roll == 1) {
        next();
      } else {
        return res.sendStatus(403);
      }
    });
  } else {
    res.sendStatus(401);
  }
};
