import express from "express";
import cors from "cors";
import adminRoutes from "./Server/routes/adminRoutes.js";
import productRoutes from "./Server/routes/productRoutes.js";
import orderRoutes from "./Server/routes/orderRoutes.js";
import paymentRoutes from "./Server/routes/paymentRoutes.js";
import storeRoutes from "./Server/routes/storeRoutes.js";

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/store", storeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
