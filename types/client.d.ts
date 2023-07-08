import { Menu } from '../client/interfaces';

interface Options {
    /**
     * Set the menu you want to show
     *
     * @type {Menu}
     * @memberof Options
     */
    create?: Menu;

    /**
     * Remove the currently shown menu
     *
     * @type {boolean}
     * @memberof Options
     */
    destroy?: boolean;
}

declare module 'alt-client' {
    interface ICustomEmitEvent {
        'crc-native-menu': (data: Partial<Options>) => void;
    }
}
