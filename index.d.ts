/// <reference types="react" />
import * as React from "react";
declare namespace ReactPolymerLayout {
    interface ItemProps extends React.DOMAttributes<any> {
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
    interface BoxProps extends ItemProps {
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
    interface DialogProps extends ItemProps {
        maskStyle?: React.CSSProperties;
    }
    interface DialogState {
        display?: string;
        opacity?: number;
        marginTop?: number;
        timer?: any;
        handleClickMask?: any;
    }
    class Item extends React.Component<ItemProps, {}> {
        render(): JSX.Element;
    }
    class Box extends React.Component<BoxProps, {}> {
        render(): JSX.Element;
    }
    type Layout = Box;
    class Dialog extends React.Component<DialogProps, DialogState> {
        constructor(props: DialogProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        _getDOMNode(element: any): any;
        show(): void;
        hide(): void;
        render(): JSX.Element;
    }
}
export = ReactPolymerLayout;
