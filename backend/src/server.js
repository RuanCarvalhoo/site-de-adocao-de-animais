require("dotenv").config();
const path = require("path");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { createApiRouter } = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const prisma = new PrismaClient();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use("/api", createApiRouter(prisma));

const frontendPath = path.resolve(__dirname, "../../frontend");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
