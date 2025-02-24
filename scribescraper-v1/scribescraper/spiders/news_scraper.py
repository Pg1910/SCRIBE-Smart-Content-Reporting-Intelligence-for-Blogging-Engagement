import scrapy
import json
import random
import logging
import time
import requests
import os
from pymongo import MongoClient
from scrapy.exceptions import CloseSpider

PUSH_TO_MONGO_DB = False  

if PUSH_TO_MONGO_DB:
    client = MongoClient("mongodb://localhost:27017/")
    db = client["Scribe-Scrape-Data"]
    collection = db["ScribeGen"]

def load_proxies():
    try:
        with open("proxies_list.txt", "r") as file:
            proxies = [line.strip() for line in file.readlines()]
        if not proxies:
            raise FileNotFoundError("⚠️ No proxies found in the file!")
        return proxies
    except FileNotFoundError:
        print("⚠️ Proxy file not found! Running without proxies...")
        return []

def get_working_proxy(proxies):
    random.shuffle(proxies)
    for proxy in proxies:
        try:
            print(f"🛠️ Testing proxy: {proxy}")
            response = requests.get("https://www.google.com", proxies={"http": f"http://{proxy}", "https": f"http://{proxy}"}, timeout=5)
            if response.status_code == 200:
                print(f"✅ Proxy working: {proxy}")
                return proxy
        except requests.exceptions.RequestException:
            print(f"❌ Proxy failed: {proxy}")
            continue
    return None

try:
    with open("news_urls.json", "r") as file:
        article_list = json.load(file)  # No limit on articles
    if not article_list:
        raise ValueError("⚠️ No articles found in news_urls.json!")
except (FileNotFoundError, json.JSONDecodeError, ValueError) as e:
    print(f"🚨 Error loading article list: {e}")
    article_list = []

logging.basicConfig(
    filename="scraping_log.txt",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
logging.getLogger().addHandler(console_handler)
json_file_path = "scraped_articles.json"
if not os.path.exists(json_file_path):
    with open(json_file_path, "w", encoding="utf-8") as f:
        json.dump([], f, indent=4, ensure_ascii=False)

class NewsSpider(scrapy.Spider):
    name = "news_scraper"
    custom_settings = {
        "CONCURRENT_REQUESTS": 8,
        "DOWNLOAD_DELAY": 1.5,  ## akshat here, don't change this or keep it more than 4
        "ROBOTSTXT_OBEY": False,
        "DOWNLOADER_MIDDLEWARES": {
            "scrapy.downloadermiddlewares.retry.RetryMiddleware": 90,
        },
        "LOG_LEVEL": "INFO",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.proxies = load_proxies()
        self.proxy = get_working_proxy(self.proxies)
        self.articles_scraped = 0
        self.total_articles = len(article_list)

    def start_requests(self):
        if not self.proxy:
            logging.error("❌ No working proxy found!")
            print("❌ No working proxy found! Exiting...")
            raise CloseSpider("No working proxies available!")

        print(f"🚀 Starting scrape for {self.total_articles} articles...")

        for idx, article in enumerate(article_list):
            url = article["url"]
            delay = random.uniform(1, 5)
            print(f"⏳ Scraping ({idx + 1}/{self.total_articles}): {url} [Delay: {delay:.2f}s]")
            time.sleep(delay)

            yield scrapy.Request(
                url=url,
                callback=self.parse_article,
                errback=self.error_handler,
                headers={
                    "User-Agent": f"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36"
                },
                meta={"proxy": f"http://{self.proxy}", "article_data": article, "index": idx}
            )

    def parse_article(self, response):
        article_data = response.meta["article_data"]
        index = response.meta["index"]

        title = response.xpath("//h1/text() | //title/text()").get() or article_data["title"]
        content = " ".join(response.xpath("//p/text()").getall()).strip()
        author = response.xpath("//meta[@name='author']/@content").get() or "Unknown"
        date_posted = response.xpath("//meta[@property='article:published_time']/@content").get() or article_data["published_date"]

        article_record = {
            "source": article_data["source"],
            "title": title,
            "url": article_data["url"],
            "content": content,
            "date_posted": date_posted,
            "author": author
        }

        try:
            with open(json_file_path, "r", encoding="utf-8") as json_file:
                existing_data = json.load(json_file)
        except (FileNotFoundError, json.JSONDecodeError):
            existing_data = []

        existing_data.append(article_record)

        with open(json_file_path, "w", encoding="utf-8") as json_file:
            json.dump(existing_data, json_file, indent=4, ensure_ascii=False)

        print(f"📜 Saved: {title}")

        if PUSH_TO_MONGO_DB:
            collection.insert_one(article_record)

        self.articles_scraped += 1
        percentage = (self.articles_scraped / self.total_articles) * 100

        logging.info(f"✅ [{self.articles_scraped}/{self.total_articles}] {percentage:.2f}% - Scraped: {title}")
        print(f"✅ [{self.articles_scraped}/{self.total_articles}] {percentage:.2f}% - Scraped: {title}")

        if self.articles_scraped >= self.total_articles:
            print("🎉 Scraping complete!")
            raise CloseSpider("All articles scraped!")

    def error_handler(self, failure):
        logging.error(f"❌ [ERROR] Failed: {failure.request.url} | Reason: {failure.value}")
        print(f"❌ Failed to scrape: {failure.request.url} | Reason: {failure.value}")

        new_proxy = get_working_proxy(self.proxies)
        if new_proxy:
            logging.info(f"🔄 Switching to new proxy: {new_proxy}")
            print(f"🔄 Switching to new proxy: {new_proxy}")
            self.proxy = new_proxy
        else:
            logging.error("❌ No more working proxies available!")
            print("❌ No more working proxies available! Exiting...")
            raise CloseSpider("No proxies left!")
