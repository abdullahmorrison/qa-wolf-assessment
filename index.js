// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  await page.waitForSelector('.athing');

  const times = []

  while(times.length<100){
    const articleTimes = await page.evaluate(async () => {
      const articles = document.querySelectorAll('.athing');

      return Array.from(articles).map(article => {
        const timeElement = article.nextElementSibling.querySelector('.age');
        return timeElement ? timeElement.getAttribute('title').split(" ")[0] : null;
      })
    })

    times.push(...articleTimes)
    await page.locator('.morelink').click()
  }

  const isSortedDescending = times.slice(0,100).every((time, index) =>
    index === 0 || new Date(time) <= new Date(times[index - 1])
  )

  console.log('Articles sorted correctly:', isSortedDescending);

  await browser.close();
  return isSortedDescending;
}

(async () => {
  await sortHackerNewsArticles();
})();
