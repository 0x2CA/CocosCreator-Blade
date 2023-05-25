export default class ScreenShot {

    private _targetNode: cc.Node = null;

    private _renderTexture: cc.RenderTexture = null;

    private _camera: cc.Camera = null;

    private _canvas: HTMLCanvasElement = null;

    public constructor(target: cc.Node) {
        // 目标
        this._targetNode = target;

        // 创建渲染纹理
        let gl = (cc.game as any)._renderContext;
        this._renderTexture = new cc.RenderTexture();
        this._renderTexture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);

        // 创建摄像机
        this._camera = target.addComponent(cc.Camera);
        this._camera.cullingMask = 0xffffffff;
        this._camera.targetTexture = this._renderTexture;
    }

    /**
     * 渲染
     */
    public render() {
        let size = this._targetNode.getContentSize();

        let width = size.width;
        let height = size.height;

        if (this._canvas == null) {
            //创建一个canvas
            this._canvas = document.createElement('canvas');
            this._canvas.width = width;
            this._canvas.height = height;
        } else {
            let ctx = this._canvas.getContext('2d');
            ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }

        let ctx = this._canvas.getContext('2d');
        this._camera.render();//相机绘制
        let pixels = new Uint8Array(size.width * size.height * 4);
        let x = this._renderTexture.width / 2 - size.width / 2;
        let y = this._renderTexture.height / 2 - size.height / 2;
        let w = size.width;
        let h = size.height;
        let data = this._renderTexture.readPixels(pixels, x, y, w, h);

        // 手动补充透明像素的像素信息
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let w = i * height * 4 + j * 4 + 3;
                data[w] = 255
            }
        }

        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }

            ctx.putImageData(imageData, 0, row);
        }
    }

    /**
     * 获取DataURL
     * @returns
     */
    public getDataURL() {
        if (this._canvas != null) {
            return this._canvas.toDataURL("image/png");
        }
    }

    /**
     * 获取渲染纹理
     * @returns
     */
    public getTexture2D() {
        if (this._canvas != null) {

            let img = document.createElement("img");
            img.src = this.getDataURL();

            let texture2D = new cc.Texture2D();
            texture2D.initWithElement(img);

            return texture2D;
        }
    }

    /**
     * 获取图片精灵
     * @returns
     */
    public getSpriteFrame() {
        if (this._canvas != null) {

            let spriteFrame = new cc.SpriteFrame();
            spriteFrame.setTexture(this.getTexture2D());

            return spriteFrame;
        }
    }

    /**
     * 获取画布
     * @returns
     */
    public getCanvas() {
        return this._canvas;
    }

    /**
     * 销毁
     */
    public dispose() {
        this._camera.destroy();
        this._camera = null;
        this._renderTexture.destroy();
        this._renderTexture = null;
    }

}
