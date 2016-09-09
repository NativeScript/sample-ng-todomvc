// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { MainPage } from "./main-page";
import { Checkbox } from './checkbox';

@NgModule({
    declarations: [MainPage, Checkbox],
    bootstrap: [MainPage],
    imports: [NativeScriptModule],
    exports: [Checkbox],
})
class AppComponentModule { }

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
