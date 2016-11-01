type booleanOrString = boolean | string;

interface PolymerLayoutItemProps {
    flex?: booleanOrString;
    // Properties of CSS attribute "align-self"
    selfStart?: boolean;
    selfCenter?: boolean;
    selfEnd?: boolean;

    relative?: boolean;
    fit?: boolean;
    hidden?: boolean;
}

interface PolymerLayoutBoxProps extends PolymerLayoutItemProps{
    // Properties of CSS attribute "align-items":
    reverse?: boolean;
    wrap?: boolean;

    center?: boolean;
    end?: boolean;
    start?: boolean;

    // Properties of CSS attribute "justify-content":
    stretch?: boolean;
    justified?: boolean;
    centerJustified?: boolean;
    arountJustified?: boolean;
    startJustified?: boolean;
    endJustified?: boolean;

    // Properties of CSS attribute "flex-direction"
    vertical?: boolean;
    horizontal?: boolean;
}

interface PolymerLayoutDialogProps {
    style?: React.CSSProperties,
    maskStyle?: React.CSSProperties,
    className?: string
}

declare module "react-polymer-layout"{
    export class Item extends React.Component<PolymerLayoutItemProps, any>{}
    export class Box extends React.Component<PolymerLayoutBoxProps, any> {}
    export class Layout extends React.Component<PolymerLayoutBoxProps, any> {}
    export class Dialog extends React.Component<PolymerLayoutDialogProps, any> {}
}
