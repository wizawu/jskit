import * as React from "react"
import { renderToString } from "react-dom/server"

import { Box, Item, Nav } from "../src/js/index"

console.log(renderToString(<Box />))
console.log(renderToString(<Item />))
console.log(renderToString(<Nav />))