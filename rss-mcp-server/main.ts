#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { opmlToJSON } from "opml-to-json"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { z } from "zod"
import express from "express"
import fs from "fs"
import Parser from "rss-parser"
import shortHash from "short-hash"

const feedFile = process.argv[2] || "example.opml"
const feedXml = fs.readFileSync(feedFile, "utf8")
const feedJson = await opmlToJSON(feedXml)
const feedList = feedJson.children.map((it: any) => it.xmlurl)
console.log(feedList)

async function fetchArticles() {
  const parser = new Parser({
    timeout: 10_000,
    headers: {
      Accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    },
  })
  const articles: Parser.Item[] = []
  for (const url of feedList) {
    try {
      const feed = await parser.parseURL(url)
      articles.push(...feed.items)
    } catch (e) {
      console.error(`${url} ${e.message}`)
    }
  }
  return articles
}

const app = express()
app.use(express.json())

app.all("/mcp", async (req, res) => {
  const server = new McpServer({
    name: "rss-mcp-server",
    version: "0.0.1",
  })
  server.tool("list-all-titles", "Returns IDs and titles of all articles", {}, async () => {
    const articles = await fetchArticles()
    const result = articles.map((it: Parser.Item) => ({
      id: shortHash(it.title),
      title: it.title,
    }))
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    }
  })
  server.tool(
    "list-by-id",
    "Return article details matching specified IDs",
    {
      id: z.array(z.string({ description: "ID of the article" })),
    },
    async ({ id }) => {
      console.log(id)
      const articles = await fetchArticles()
      const result = articles
        .filter((it: Parser.Item) => id.indexOf(shortHash(it.title)) >= 0)
        .map((it: Parser.Item) => {
          console.log(`${it.isoDate} | ${it.title?.trim()}`)
          return {
            title: it.title?.trim(),
            link: it.link,
            pubDate: it.pubDate,
          }
        })
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      }
    },
  )
  server.tool(
    "search-by-keywords",
    "Returns a list of articles matching the given keywords",
    {
      keywords: z.array(z.string({ description: "Keywords to search for" })),
    },
    async ({ keywords }) => {
      console.log(keywords)
      const articles = await fetchArticles()
      const result = articles
        .filter((it: Parser.Item) =>
          keywords.some(k => {
            const lower = k.toLowerCase()
            return it.title?.toLowerCase()?.includes(lower) || it.content?.toLowerCase()?.includes(lower)
          }),
        )
        .map((it: Parser.Item) => {
          console.log(`${it.isoDate} | ${it.title?.trim()}`)
          return {
            title: it.title?.trim(),
            link: it.link,
            pubDate: it.pubDate,
          }
        })
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      }
    },
  )
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined })

  res.on("close", () => {
    transport.close()
    server.close()
  })

  await server.connect(transport)
  await transport.handleRequest(req, res, req.body)
})

app.listen(3000)
