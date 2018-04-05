import * as React from "react"
import * as ReactDOM from "react-dom"

import { Nav } from "../src/index"

function block(width: number, height: number, background: string) {
    return <div style={{ width, height, background }} />
}

ReactDOM.render((
    <Nav style={{ background: "#00BCD4" }}
        logo={block(200, 50, "#F44336")}
        headStyle={{ background: "#E91E63" }}
        headMenu={[block(100, 50, "#9C27B0"), block(100, 50, "#673AB7")]}
        sideMenu={[block(200, 50, "#3F51B5"), block(200, 50, "#2196F3"), block(200, innerHeight, "#8BC34A")]}
        sideStyle={{ background: "#03A9F4" }}>

        {block(innerWidth / 2, innerHeight / 2, "#009688")}
        {block(innerWidth / 2, innerHeight, "#4CAF50")}
    </Nav>
), document.querySelector("div"))
