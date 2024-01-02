/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-05-05
 * @最后编辑者: 0x2CA
 * @描述: 游戏配置
 */
const GameConfig = {

    frameRate: 60,

    viewCacheCapacity: 16,

    serverListUrl: "http://192.168.5.52:88/sk1/wx.json",

    defaultSocketName: "MainSocket",

    fullTempView: null,

    smallTempView: null,

    isAutoFullCheckOcclusion: true,

    preloadModels: [],

    preloadAssets: [],

    defaultButtonAudio: "",

    // 是否使用sdk
    isUseSDK: true,

    //送审客户端版本
    specialVersion: "1.0.0",

    //线上版本
    version: "1.0.0",

    //GM
    isGM: false,

    //是否配置表压缩
    isZipConfigs: false,

    // socket 是否打印消息
    isSocketMessageLog: true,

    // 是否隐藏VConsole
    isHideVConsole: true
};



export default GameConfig;
