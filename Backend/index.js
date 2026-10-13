import express from "express";
import mongoose from "mongoose";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config({
  path: "./.env",
});

import router from "./Routes/user-routes.js";
import routers from "./Routes/product-routes.js";
import routerss from "./Routes/dashboard-routes.js";
import routersss from "./Routes/dashboardagent-routes.js";
import routerAddress from "./Routes/user-address-routes.js";
import visitCountRoutes from "./Routes/visit-count-routes.js";
import contactRoutes from "./Routes/contact-routes.js";
import feedbackRoutes from "./Routes/feedback-routes.js";

const app = express();

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

// increasing limit to store image in database
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "SpectaStyle API" });
});

app.use("/ecommerce/user", router);
app.use("/ecommerce/product", routers);
app.use("/ecommerce/manager", routerss);
app.use("/ecommerce/agent", routersss);
app.use("/ecommerce/user-address", routerAddress);
app.use("/ecommerce/contact", contactRoutes);
app.use("/ecommerce/feedback", feedbackRoutes);
app.use("/visitcount", visitCountRoutes);

app.post("/checkout", async (req, res) => {
  try {
    if (!stripe) {
      return res
        .status(503)
        .json({ error: "Payment service is not configured on the server." });
    }

    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid or empty item data" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name || "SpectaStyle Product",
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cart`,
    });

    if (!session || !session.id) {
      return res
        .status(500)
        .json({ error: "Failed to create a checkout session" });
    }

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 4000;
const url = process.env.MONGO_URL;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(port))
  .then(() => console.log(`connected to db at port ${port} :)`))
  .catch((err) => console.log(`${err} is error`));
