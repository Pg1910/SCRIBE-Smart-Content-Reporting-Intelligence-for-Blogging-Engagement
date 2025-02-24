# SCRIBE – Smart Content Reporting Intelligence for Blogging Engagement 

SCRIBE is an autonomous AI agent that produces engaging blog posts by aggregating, processing, and summarizing current news events from diverse sources. Built for the [FLIPR AI](https://flipr.ai/ "Sponsor") challenge, it integrates state-of-the-art web scraping, data processing, and a Retrieval-Augmented Generation (RAG) pipeline powered by the Mistral Completion API.

---

## Table of Contents

- [Overview](#overview)
- [Architecture &amp; Strategy](#architecture--strategy)
- [Features](#features)
- [Installation &amp; Setup](#installation--setup)
- [Usage](#usage)

---

## Overview

SCRIBE automates the process of:

- **Collecting news data** from over **100 international and Indian news websites** using RSS feeds.
- **Parsing and scraping** news articles (over 10,000+ articles) using an industrial-grade Scrapy setup with proxy support.
- **Storing data** in a MongoDB database that doubles as a vector database.
- **Transforming text data** into embeddings using Sentence Transformers and FAISS.
- **Generating blog posts** through a Retrieval-Augmented Generation (RAG) pipeline in conjunction with the Mistral Completion API.

---

## Architecture & Strategy 🎯

1. **RSS Feed Aggregation**

   - **Data Collection:** Gather URLs from 100+ news sources for the past 3 weeks.
   - **Parsing:** Convert RSS feeds into JSON files containing article metadata.
2. **Industrial-Grade Scraping**

   - **Scrapy + Proxies:** Scrape detailed content from the collected URLs.
   - **Data Storage:** Store scraped data (title, content, URL, publication date, etc.) in MongoDB.
3. **Vectorization & Retrieval**

   - **Embedding Generation:** Use Sentence Transformers to convert article texts into embeddings.
   - **Vector Database:** Build a FAISS index from MongoDB data for fast, relevance-based retrieval.
4. **RAG Pipeline with Mistral API**

   - **Contextual Querying:** Retrieve relevant news snippets and pass them as context.
   - **Content Generation:** Use Mistral Completion API to generate concise, SEO-optimized blog posts.

---

## Features ✨

- **Automated Web Scraping:** Industrial-grade Scrapy spider with proxy support.
- **Massive Data Collection:** Aggregation from 100+ news sources.
- **Vectorization Pipeline:** Efficient conversion to FAISS vector database using Sentence Transformers.
- **RAG-Driven Summarization:** Combines real-time news retrieval with Mistral’s content generation.
- **SEO Optimization:** Embedded keyword extraction and meta generation.
- **Seamless Publishing:** Integrated with WordPress API for autonomous content publishing.

---

## Installation & Setup 🔧

### Prerequisites

- Python 3.8+
- [MongoDB](https://www.mongodb.com/) (or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Scrapy](https://scrapy.org/)
- [Sentence Transformers](https://www.sbert.net/)
- [FAISS](https://github.com/facebookresearch/faiss)
- [Mistral API Access](https://www.mistral.ai/) (API key required)
- [WordPress](https://wordpress.org/) (for publishing) [OPTIONAL]
  or
- Drupal [OPTIONAL]

### Setup Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Pg1910/SCRIBE-Smart-Content-Reporting-Intelligence-for-Blogging-Engagement.git
   cd SCRIBE
   ```

### Create a Virtual Environment

```
python -m venv venv source venv/bin/activate# 
On Windows: venv\Scripts\activate
```

# Methodology employed to create SCRIBE

This document outlines **Steps 1 through 5** for building the backend pipeline of **SCRIBE – Smart Content Reporting Intelligence for Blogging Engagement**. These steps cover collecting RSS feeds, scraping articles, storing and classifying data, and deduplicating the content.

---

## Step 1: Select Reliable News Sources 🌐

- **Objective:** Gather news data from 100+ international and Indian news websites.
- **Method:** Use RSS feeds for a structured and reliable data source.
- **Action Items:**
  - Create a file (`rss_feed_list.json`) containing the RSS feed URLs.
  - Ensure the feeds cover the past 3 weeks of news.

**Example `rss_feed_list.json`:**

```json
[
  "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
  "https://www.hindustantimes.com/rss",
  "https://www.thehindu.com/feeder/default.rss"
  // Add more RSS feed URLs here...
]
```

NOTE: You can fetch major RSS feeds from the [META  Archives](https://about.fb.com/wp-content/uploads/2016/05/rss-urls-1.pdf)

## Step 2: Implement News Scraper 🕷️

- **Objective:** Extract Daily articles from RSS Feeds and then deploy an industrial scraper.
- **Method**: Use *feedparser* library to parse RSS feeds and then actiavte Scrapy Industrial Scraper
- **Action Items:**
  - Execute rss-feed-parse.py
  - Collect results in parsed_feeds.json
  - Run the Scrapy spider to scrape the entire all articles.

## Step 3: Export and Backup Article-Data to MongoDB💾


- **Objective:** Export all data to MongoDB for backup and checkpoint-phase for transition to a vector database.
- **Method**: Convert JSON files to mongoDB with the desired schema.
- **Action Items:**
  - One can choose any method, one desires for this step.

## Step 4:  Classify News by Region 📍🕷️

- **Objective:** Enhance the dataset by classifying articles based on geographic regions (e.g., India → State → City).
- **Method**: Use Named Entity Recognition (NER) to extract location data from article content.
- **Action Items:**
  * Integrate spaCy for NER.
  * Process each article to extract location entities (GPE).

## Step 5: Remove Duplicate Articles 🗑️

* **Objective:** Ensure a clean dataset by eliminating duplicate or near-duplicate articles.
* **Method:** Utilize text similarity techniques (e.g., using FuzzyWuzzy) to compare article titles and content.
* **Action Items:**

  * Implement a deduplication script that compares each article to existing ones.
  * Remove duplicates based on a similarity threshold.

# Work in Action

[Loom Link](https://www.loom.com/share/b87b6a42d99c435a9ee328bf3e57a128)

## Conclusion

By following these five steps, you will have established a robust pipeline for:

1. **Selecting and parsing RSS feeds** from 100+ trusted news sources.
2. **Scraping detailed article content** using an industrial-grade Scrapy setup.
3. **Storing articles in MongoDB** for persistence.
4. **Classifying articles by region** using NER with spaCy.
5. **Removing duplicate entries** to ensure data quality.

This foundation is critical for SCRIBE’s advanced features, including vectorization, RAG-driven content generation, and automated publishing.

## Authors

* Akshat Singh
* Piyush Gupta
* Sriman Srinivasan
* J V Kousthub
