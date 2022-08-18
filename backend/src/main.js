import express from "express";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient;

const app= express();

app.use(express.json());

const port = 6500;

app.use((_req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methode','GET, POST , PACTH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Header','Content-Type, Autohorization');
  next();
});


app.get("/jeniskopi", async (_req, res) => {
     try{
        const jeniskopi = await database.jeniskopi.findMany();
        if (!jeniskopi) throw new Error("jeniskopi tidak ada");
        res.send(jeniskopi);
     } catch (err) {
        res.send({status: 404, message: err.message});
     }
});

app.get("/jeniskopi/:id", async (req, res) => {
    try{
        const jeniskopi = await database.jeniskopi.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!jeniskopi) throw new Error("jeniskopi tidak ada");

        res.send(jeniskopi);
        } catch(err){
        res.send({ status:404, message:err.message});
    }
});

app.post("/jeniskopi/create", async (req, res) => {
    try {
        const jeniskopi = await database.jeniskopi.create({
          data: {
            name: req.body.name,
            rasa: req.body.rasa,
            origin: req.body.origin,
      },
    });
    res.send({ message: "jeniskopi Berhasil di buat", data: jeniskopi });
  } catch (err) {}
});

app.put("/jeniskopi/update/", async (req, res) => {
  try {
    const jeniskopi = await database.jeniskopi.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        rasa: req.body.rasa,
        origin: req.body.origin,
      },
    });
    res.send({ message: "jeniskopi Berhasil di update", data: jeniskopi });
  } catch (err) {}
});

app.delete("/jeniskopi/delete", async (req, res) => {
  await database.jeniskopi.delete({
    where: {
      id: req.body.id,
    },
  });
  res.send({ message: "jeniskopi Berhasil di hapus" });
});

app.post("create", (_req,res) => {
  res.send({name: _req.body});
});


app.listen(port, () =>{
    console.log(`Aplikasi nya jalan di port ${port}`);
});