# NativeScript + AngularJS TodoMVC example

This is a sample project implementing the famous TodoMVC example using NativeScript and AngularJS 2

# Prepare project

You need to prepare the NativeScript distribution in the parent folder by executing all steps in the parent README:

(All run from the parent folder once.)

1. Update git submodules: `git submodule update --init --recursive`.
2. `npm install`
3. `grunt prepare`
4. Update TypeScript declarations: `tsd link`

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
