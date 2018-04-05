/// <reference types="react" />
import * as React from "react";
export interface Props extends React.DOMAttributes<any> {
    flex?: boolean | number | string;
    layout?: boolean;
    selfStart?: boolean;
    selfCenter?: boolean;
    selfEnd?: boolean;
    selfStretch?: boolean;
    relative?: boolean;
    fit?: boolean;
    fullbleed?: boolean;
    hidden?: boolean;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
}
export default class Item extends React.Component<Props, any> {
    componentDidMount(): void;
    componentDidUpdate(): void;
    insertDisplayFlex(): void;
    render(): JSX.Element;
}
