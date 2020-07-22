

import IService from "../../Blade/Interfaces/IService";


/**
 * 服务装饰器
 * @param serviceName 
 */
export default function Service(serviceName: string) {
    return function (target: typeof IService) {
        Reflect.defineProperty(target.prototype, "alias", {
            value: serviceName
        })
    }
}
