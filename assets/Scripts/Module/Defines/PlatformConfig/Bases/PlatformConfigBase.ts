/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-03-15
 * @最后编辑者: 0x2CA
 * @描述:
 */
export default abstract class PlatformConfigBase {
    public appId: string = "";
    public gameId: number = -1;
    public channelId: number = -1;
    public logoIcon: string = "";
    public copyright: string = "";
    public qrCodeIcon: string = "";
}