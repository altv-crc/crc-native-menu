# [CRC][TS] alt:V Native Menu

<sup>Supported by <a href="https://github.com/orgs/altv-crc/">CRC</a></sup>

![](https://i.imgur.com/guESOaO.png)

This is considered a utility component for rendering basic menus with various abilities such as

* Invoking an event
* Cycling through selections
* Cycling through colors
* Text input

## Requires

- [CRC Instructional Buttons](https://github.com/altv-crc/crc-instructional-buttons)
- [alt:V TypeScript Project](https://github.com/Stuyk/altv-typescript)
- [VSCode - alt:V Event Suggestions](https://marketplace.visualstudio.com/items?itemName=stuyk.altv-event-suggestions)

_Highly recommended to get the extension, for better event handling._

## Installation

0. Install the [Instruction Buttons Utility](https://github.com/altv-crc/crc-instructional-buttons)

1. Create a folder in your `src` folder called `crc-native-menu`.

2. Add the `TypeScript` files from this resource, to that folder.

3. Modify `server.toml` and ensure it loads whatever you named the folder.

In the case of the example above it should be `crc-login`.

```
resources = [ 
    'crc-db',
    'crc-native-menu',
    'crc-login',
    'core',
    'dbg_reconnect'
]
```

_Your resource structure may vary_

## Usage

* There is not a limitation on the amount of options you can have.

### Create Menu

```ts
const myMenu = {
    header: 'My Menu',
    options: [
        {
            text: 'Invoke Event',
            type: 'invoke',
            value: 'any-value-you-want',
            eventName: 'my-event-onInvoke',
        },
        {
            text: 'My Selection Group',
            type: 'selection',
            eventName: 'my-event-onChange',
            index: 0,
            options: [
                {
                    text: 'afdsfdsfdsdsss',
                    value: 'a',
                },
                {
                    text: 'b',
                    value: 'b',
                },
            ],
        },
        {
            text: 'My Color Group',
            type: 'color',
            eventName: 'my-event-onColorChange',
            index: 0,
            options: [
                {
                    text: 'red',
                    color: new alt.RGBA(255, 0, 0, 255),
                    value: 0,
                },
                {
                    text: 'green',
                    color: new alt.RGBA(0, 255, 0, 255),
                    value: 1,
                },
            ],
        },
        {
            text: 'Input',
            type: 'input',
            eventName: 'my-event-onTextChange',
            value: 'initial value',
        },
    ],
};

alt.on('my-event-onInvoke', (value: any) => {});
alt.on('my-event-onChange', (value: any) => {});
alt.on('my-event-onColorChange', (value: number) => {});
alt.on('my-event-onTextChange', (text: string | undefined) => {});

alt.emit('crc-native-menu-create', myMenu);
```

### Destroy Menu

```ts
alt.emit('crc-native-menu-destroy');
```

### Prevent Menu from Exiting

If you want a menu to stop from exiting entirely, you can use the `noExit` flag.

```ts
const myMenu = {
    header: 'My Menu',
    noExit: true,
    options: []
}
```

### Call Event on Backspace

If you want the menu to call an event when `backspace` is pressed. You can use the `backEvent` property.

```ts
const myMenu = {
    header: 'My Menu',
    backEvent: 'some-some-previous-menu-tree',
    options: []
}
```


# Preview

![](https://i.imgur.com/EQ30tXS.png)