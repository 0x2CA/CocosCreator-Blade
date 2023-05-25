const Fs = require('fs');

Editor.Panel.extend({

  style: Fs.readFileSync(Editor.url('packages://ccc-obfuscated-code/panel/index.css'), 'utf8'),

  template: Fs.readFileSync(Editor.url('packages://ccc-obfuscated-code/panel/index.html'), 'utf8'),

  ready() {
    const app = new window.Vue({
      el: this.shadowRoot,

      data() {
        return {
          isSaving: false,

          auto: false,
          // extraFiles: '',
          // useAbsPath: false,
          preset: 'low',
          options: {
            compact: true,
            controlFlowFlattening: false,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: false,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: false,
            domainLock: '',
            identifierNamesGenerator: 'hexadecimal',
            identifiersDictionary: '',
            identifiersPrefix: '',
            inputFileName: '',
            log: false,
            renameGlobals: false,
            reservedNames: '',
            reservedStrings: '',
            rotateStringArray: false,
            seed: 0,
            selfDefending: false,
            shuffleStringArray: false,
            sourceMap: false,
            sourceMapBaseUrl: '',
            sourceMapFileName: '',
            sourceMapMode: 'separate',
            splitStrings: false,
            splitStringsChunkLength: 10,
            stringArray: false,
            stringArrayEncoding: false,
            stringArrayThreshold: 0.8,
            target: 'browser',
            transformObjectKeys: false,
            unicodeEscapeSequence: false
          }
        }
      },

      watch: {
        options: {
          handler(value) {
            if (value.deadCodeInjection) app.options.stringArray = true;
          },
          deep: true
        }
      },

      methods: {
        /**
         * 保存配置
         */
        saveConfig() {
          if (this.isSaving) return;
          this.isSaving = true;

          let config = {
            auto: this.auto,
            // useAbsPath: this.useAbsPath,
            preset: this.preset,
            options: {}
          };
          for (let key in this.options) {
            switch (key) {
              // case 'extraFiles':
              case 'domainLock': case 'identifiersDictionary': case 'reservedNames': case 'reservedStrings':
                config.options[key] = this.options[key] == '' ? [] : this.options[key].split(',');
                break;
              case 'stringArrayEncoding':
                config.options[key] = this.options.stringArrayEncoding == 'true' ||
                  this.options.stringArrayEncoding == 'false' ?
                  Boolean(this.options.stringArrayEncoding) :
                  this.options.stringArrayEncoding;
                break;
              default:
                config.options[key] = this.options[key];
                break;
            }
          }

          Editor.Ipc.sendToMain('ccc-obfuscated-code:save-config', config, (err, msg) => {
            this.isSaving = false;
          });
        },

        /**
         * 读取配置
         */
        readConfig() {
          Editor.Ipc.sendToMain('ccc-obfuscated-code:read-config', (err, config) => {
            if (err) return;
            this.auto = config.auto;
            // this.extraFiles = config.extraFiles.join(',');
            // this.useAbsPath = config.useAbsPath;
            this.preset = config.preset;
            for (let key in config.options) {
              this.options[key] = Array.isArray(config.options[key]) ? config.options[key].join(',') : config.options[key];
            }
          });
        },

        /**
         * 读取预设
         */
        getPreset() {
          Editor.Ipc.sendToMain('ccc-obfuscated-code:get-preset', this.preset, (err, options) => {
            for (let key in options) {
              this.options[key] = options[key];
            }
          });
        }

      }
    });

    app.readConfig();

  }

});