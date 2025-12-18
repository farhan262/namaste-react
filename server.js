import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/menu", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing restaurant ID" });
  }

  console.log("Fetching menu for restaurant ID:", id);

  try {
    const swiggyURL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.1562124&lng=77.6261379&restaurantId=${id}`;
    const response = await fetch(swiggyURL);

    // Check if the response is OK
    if (!response.ok) {
      console.error("Swiggy API responded with status:", response.status);
      return res.status(502).json({ error: "Swiggy API error", status: response.status });
    }

    // Try parsing JSON
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error("Failed to parse JSON from Swiggy API:", parseError.message);
      return res.status(502).json({ error: "Invalid JSON from Swiggy API" });
    }

    res.json(data);
  } catch (err) {
    console.error("Backend fetch error:", err.message);
    res.status(500).json({ error: "Proxy failed", details: err.message });
  }
});

app.listen(3001, () => console.log("Proxy server running at http://localhost:3001"));
