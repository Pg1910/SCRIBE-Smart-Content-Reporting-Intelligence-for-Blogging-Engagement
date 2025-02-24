import feedparser
import json
import logging
import time

logging.basicConfig(
    filename="scraper.log",  
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

with open('rss_feeds.json') as f:
    rss_feeds = json.load(f)

all_articles = []
total_feeds = len(rss_feeds)

print(f"🚀 Starting RSS feed scraping for {total_feeds} sources...\n")
logging.info(f"Starting RSS feed scraping for {total_feeds} sources.")

for feed_number, (source, url) in enumerate(rss_feeds.items(), start=1):
    print(
        f"🔍 [{feed_number}/{total_feeds}] Fetching articles from: {source} ({url})")
    logging.info(f"Fetching articles from: {source} ({url})")

    try:
        feed = feedparser.parse(url)
        articles_count = len(feed.entries)

        if feed.bozo == 1:
            print(f"⚠️  {source}:  {feed.bozo_exception}")
            logging.error(f"Failed to parse {source}: {feed.bozo_exception}")
            continue

        if articles_count == 0:
            print(f"⚠️ No articles found in {source}")
            logging.warning(f"No articles found in {source}")
            continue

        for index, entry in enumerate(feed.entries, start=1):
            article = {
                "source": source,
                "title": entry.title,
                "url": entry.link,
             
                "published_date": entry.get("published", "Unknown")
            }
            all_articles.append(article)

      
            print(
                f"✅ [{feed_number}/{total_feeds}] ({index}/{articles_count}) {entry.title}")
            logging.info(
                f"Extracted article {index}/{articles_count} from {source}: {entry.title}")

        print(
            f"🎯 Successfully extracted {articles_count} articles from {source}\n")
        logging.info(
            f"Successfully extracted {articles_count} articles from {source}")

    except Exception as e:
        print(f"❌ Error scraping {source}: {str(e)}")
        logging.error(f"Error scraping {source}: {str(e)}")

    time.sleep(1)  

output_file = "news_urls_1.json"
try:
    with open(output_file, "w") as f:
        json.dump(all_articles, f, indent=4)
    print(f"📄 Articles saved to '{output_file}'.")
    logging.info(f"Articles saved to '{output_file}'.")
except IOError as e:
    print(f"❌ Error writing to file '{output_file}': {e}")
    logging.error(f"Error writing to file '{output_file}': {e}")

total_articles = len(all_articles)
print(
    f"\n✅ Scraping completed! Extracted {total_articles} articles from {total_feeds} sources.")
logging.info(
    f"Scraping completed! Extracted {total_articles} articles from {total_feeds} sources.")

print(f"📜 Log file saved as 'scraper.log'. Check for details.\n")
logging.info(
    f"Log file saved as 'scraper.log'.")
