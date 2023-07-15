import * as I from '../client/interfaces';

interface Options {
    /**
     * Set the menu you want to show
     *
     * @type {Menu}
     * @memberof Options
     */
    create?: I.Menu;

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

        /**
         * Invoked when the up and down navigation is changed
         *
         * @memberof ICustomEmitEvent
         */
        'crc-native-menu-option-changed': (option: I.Option) => void;
    }
}
