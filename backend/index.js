const express =require( "express");
require("dotenv/config");
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


app.post('/search', async (req, res) => {
  const { parameter,language,country } = req.body;

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(parameter)}&lang=${language}&country=${country}&max=10&apikey=${process.env.API_KEY}`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data)
      if (data.articles) {
          res.status(200).json({ articles: data.articles ,totalArticles:data.totalArticles});
      } else {
          res.status(404).json({ message: 'No articles found' });
      }
  } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: 'Error fetching news articles' });
  }
});

app.post('/home', async (req, res) => {
  const { parameter,language,country } = req.body;
  // console.log("at bacjend",req.body);
  const url = `https://gnews.io/api/v4/top-headlines?category=${parameter}&lang=${language}&country=${country}&max=10&apikey=${process.env.API_KEY}`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data)
      if (data.articles) {
          res.status(200).json({ articles: data.articles ,totalArticles:data.totalArticles});
      } else {
          res.status(404).json({ message: 'No articles found' });
      }
  } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: 'Error fetching news articles' });
  }
});




app.listen(7000, () => {
  console.log("server running on localhost:7000");
});