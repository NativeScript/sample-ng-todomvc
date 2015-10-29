# NativeScript + AngularJS TodoMVC example

This is a sample project implementing the famous TodoMVC example using NativeScript and AngularJS 2

# Prerequisites

You need an unofficial `tns` build that supports npm scoped packages. Install it globally by running:

```bash
$ npm install -g http://sh.deshev.com/npm/nativescript-1.5.0-angular2.tgz
```

# Prepare project

You need to prepare the NativeScript distribution in the parent folder by executing all steps in the parent README:

(All run from the parent folder once.)

1. Update git submodules: `git submodule update --init --recursive`.
2. `npm install`
3. `grunt prepare`

# Add platforms(s)

1. `tns platform add android`
2. `tns platform add ios`

# Compile

```sh
grunt app
```

# Run in the emulator

Android SDK emulated device:

```sh
tns emulate android --avd my-nexus7-device
```

or Genymotion

```sh
tns emulate android --geny my-nexus7-device
```
