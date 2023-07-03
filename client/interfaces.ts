import * as alt from 'alt-client';

export interface Option {
    text: string;
    eventName?: string;
}

export interface TextInput extends Option {
    type: 'input';
    value: string;
}

export interface Invoke extends Option {
    type: 'invoke';
    value: string | number | Object;
    isPageChanger?: boolean;
    leftCallback?: Function;
    rightCallback?: Function;
}

export interface Selection extends Option {
    type: 'selection';
    options: { text: string; value: string | number | Object }[];
    index: number;
}

export interface Color extends Option {
    type: 'color';
    options: { text: string; color: alt.RGBA; value: any }[];
    index: number;
}

export interface ColorGroup {
    default: alt.RGBA;
    hover: alt.RGBA;
}

export interface Menu {
    header: string;
    options: Array<TextInput | Invoke | Selection | Color>;
    background?: ColorGroup;
    text?: ColorGroup;
}
