import * as React from "react"
import {Box} from "../index"

declare var window: any

(window["ReactDOM"] || React).render((
    <Box center centerJustified fit>
        Polymer
    </Box>
), document.body)