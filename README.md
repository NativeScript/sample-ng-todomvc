# NativeScript + AngularJS TodoMVC example

This is a sample project implementing the famous TodoMVC example using NativeScript and AngularJS 2

# Install NativeScript 1.3 prerequisites

The sample uses a pre-release version of NativeScript that you need to download and install from an unofficial location. Go to [this Google Drive shared folder](https://drive.google.com/folderview?id=0B2NbnkQbtc4MY0NINlNKdWtHZms&usp=sharing) and download the three files to a local `1.3` folder:

* nativescript-1.3.0.tgz
* tns-android-1.3.0.tgz
* tns-ios-1.3.0-2015.9.8.1.tgz

1. Install the `tns` command line tool **locally**: `npm install 1.3/nativescript-1.3.0.tgz`
2. Alias `n` to prefer local `node_modules` binaries: `alias n='PATH=$(npm bin):$PATH'`. Test it with `n tns --version`, and make sure you get back `1.3.0`.

# Prepare project

You need to prepare the NativeScript distribution in the parent folder by executing all steps in the parent README:

(All run from the parent folder once.)

1. Update git submodules: `git submodule update --init`.
2. Install the `nativescript` NPM module. See above for instructions about installing the pre-release 1.3 build.
3. `npm install`
4. `grunt prepare`
5. Fetch TypeScript declarations: `tsd reinstall && tsd link`

# Install runtimes

1. `n tns platform add android --frameworkPath 1.3/tns-android-1.3.0.tgz`
1. `n tns platform add ios --frameworkPath 1.3/tns-ios-1.3.0.tgz`

# Compile

```sh
grunt app-full
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
