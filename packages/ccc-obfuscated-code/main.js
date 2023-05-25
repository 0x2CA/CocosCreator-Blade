const Fs = require('fs');
const Path = require('path');
const JavascriptObfuscator = require('javascript-obfuscator');

const configFileDir = 'local/';
const configFileName = 'ccc-obfuscated-code.json';

const defaultConfig = {
  auto: false,
  // extraFiles: [],
  // useAbsPath: false,
  preset: 'lower',
  options: {}
};

const presetFileUrl = 'packages://ccc-obfuscated-code/preset.json';
let presets = null;

module.exports = {

  load() {
    Editor.Builder.on('build-start', this.onBuildStart);
    Editor.Builder.on('before-change-files', this.onBeforeChangeFiles);
  },

  unload() {
    Editor.Builder.removeListener('build-start', this.onBuildStart);
    Editor.Builder.removeListener('before-change-files', this.onBeforeChangeFiles);
  },

  messages: {

    'open-panel'() {
      Editor.Panel.open('ccc-obfuscated-code');
    },

    // TODO
    // 'open-panel-do'() {
    //   Editor.Panel.open('ccc-obfuscated-code-do');
    // },

    'save-config'(event, config) {
      const configFilePath = saveConfig(config);
      Editor.log('[CC]', '保存配置', configFilePath);
      event.reply(null, true);
    },

    'read-config'(event) {
      const config = getConfig();
      if (config) Editor.log('[CC]', '读取本地配置');
      else Editor.log('[CC]', '未找到本地配置文件');
      event.reply(null, config);
    },

    'get-preset'(event, name) {
      Editor.log('[CC]', '读取预设', name);
      let preset = getPreset(name);
      if (preset) {
        event.reply(null, preset);
      } else {
        Editor.warn('[CC]', '预设文件已丢失');
        Editor.warn('[CC]', '预设文件下载地址 https://gitee.com/ifaswind/ccc-obfuscated-code/blob/master/preset.json');
        event.reply(null, {});
      }
    }

  },

  /**
   * 
   * @param {BuildOptions} options 
   * @param {Function} callback 
   */
  onBuildStart(options, callback) {
    const config = getConfig();
    if (config.auto) Editor.log('[CC]', '将在项目构建完成后自动混淆代码');

    callback();
  },

  /**
   * 
   * @param {BuildOptions} options 
   * @param {Function} callback 
   */
  onBeforeChangeFiles(options, callback) {
    const config = getConfig();
    if (config.auto) {
      Editor.log('[CC]', '正在混淆代码');
      // Cocos Creator 2.4 以下
      const srcPath = Path.join(options.dest, 'src', 'project.js');
      if (Fs.existsSync(srcPath)) {
        obfuscate(srcPath, config.options);
        Editor.log('[CC]', '已混淆代码文件', srcPath);
      }
      // Cocos Creator 2.4 以上
      const list = ['assets', 'subpackages'];
      for (let i = 0; i < list.length; i++) {
        const dirPath = Path.join(options.dest, list[i]);
        if (!Fs.existsSync(dirPath)) continue;
        const names = Fs.readdirSync(dirPath);
        for (const name of names) {
          if (list[i] === 'assets' && (name === 'internal' || name === 'resources')) continue;
          const filePath = Path.join(dirPath, name, 'index.js');
          if (Fs.existsSync(filePath)) {
            obfuscate(filePath, config.options);
            Editor.log('[CC]', '已混淆代码文件', filePath);
          }
        }
      }
      // 额外需要混淆的文件
      // for (let i = 0; i < config.extraFiles.length; i++) {
      //   if (config.extraFiles[i] === '') continue;
      //   const path = config.useAbsPath ? config.extraFiles[i] : Path.join(options.dest, config.extraFiles[i]);
      //   if (Fs.existsSync(path)) {
      //     obfuscate(path, config.options);
      //     Editor.log('[CC]', '已额外混淆文件', path);
      //   } else {
      //     Editor.warn('[CC]', '需额外混淆文件不存在', path);
      //   }
      // }
      Editor.log('[CC]', '混淆已完成');
    }

    callback();
  },

}

/**
 * 保存配置
 * @param {object} config 
 */
function saveConfig(config) {
  // 查找目录
  const projectPath = Editor.Project.path || Editor.projectPath;
  const configDirPath = Path.join(projectPath, configFileDir);
  if (!Fs.existsSync(configDirPath)) Fs.mkdirSync(configDirPath);
  const configFilePath = Path.join(projectPath, configFileDir, configFileName);
  // 读取本地配置
  let object = {};
  if (Fs.existsSync(configFilePath)) {
    object = JSON.parse(Fs.readFileSync(configFilePath, 'utf8'));
  }
  // 写入配置
  for (const key in config) { object[key] = config[key]; }
  Fs.writeFileSync(configFilePath, JSON.stringify(object, null, 2));
  return configFilePath;
}

/**
 * 读取配置
 */
function getConfig() {
  const projectPath = Editor.Project.path || Editor.projectPath;
  const configFilePath = Path.join(projectPath, configFileDir, configFileName);
  let config = null;
  if (Fs.existsSync(configFilePath)) {
    config = JSON.parse(Fs.readFileSync(configFilePath, 'utf8'));
  }
  if (!config) {
    config = JSON.parse(JSON.stringify(defaultConfig));
    config.options = getPreset('off');
    if (config.preset !== 'off') {
      const preset = getPreset(config.preset);
      for (const key in preset) { config.options[key] = preset[key]; }
    }
  }
  return config;
}

/**
 * 读取预设参数
 * @param {string} type 预设名 
 */
function getPreset(type) {
  if (presets) return presets[type];

  const presetFilePath = Editor.url(presetFileUrl);
  if (Fs.existsSync(presetFilePath)) {
    presets = JSON.parse(Fs.readFileSync(presetFilePath, 'utf8'));
    return presets[type];
  }

  return null;
}

/**
 * 混淆
 * @param {string} filePath 文件路径
 * @param {ObfuscatorOptions} options 混淆参数
 */
function obfuscate(filePath, options) {
  const sourceCode = Fs.readFileSync(filePath, 'utf8');
  const obfuscationResult = JavascriptObfuscator.obfuscate(sourceCode, options);
  const obfuscatedCode = obfuscationResult.getObfuscatedCode();
  Fs.writeFileSync(filePath, obfuscatedCode);
}
