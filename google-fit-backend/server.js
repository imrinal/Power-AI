require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/fetchFitnessData", async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  try {
    const response = await axios.post(
      "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      {
        aggregateBy: [
          { dataTypeName: "com.google.step_count.delta" },
          { dataTypeName: "com.google.calories.expended" },
          { dataTypeName: "com.google.heart_rate.bpm" },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: Date.now() - 86400000,
        endTimeMillis: Date.now(),
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // Extract the relevant data from the API response
    const buckets = response.data.bucket || [];
    let steps = 0,
      calories = 0,
      heartRate = 0,
      heartRateCount = 0;

    buckets.forEach((bucket) => {
      bucket.dataset.forEach((dataset) => {
        dataset.point.forEach((point) => {
          if (point.dataTypeName === "com.google.step_count.delta" && point.value && point.value.length > 0 && point.value[0].intVal) {
            steps += point.value[0].intVal;
          } else if (point.dataTypeName === "com.google.calories.expended" && point.value && point.value.length > 0 && point.value[0].fpVal) {
            calories += point.value[0].fpVal;
          } else if (point.dataTypeName === "com.google.heart_rate.bpm" && point.value && point.value.length > 0 && point.value[0].fpVal) {
            heartRate += point.value[0].fpVal;
            heartRateCount++;
          }
        });
      });
    });

    // Calculate average heart rate
    const avgHeartRate = heartRateCount > 0 ? heartRate / heartRateCount : 0;

    res.json({
      steps,
      calories: parseFloat(calories.toFixed(2)),
      avgHeartRate: parseFloat(avgHeartRate.toFixed(2)),
    });
  } catch (error) {
    console.error("Error fetching fitness data:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));