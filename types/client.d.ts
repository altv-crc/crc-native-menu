import { Menu } from '../client/interfaces';

type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object | undefined
        ? RecursivePartial<T[P]>
        : T[P];
};

/**
 * We have to mark everything as optional for intellisense some strange reason. :Sadge:
 *
 * @interface Options
 */
interface Options {
    /**
     * Set the menu you want to show
     *
     * @type {Menu}
     * @memberof Options
     */
    create?: RecursivePartial<Menu>;

    /**
     * Remove the currently shown menu
     *
     * @type {boolean}
     * @memberof Options
     */
    destroy?: boolean;
}

declare module 'alt-client' {
    export function emit(eventName: 'crc-native-menu', data: Partial<Options>);
}
