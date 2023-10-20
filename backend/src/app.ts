import cors from 'cors';
import express, { Request, Response } from 'express';
import connectDB from "./config/db.config";
import userRoutes from './routes/userRoutes';
import profRoutes from './routes/profRoutes';
import courseRoutes from './routes/courseRoutes';
import studentRoutes from './routes/studentRoutes';
import ratingRoutes from './routes/ratingRoutes';
import courseQuotaRoutes from './routes/courseQuotaRoutes';
import officeHourRoutes from './routes/officeHourRoutes';
import courseTAsRoutes from './routes/courseTAsRoutes';
import taCohortRoutes from './routes/taCohortRoutes'

const app = express();
const port = 3000;

// Basic express setup
app.use(cors());
app.use(express.json());
connectDB();

app.get("/api/online", (_, res) => {
    res.status(200).send("Server is online!");
});

app.use("/api/users", userRoutes);
app.use("/api/prof", profRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/ratings/", ratingRoutes);
app.use("/api/courseQuota", courseQuotaRoutes);
app.use("/api/oh", officeHourRoutes);
app.use("/api/courseTAs", courseTAsRoutes)
app.use("/api/tacohort", taCohortRoutes)

app.listen(port, () => console.log('Backend is running on port: ' + port));
