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
    hidden?: boolean;
    style?: React.CSSProperties;
    className?: string;
}
export default class Item extends React.Component<Props, any> {
    render(): JSX.Element;
}
