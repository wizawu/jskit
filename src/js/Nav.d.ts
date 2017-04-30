/// <reference types="react" />
import * as React from "react";
export interface Props extends React.DOMAttributes<any> {
    logo?: any;
    headMenu?: any[];
    sideMenu?: any[];
    headStyle?: React.CSSProperties;
    sideStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    className?: string;
}
export interface State {
    portrait?: boolean;
    menu?: boolean;
}
export default class Nav extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onResize(): void;
    hideMenu(): void;
    render(): JSX.Element;
}
