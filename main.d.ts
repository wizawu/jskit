declare module "react-polymer-layout"{
    type BooleanOrString = boolean | string;

    interface ItemProps {
        flex?: BooleanOrString;
        // Properties of CSS attribute "align-self"
        selfStart?: boolean;
        selfCenter?: boolean;
        selfEnd?: boolean;

        relative?: boolean;
        fit?: boolean;
        hidden?: boolean;

        style?: React.CSSProperties,
        className?: string
    }

    interface LayoutProps extends ItemProps {
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

    interface DialogProps {
        maskStyle?: React.CSSProperties,
    }

    export class Item extends React.Component<ItemProps, any>{}
    export class Box extends React.Component<LayoutProps, any> {}
    export class Layout extends React.Component<LayoutProps, any> {}
    export class Dialog extends React.Component<DialogProps, any> {}
}
