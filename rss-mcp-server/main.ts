import express from "express"
import fs from "fs"
import { opmlToJSON } from "opml-to-json"
import Parser from "rss-parser"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { z } from "zod"

const feedFile = process.argv[2] || "example.opml"
const feedXml = fs.readFileSync(feedFile, "utf8")
const feedJson = await opmlToJSON(feedXml)
const feedList = feedJson.children.map((it: any) => it.xmlurl)
console.log(feedList)

async function fetchArticles() {
  const parser = new Parser()
  const articles: Parser.Item[] = []
  for (const url of feedList) {
    const feed = await parser.parseURL(url)
    articles.push(...feed.items)
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
