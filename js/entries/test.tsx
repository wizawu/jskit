import * as React from "react"
import {Box, Dialog} from "../index"

declare var window: any

class Root extends React.Component<any, any> {
    render() {
        return (
            <Box center centerJustified fit onClick={() => (this.refs["dialog"] as Dialog).show()}>
                Polymer
                <Dialog ref="dialog">Hello</Dialog>
            </Box>
        )
    }
}

(window["ReactDOM"] || React).render(<Root />, document.body)
