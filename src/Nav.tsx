import * as React from "react"
import Box from "./Box"
import Item from "./Item"

export interface Props extends React.DOMAttributes<any> {
    logo?: any
    headMenu?: any[]
    sideMenu?: any[]
    headStyle?: React.CSSProperties
    sideStyle?: React.CSSProperties
    style?: React.CSSProperties
    className?: string
}

export interface State {
    portrait?: boolean
    menu?: boolean
}

export default class Nav extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { portrait: false, menu: false }
        this.onResize = this.onResize.bind(this)
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize)
        this.onResize()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize)
    }

    onResize() {
        this.setState({ portrait: window.innerHeight > window.innerWidth })
    }

    render() {
        let { logo, headMenu, sideMenu, headStyle, sideStyle, ...rootProps } = this.props
        let { menu } = this.state

        let view1 = (
            <Box vertical fit {...rootProps}>
                <Box center style={headStyle}>
                    <div style={{ fontSize: "2em", padding: ".5em .64em", lineHeight: 1, cursor: "pointer" }}
                        onClick={() => this.setState({ menu: true })}>
                        &equiv;
                    </div>
                    <Item flex />
                    {logo}
                </Box>
                <Box flex>
                    <Item flex relative style={{ overflow: "auto" }}>
                        <Item style={{ position: "absolute" }}>
                            {this.props.children}
                        </Item>
                    </Item>
                </Box>

                <Box fit style={{
                    backgroundColor: menu ? "rgba(0,0,0,0.64)" : "rgba(0,0,0,0)",
                    zIndex: menu ? 9 : -999,
                    transition: menu ? "background-color 500ms, z-index 0ms" : "background-color 500ms, z-index 0ms 500ms",
                }}>
                    <Item relative style={{
                        ...{ height: "100%", overflow: "auto" } as any,
                        ...{
                            marginLeft: menu ? 0 : -innerWidth,
                            transition: "margin-left 500ms",
                        } as any,
                        ...sideStyle
                    }}>
                        {headMenu}
                        {sideMenu}
                    </Item>
                    <Item flex onClick={() => this.setState({ menu: false })} />
                </Box>
            </Box>
        )

        let view2 = (
            <Box vertical fit {...rootProps}>
                <Box center style={headStyle}>
                    {logo}
                    <Item flex />
                    {headMenu}
                </Box>
                <Box flex>
                    <Item relative style={{ ...{ height: "100%", overflow: "auto" } as any, ...sideStyle }}>
                        {sideMenu}
                    </Item>
                    <Item flex relative style={{ overflow: "auto" }}>
                        <Item style={{ position: "absolute" }}>
                            {this.props.children}
                        </Item>
                    </Item>
                </Box>
            </Box>
        )

        return this.state.portrait ? view1 : view2
    }
}