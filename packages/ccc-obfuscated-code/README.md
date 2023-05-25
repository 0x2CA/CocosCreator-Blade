# 代码混淆工具

## 介绍

[Cocos Creator 编辑器插件] 混淆代码工具，支持项目构建后自动混淆代码以及主动混淆目标文件（TODO）。

- 混淆引擎：[javascript-obfuscator@0.28.0](https://github.com/javascript-obfuscator/javascript-obfuscator)

如果此项目对你有帮助，请不要忘记 [![star](https://gitee.com/ifaswind/ccc-obfuscated-code/badge/star.svg?theme=dark)](https://gitee.com/ifaswind/ccc-obfuscated-code/stargazers)

如有使用上的问题，可以在 gitee 上提 issue 或者添加我的微信 `im_chenpipi` 并留言。



## 截图

![screenshot](https://gitee.com/ifaswind/image-storage/raw/master/repositories/ccc-obfuscated-code/screenshot.png)



## 环境

平台：Windows、Mac

引擎：Cocos Creator 2.x.x（理论上通用）



## 说明

1. 将插件文件夹 `ccc-obfuscated-code` 放置在 `${用户目录}/.CocosCreator/packages` 目录下即可

3. 本插件默认禁用，需自行启用

2. 点击顶部菜单栏的 **[ 扩展 --> 代码混淆工具 ]** 打开插件配置面板

4. 配置文件存放路径：`${项目目录}/local/ccc-obfuscated-code.json`



## 参数说明

- Javascript Obfuscator 文档：[传送门](https://github.com/javascript-obfuscator/javascript-obfuscator/blob/master/README.md)

- 以下均为我人工翻译的内容，尽我所能翻译得通俗易懂了。



**compact**

类型：`boolean` | 默认值：`true`

> 将代码压缩至一行。



**controlFlowFlattening**

类型：`boolean` | 默认值：`false`

> 注意：该选项将严重影响性能，影响高达 1.5 倍。使用`controlFlowFlatteningThreshold`选项来控制转换概率。
>
> 开启代码控制流扁平化。控制流扁平化会转换源代码的结构，阻碍程序的阅读理解。
>
> 皮皮：就是将代码逻辑扁平化了。



**controlFlowFlatteningThreshold**

类型：`number` | 默认值：`0.75` | 最小值：`0` | 最大值：`1`

> 应用控制流扁平化的概率。
>
> 这个设置对于代码体积大的情况非常有用，因为大量的控制流转换会降低代码的运行速度并且增加代码的体积。
>
> `controlFlowFlatteningThreshold: 0`等同于`controlFlowFlattening: false`。



**deadCodeInjection**

类型：`boolean` | 默认值：`false`

> 注意：该选项会急剧增加代码的体积（甚至高达 200%），如果不在乎代码体积可以使用该选项。可以使用`deadCodeInjectionThreshold`来设置添加无用代码的比例。
>
> 注意：开启这个选项会强制开启 `stringArray`选项。
>
> 开启这个选项时会向源代码随机添加无用的代码。
>
> 皮皮：就是往代码里面随机加一些没有用的代码，迷惑敌人~



**deadCodeInjectionThreshold**

类型：`number` | 默认值：`0.4` | 最小值：`0` | 最大值：`1`

> 设置`deadCodeInjection`的比例。



**debugProtection**

类型：`boolean` | 默认值：`false`

> 注意：打开 DevTools 可能会让浏览器卡住。
>
> 开启这个选项之后 DevTools 的 console 栏基本上就不能用了（基于 WebKit 的浏览器和火狐都通杀）。
>
> 皮皮：开启该选项之后开着 DevTools 就进不了游戏，但是进游戏之后再打开 DevTools 是没问题的。如果想要完全没法使用 DevTools ，需要配合 debugProtectionInterval 一起使用。



**debugProtectionInterval**

类型：`boolean`| 默认值：`false`

> 注意：会让浏览器卡住！后果自负。
>
> 开启之后，会让调试模式定期聚焦到 Console 栏，让 DevTools 的其他功能也没法用。这个选项需要开启了`debugProtection`才有效。
>
> 皮皮：让 DevTools 一直没法用！



**disableConsoleOutput**

类型：`boolean`| 默认值：`false`

> 禁用`console.log`、`console.info`、`console.error`、`console.warn`、`console.debug`、`console.exception`和`console.trace`，原理是用空的函数替换掉这些函数。



**domainLock**

类型：`string[]` | 默认值：`[]`

> 注意：当`target: node`时这个选项无效
>
> 让程序只能运行在特定的域名或子域名下。这让那些只是复制粘贴代码的人（CV工程师~）更难受了。
>
> 可以同时锁定多个域名。举个栗子，要让程序只能运行在 www.example.com 就添加`www.example.com`。要运行在 example.com 的所有子域名下的话就用`.example.com`。



**exclude**

类型：`string[]` | 默认值：`[]`

> 需要在混淆过程中排除的文件名。



**identifierNamesGenerator**

类型：`string` | 默认值：`'hexadecimal'`

> 设置标识符生成器。
>
> 可用值：
>
> - `dictionary`：从`identifiersDictionary`列表中获取标识符
> - `hexadecimal`：和`_0xabc123`类似的标识符
> - `mangled`：和`a`、`b`、`c`类似的短标识符



**identifiersDictionary**

类型：`string[]` | 默认值：`[]`

> 设置`identifierNamesGenerator`的标识符字典。



**identifiersPrefix**

类型：`string` | 默认值：`''`

> 设置全局标识符的前缀。
>
> 当你需要混淆多个文件的时候使用这个。开启后可以避免多个文件之间的全局标识符冲突。每个文件的前缀都应该不一样。



**inputFileName**

类型：`string` | 默认值：`''`

> 设置源代码的输入文件名字。这个名字将用于内部生成 source map 。



**log**

类型：`boolean`| 默认值：`false`

> 打印日志到控制台。



**renameGlobals**

类型：`boolean`| 默认值：`false`

> 注意：可能会让你的代码爆炸。
>
> 混淆全局变量和函数。



**reservedNames**

类型：`string[]` | 默认值：`[]`

> 保留标识符，让其不被混淆，支持正则表达式。



**reservedStrings**

类型：`string[]` | 默认值：`[]`

> 保留字符串，让其不被混淆，支持正则表达式。



**rotateStringArray**

类型：`boolean`| 默认值：`true`

> 注意：要开启`stringArray`才有用
>
> 根据一个固定和随机（混淆时生成）的位置变换`stringArray`。这会让人难以匹配字符串到他们原来的位置。
>
> 皮皮：随机变换字符串列表中元素的位置。



**seed**

类型：`string|number` | 默认值：`0`

> 设置随机种子。
>
> 当种子为`0`时，随机生成器就不会使用随机种子。



**selfDefending**

类型：`boolean`| 默认值：`false`

> 注意：开启这个选项之后不要对混淆后的代码进行任何更改，因为任何更改（例如丑化代码）都会触发自我保护导致代码无法运行。
>
> 注意：开启这个选项会强制将`compact`设为`true`
>
> 开启这个选项之后就不能对代码进行格式化或者重命名变量。任何人尝试美化混淆后的代码，都会让代码无法运行，使得代码难以理解和更改。



**shuffleStringArray**

类型：`boolean`| 默认值：`true`

> 注意：要开启`stringArray`才有用
>
> 对`stringArray`的内容随机洗牌。
>
> 皮皮：对字符串列表进行随机洗牌打乱。



**sourceMap**

类型：`boolean`| 默认值：`false`

> 生成混淆后的代码的 source map 。
>
> Source maps 对于调试混淆后的代码很有帮助。如果你想要或者需要对产品进行调试，可以上传单独的 source map 文件到一个安全的地方，然后引用到浏览器中。



**sourceMapBaseUrl**

类型：`string` | 默认值：`''`

> 设置当`sourceMapMode: 'separate'`时的 source map 导入 url 的 BaseUrl。



**sourceMapFileName**

类型：`string` | 默认值：`''`

> 设置当`sourceMapMode: 'separate'`时的 source map 输出名称。



**sourceMapMode**

类型：`string` | 默认值：`'separate'`

> 指定 source map 的生成模式。
>
> - `inline` - 发送包含 source map 的单个文件而不是生成单独的文件。
> - `separate` - 生成与 source map 对应的 '.map' 文件。



**splitStrings**

类型：`boolean`| 默认值：`false`

> 根据`splitStringsChunkLength`将字符串分成指定长度的块。



**splitStringsChunkLength**

类型：`number` | 默认值：`10`

> 设置`splitStrings`的块长度。



**stringArray**

类型：`boolean`| 默认值：`true`

> 移除并用指定的列表替换字符串。举个栗子，`var m = "Hello World";`中的字符串`Hello World`将会被替换，语句会变成类似`var m = _0x12c456[0x1];`的形式。



**stringArrayEncoding**

类型：`boolean|string`| 默认值：`false`

> 注意：要开启`stringArray`才有用
>
> 这个选项会降低脚本的速度。
>
> 用`base64`或者`rc4`来加密`stringArray`中的字符串，并且插入特定的代码用来运行时解密。
>
> 可用值：
>
> - `true`（`boolean`）：用`base64`加密`stringArray`字符串
> - `false`（`boolean`）：不加密`stringArray`字符串
> - `base64`（`string`）：用`base64`加密`stringArray`字符串
> - `rc4`（`string`）：用`rc4`加密`stringArray`字符串。比`base64`慢大概 30 - 50% ，但是让人更难获取初始值。



**stringArrayThreshold**

类型：`number` | 默认值：`0.75` | 最小值：`0` | 最大值：`1`

> 注意：要开启`stringArray`才有用
>
> 你可以设置这个来调整字符串插入`stringArray`的概率。
>
> 这个设置对于代码体积大的情况特别有用。
>
> `stringArrayThreshold: 0` 等同于 `stringArray: false`。



**target**

类型：`string` | 默认值：'browser'

> 允许你设置混淆后的代码的运行环境。
>
> 可用值：
>
> - `browser`；
> - `browser-no-eval`；
> - `node`。
>
> 目前`browser`和`node`的输出代码是完全一样的，但是某些特定的浏览器不能用`node`。`browser-no-eval`的输出代码没有使用`eval`。



**transformObjectKeys**

类型：`boolean`| 默认值：`false`

> 开启 Object 的 key 转换。
>
> 皮皮：将对象转换成多个复杂变量的组合（反正就是丑）。



**unicodeEscapeSequence**

类型：`boolean`| 默认值：`false`

> 开启或禁用字符串的 Unicode 转义序列。
>
> 开启该选项会大大增加代码的体积，同时字符串也不难被恢复。只建议代码体积小的情况下使用这个选项。
>
> 皮皮：将字符转为 Unicode 格式，看起来又长又臭，但是实际上很容易恢复。

### 预设

**高度混淆，性能很低**

性能比不混淆慢 50 - 100%

```
{
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: true,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    splitStrings: true,
    splitStringsChunkLength: '5',
    stringArray: true,
    stringArrayEncoding: 'rc4',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}
```

**中度混淆，性能均衡**

性能比不混淆慢 30 - 50%

```
{
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    splitStrings: true,
    splitStringsChunkLength: '10',
    stringArray: true,
    stringArrayEncoding: 'base64',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}
```

**轻度混淆，性能较高**

性能只会比不混淆稍微慢一点点

```
{
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    splitStrings: false,
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
}
```



## *License*

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.



---



# 菜鸟小栈

我是陈皮皮，这是我的个人公众号，专注但不仅限于游戏开发、前端和后端技术记录与分享。

每一篇原创都非常用心，你的关注就是我原创的动力！

> Input and output.

![](https://gitee.com/ifaswind/image-storage/raw/master/weixin/official-account.png)



## 交流群

皮皮创建了一个游戏开发交流群，供大家交流经验、问题求助等。

感兴趣的小伙伴可以添加我微信 `im_chenpipi` 并留言 `加群`。