var path = require("path");
var shelljs = require("shelljs");

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    var nsDistPath = process.env.NSDIST || './deps/NativeScript/bin/dist';

    var modulesDestPath = "app/tns_modules";
    var typingsDestPath = "typings/nativescript";

    var androidAvd = grunt.option('avd') || "nexus"
    var genyDevice = grunt.option('geny') || "nexus7"
    var iOSDevice = grunt.option('device') || "nexus"

    grunt.initConfig({
        ts: {
            build: {
                src: [
                    'app/**/*.ts',
                    'typings/tsd.d.ts',
                ],
                options: {
                    fast: "never",

                    // Resolve non-relative modules like "ui/styling/style"
                    // based on the project root (not on node_modules which
                    // is the typescript 1.6+ default)
                    additionalFlags: '--moduleResolution classic',

                    module: "commonjs",
                    target: "es5",
                    sourceMap: true,
                    removeComments: false,
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    compiler: "node_modules/typescript/bin/tsc",
                    noEmitOnError: true
                },
            },
        },
        copy: {
        },
        clean: {
            app: {
                cwd: 'app',
                expand: true,
                src: [
                    '**/*.js',
                    '**/*.map',
                ]
            },
            nodeModulesGz: {
                // HACK: Work around a {N} CLI bug  that prevents you from using
                // NPM packages containing *.gz files.
                // https://github.com/NativeScript/nativescript-cli/issues/393
                expand: true,
                cwd: './node_modules',
                src: [
                    '**/*.gz',
                ]
            },
        },
        shell: {
            depNSInit: {
                command: [
                    'npm install',
                    'grunt --no-runtslint',
                ].join('&&'),
                options: {
                    execOptions: {
                        cwd: 'deps/NativeScript',
                    }
                }
            },
            localInstallModules: {
                command: "npm install \"<%= nsPackagePath %>\""
            },
            emulateGeny: {
                command: "tns emulate android --geny '" + genyDevice +"'"
            },
            emulateAndroid: {
                command: "tns emulate android --avd '" + androidAvd +"'"
            },
            emulateIOS: {
                command: "tns emulate ios --device '" + iOSDevice +"'"
            }
        }
    });

    grunt.registerTask("updateModules", [
        "getNSPackage",
        "shell:localInstallModules",
    ]);

    grunt.registerTask("removeTraceurPackage", function() {
        var traceurPath = 'node_modules/angular2/node_modules/traceur';
        if (grunt.file.isDir(traceurPath))
            grunt.file.delete(traceurPath);
    });

    grunt.registerTask("getNSPackage", function() {
        var packageFiles = grunt.file.expand({
            cwd: nsDistPath
        },[
            'tns-core-modules*.tgz'
        ]);
        var nsPackagePath = path.join(nsDistPath, packageFiles[0]);
        grunt.config('nsPackagePath', nsPackagePath);
    });

    grunt.registerTask("clean-tsd-dts", function() {
        //remove broken angular dts files from tsd.d.ts
        //using the ones in the typings dir
        shelljs.sed('-i', /.*node_modules[\/\\]angular2.*\n/g, '', 'typings/tsd.d.ts');
    });

    grunt.registerTask("app", [
        "clean-tsd-dts",
        "ts:build",
    ]);

    grunt.registerTask("prepare", [
        "shell:depNSInit",
        "updateModules",
        "clean:nodeModulesGz",
    ]);

    grunt.registerTask("app-full", [
        "clean:app",
        "app",
    ]);

    grunt.registerTask("run-android", ["app", "shell:emulateAndroid"])
    grunt.registerTask("run-ios", ["app", "shell:emulateIOS"])
}
