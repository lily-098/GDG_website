import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.onrender.com"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// --- Root Route (Health Check) ---
app.get("/", (req, res) => {
  res.send("✅ CodeChef + LeetCode Scraper API is running successfully!");
});

// --- CodeChef Route ---
app.get("/api/codechef/:handle", async (req, res) => {
  const { handle } = req.params;
  try {
    const url = `https://www.codechef.com/users/${handle}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const username = $(".user-details .h2-style").text().trim();
    const rating = $(".rating-number").first().text().trim();
    const stars = $(".rating-star").text().trim();
    const country = $(".user-country-name").text().trim();
    const highestRating = $(".rating-header small").text().trim();

    const contests = [];
    $(".contest-participated tbody tr").each((_, el) => {
      const tds = $(el).find("td");
      contests.push({
        name: $(tds[0]).text().trim(),
        rank: $(tds[1]).text().trim(),
        rating: $(tds[2]).text().trim(),
      });
    });

    res.json({
      username,
      rating,
      stars,
      country,
      highestRating,
      contests,
    });
  } catch (err) {
    console.error("CodeChef Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to fetch CodeChef profile" });
  }
});

// --- LeetCode Route ---
app.get("/api/leetcode/:handle", async (req, res) => {
  const { handle } = req.params;
  try {
    const query = {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              realName
              aboutMe
              countryName
              ranking
              starRating
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `,
      variables: { username: handle }
    };

    const { data } = await axios.post("https://leetcode.com/graphql", query, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    if (!data.data || !data.data.matchedUser) {
      return res.status(404).json({ status: "error", message: "User does not exist" });
    }

    const user = data.data.matchedUser;
    res.json({
      username: user.username,
      realName: user.profile.realName,
      aboutMe: user.profile.aboutMe,
      country: user.profile.countryName,
      ranking: user.profile.ranking,
      starRating: user.profile.starRating,
      solvedStats: user.submitStats.acSubmissionNum
    });
  } catch (err) {
    console.error("LeetCode Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to fetch LeetCode profile" });
  }
});

// --- Server Listen (for Render) ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
