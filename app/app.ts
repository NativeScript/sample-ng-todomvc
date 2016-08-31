// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {platformNativeScriptDynamic, NativeScriptModule} from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import {MainPage} from "./main-page";

@NgModule({
    declarations: [MainPage],
    bootstrap: [MainPage],
    imports: [NativeScriptModule],
})
class AppComponentModule { }

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);