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
    style?: React.CSSProperties;
    className?: string;
    wrap?: boolean;
    reverse?: boolean;
    horizontal?: boolean;
    vertical?: boolean;
    center?: boolean;
    start?: boolean;
    end?: boolean;
    stretch?: boolean;
    startJustified?: boolean;
    centerJustified?: boolean;
    endJustified?: boolean;
    justified?: boolean;
    aroundJustified?: boolean;
}
export default class Item extends React.Component<Props, any> {
    render(): JSX.Element;
}
