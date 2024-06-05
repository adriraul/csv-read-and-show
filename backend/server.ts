require("dotenv").config();
import express from "express";
import cors from "cors";
import multer from "multer";
import csvToJson from "convert-csv-to-json";

const app = express();
const port = process.env.PORT ?? 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let carData: Array<Record<string, string>> = [];

app.use(cors());

app.post("/api/files", upload.single("file"), async (req, res) => {
  const { file } = req;
  if (!file) {
    return res
      .status(500)
      .json({ message: "El archivo no se ha cargado correctamente." });
  }

  if (file.mimetype !== "text/csv") {
    return res.status(500).json({ message: "El archivo no es un CSV." });
  }

  let json: Array<Record<string, string>> = [];

  try {
    const csv = Buffer.from(file.buffer).toString("utf-8");
    json = csvToJson.fieldDelimiter(",").csvStringToJson(csv);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "El archivo no se ha cargado correctamente." });
  }

  carData = json;

  return res
    .status(200)
    .json({ data: json, message: "El archivo se ha cargado correctamente." });
});

app.get("/api/cars", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(500).json({ message: "No se ha enviado un query." });
  }

  const search = q.toString().toLowerCase();

  const filteredData = carData.filter((row) => {
    return Object.values(row).some((value) =>
      value.toLowerCase().includes(search)
    );
  });

  return res.status(200).json({ data: filteredData });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
