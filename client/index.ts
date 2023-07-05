import * as alt from 'alt-client';
import * as native from 'natives';
import { drawTextAbsolute } from './utility';
import { Color, Invoke, Menu, Selection, TextInput } from './interfaces';
import * as page from './page';

// Menu Display
let interval: number;
let headerWidth = 0.22;
let headerHeight = 0.07;
let anchorX = 0.985 - headerWidth / 2; // Right
let anchorY = 0.06; // Top
let boxHeight = 0.07;
let boxWidth = 0.22;

const CONTROLS = {
    DOWN: 187,
    UP: 188,
    LEFT: 189,
    RIGHT: 190,
    ACCEPT: 201,
    BACK: 202,
};

function handleControls() {
    if (native.isControlJustPressed(0, CONTROLS.UP)) {
        page.up();
        return;
    }

    if (native.isControlJustPressed(0, CONTROLS.DOWN)) {
        page.down();
        return;
    }

    if (native.isControlJustPressed(0, CONTROLS.LEFT)) {
        page.left();
        return;
    }

    if (native.isControlJustPressed(0, CONTROLS.RIGHT)) {
        page.right();
        return;
    }

    if (native.isControlJustPressed(0, CONTROLS.ACCEPT)) {
        page.select();
        return;
    }

    if (native.isControlJustPressed(0, CONTROLS.BACK)) {
        page.back();
        return;
    }
}

function drawOption(offsetY: number, option: Invoke | TextInput | Color | Selection, isActive = false) {
    if (!page.getMenu()) {
        return;
    }

    native.drawRect(
        anchorX,
        anchorY + offsetY,
        headerWidth,
        headerHeight,
        isActive ? 32 : 0,
        isActive ? 32 : 0,
        isActive ? 32 : 0,
        200,
        true
    );

    if (option.type === 'input') {
        drawTextAbsolute(option.text, new alt.Vector2(anchorX, anchorY), boxWidth, 0.5, offsetY, 'left');
        const inputValue = option.value.length > 16 ? option.value.slice(0, 16) + '...' : option.value;
        drawTextAbsolute(
            `( ${inputValue} )`,
            new alt.Vector2(anchorX + boxWidth / 4.4, anchorY),
            boxWidth,
            0.4,
            offsetY,
            'center'
        );
        return;
    }

    if (option.type === 'invoke') {
        if (option.isPageChanger) {
            drawTextAbsolute('<', new alt.Vector2(anchorX, anchorY), boxWidth, 0.5, offsetY, 'left');
            drawTextAbsolute(
                `${page.getPageIndex()} / ${page.getPageCount()}`,
                new alt.Vector2(anchorX, anchorY),
                boxWidth,
                0.5,
                offsetY,
                'center'
            );
            drawTextAbsolute('>', new alt.Vector2(anchorX, anchorY), boxWidth, 0.5, offsetY, 'right');
            return;
        }

        drawTextAbsolute(
            option.text,
            new alt.Vector2(anchorX, anchorY),
            boxWidth,
            0.5,
            offsetY,
            option.isPageChanger ? 'center' : 'left'
        );
    }

    if (option.type === 'selection') {
        let text = option.options[option.index].text;
        text = text.length > 12 ? text.slice(0, 12) + '...' : text;

        drawTextAbsolute(text, new alt.Vector2(anchorX + boxWidth / 4.4, anchorY), boxWidth, 0.4, offsetY, 'center');

        if (isActive) {
            drawTextAbsolute(option.text, new alt.Vector2(anchorX, anchorY), boxWidth, 0.5, offsetY, 'left');
            drawTextAbsolute('<', new alt.Vector2(anchorX, anchorY), boxWidth, 0.5, offsetY, 'center');

            drawTextAbsolute('>', new alt.Vector2(anchorX, anchorY), boxWidth, 0.5, offsetY, 'right');
        } else {
            drawTextAbsolute(option.text, new alt.Vector2(anchorX, anchorY), boxWidth, 0.5, offsetY, 'left');
        }

        return;
    }

    if (option.type === 'color') {
        const optionInfo = option.options[option.index];

        native.drawRect(
            anchorX + boxWidth / 4.4,
            anchorY + offsetY,
            boxWidth / 4,
            headerHeight / 2,
            optionInfo.color.r,
            optionInfo.color.g,
            optionInfo.color.b,
            255,
            true
        );

        drawTextAbsolute(option.text, new alt.Vector2(anchorX, anchorY), boxWidth, 0.5, offsetY, 'left');

        if (isActive) {
            drawTextAbsolute('<', new alt.Vector2(anchorX, anchorY), boxWidth, 0.5, offsetY, 'center');
            drawTextAbsolute('>', new alt.Vector2(anchorX, anchorY), boxWidth, 0.5, offsetY, 'right');
        }
    }
}

function draw() {
    const menu = page.getMenu();
    if (!menu) {
        return;
    }

    handleControls();

    // Header
    native.drawRect(anchorX, anchorY, headerWidth, headerHeight, 0, 0, 0, 200, true);
    drawTextAbsolute(menu.header, new alt.Vector2(anchorX, anchorY), boxWidth, 0.6, 0, 'center');

    // Options
    const currentOptions = page.getCurrentOptions();
    for (let i = 0; i < currentOptions.length; i++) {
        const offsetY = boxHeight * (i + 1);
        drawOption(offsetY, currentOptions[i], page.getOptionIndex() === i);
    }
}

function create(newMenu: Menu) {
    page.setMenu(newMenu, () => {
        alt.clearInterval(interval);
        interval = undefined;
    });

    if (interval) {
        return;
    }

    interval = alt.setInterval(draw, 0);
}

function destroy() {
    page.destroy();
}

alt.on('crc-native-menu-create', create);
alt.on('crc-native-menu-destroy', destroy);
