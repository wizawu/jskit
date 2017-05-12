import * as React from "react"
import * as ReactDOM from "react-dom"
import Box from "./Box"
import Item from "./Item"
import * as util from "./util"

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
        this.onHashChange = this.onHashChange.bind(this)
    }

    componentDidMount() {
        window.addEventListener("hashchange", this.onHashChange)
        window.addEventListener("resize", this.onResize)
        this.onResize()
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.onHashChange)
        window.removeEventListener("resize", this.onResize)
    }

    onResize() {
        this.setState({ portrait: window.innerHeight > window.innerWidth })
    }

    onHashChange() {
        this.setState({ menu: false })
        setTimeout(() => ReactDOM.findDOMNode(this.refs.main).scrollTop = 0, 100)
    }

    render() {
        let innerWidth = util.isNode() ? 0 : window.innerWidth

        let { menu } = this.state
        let {
            logo, headMenu, sideMenu, headStyle, sideStyle,
            style, children, ...otherProps
        } = this.props

        let transitionSide = "margin-left 500ms"
        let transitionMask = menu ?
            "background-color 500ms, z-index 0ms" :
            "background-color 500ms, z-index 0ms 500ms"

        let portrait = (
            <Box vertical fit {...otherProps} style={{ overflow: "hidden", ...style }}>
                <Box center style={headStyle}>
                    <div onClick={() => this.setState({ menu: true })}
                        style={{
                            fontSize: "2em",
                            padding: ".5em .64em",
                            lineHeight: 1,
                            cursor: "pointer"
                        }}>
                        &equiv;
                    </div>
                    <Item flex />
                    {logo}
                </Box>
                <Box flex>
                    <Item flex relative style={{ overflow: "auto" }}>
                        <Item style={{ position: "absolute", width: "100%" }}>
                            {children}
                        </Item>
                    </Item>
                </Box>

                <Box fit
                    style={{
                        backgroundColor: `rgba(0,0,0,${menu ? 0.64 : 0})`,
                        zIndex: menu ? 9 : -999,
                        WebkitTransition: transitionMask,
                        MsTransition: transitionMask,
                        transition: transitionMask,
                    }}>
                    <Item ref="main" relative
                        style={{
                            ...{
                                height: "100%", overflow: "auto",
                                marginLeft: menu ? 0 : -innerWidth,
                                WebkitTransition: transitionSide,
                                MsTransition: transitionSide,
                                transition: transitionSide,
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

        let landscape = (
            <Box vertical fit {...otherProps} style={{ overflow: "hidden", ...style }}>
                <Box center style={{ zIndex: 5, ...headStyle }}>
                    {logo}
                    <Item flex />
                    {headMenu}
                </Box>
                <Box flex>
                    <Item relative
                        style={{
                            ...{ height: "100%", overflow: "auto" } as any,
                            ...sideStyle
                        }}>
                        {sideMenu}
                    </Item>
                    <Item ref="main" flex relative style={{ overflow: "auto" }}>
                        <Item style={{ position: "absolute", width: "100%" }}>
                            {children}
                        </Item>
                    </Item>
                </Box>
            </Box>
        )

        return this.state.portrait ? portrait : landscape
    }
}
