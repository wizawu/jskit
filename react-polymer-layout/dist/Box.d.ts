import * as React from "react";
import { Props as ItemProps } from "./Item";
export interface Props extends ItemProps {
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
export default class Box extends React.Component<Props, any> {
    render(): JSX.Element;
}
