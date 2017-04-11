import * as React from "react"
import * as ReactDOM from "react-dom"

import { Item, Box } from "../../src/index"

ReactDOM.render((
    <Box fit center aroundJustified>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
    </Box>
), document.querySelector("div"))