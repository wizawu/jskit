import * as React from "react"
import PolymerLayout from "../index"

const Box = PolymerLayout.Box
declare var window: any

(window["ReactDOM"] || React).render((
    <Box center centerJustified fit>
        Polymer
    </Box>
), document.body)