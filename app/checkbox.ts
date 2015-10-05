import {Component, View} from "angular2/angular2";

@Component({
    selector: "Checkbox",
    properties: ['checked : checked']
})
@View({
    template: `<Button
                width="50px"
                [text]="checked ? '[X]' : '[ ]' "
                dock="left"></Button>
        `
})
export class Checkbox {
    checked: boolean;

    constructor(checked: boolean = false) {
        this.checked = checked;

        this.checked = true;
    }
}

