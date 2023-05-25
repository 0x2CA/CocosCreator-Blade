import PlatformConfigBase from "./PlatformConfigBase";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-03-15
 * @最后编辑者: 0x2CA
 * @描述:
 */
export default abstract class OppoConfigBase extends PlatformConfigBase {
    public pkgName: string = "";
    public videoId: string = "";
    public bannerId: string = "";
    public nativeId: string = "";
}