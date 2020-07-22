/**
 * 运动助手
 */
class SportHelper {
    static getSport(node: cc.Node, gravity: cc.Vec3 = new cc.Vec3(0, -230, 0), velocity: cc.Vec3 = new cc.Vec3(0, 0, 0), damping: cc.Vec3 = new cc.Vec3(0, 0, 0)) {
        return new SportHelper.Sport(node, gravity, velocity, damping);
    }
}

namespace SportHelper {
    export class Sport {
        private info: SportInfo
        private node: cc.Node

        constructor(node: cc.Node, gravity: cc.Vec3 = new cc.Vec3(0, -230, 0), velocity: cc.Vec3 = new cc.Vec3(0, 0, 0), damping: cc.Vec3 = new cc.Vec3(0, 0, 0)) {
            let a = gravity.div(PTM_RATIO)
            let v = velocity.div(PTM_RATIO)
            let location = new cc.Vec3(node.x, node.y, node.z)
            damping = new cc.Vec3(damping.x, damping.y, damping.z)
            let info: SportInfo = { a, v, location, damping }
            this.node = node
            this.info = info;
        }

        /**
         * X方向运动更新
         * @param info 
         * @param dt 
         */
        private updateX(info: SportInfo, dt: number) {
            // 计算移动距离
            info.location.x += this.s(info.v.x, info.a.x, dt) * PTM_RATIO;
            // 计算速度阻尼
            let damping = -info.damping.x * info.v.x * dt;
            // 计算先在速度
            info.v.x = this.v(info.v.x, info.a.x, dt) + damping;
        }

        /**
         * Y方向运动更新
         * @param info
         * @param dt
         */
        private updateY(info: SportInfo, dt: number) {
            // 计算移动距离
            info.location.y += this.s(info.v.y, info.a.y, dt) * PTM_RATIO;
            // 计算速度阻尼
            let damping = -info.damping.y * info.v.y * dt;
            // 计算先在速度
            info.v.y = this.v(info.v.y, info.a.y, dt) + damping;
        }

        /**
         * Z方向运动更新
         * @param info
         * @param dt
         */
        private updateZ(info: SportInfo, dt: number) {
            // 计算移动距离
            info.location.z += this.s(info.v.z, info.a.z, dt) * PTM_RATIO;
            // 计算速度阻尼
            let damping = -info.damping.z * info.v.z * dt;
            // 计算先在速度
            info.v.z = this.v(info.v.z, info.a.z, dt) + damping;
        }

        /**
         * 更新所有方向位置
         * @param info 
         * @param dt 
         */
        private updatePostion(info: SportInfo, dt: number) {
            this.updateX(info, dt);
            this.updateY(info, dt);
            this.updateZ(info, dt);
        }

        /**
         * 获取预测位置
         */
        public getPredictLocation(dt: number) {
            let newInfo: SportInfo = {
                a: this.info.a.div(1),
                v: this.info.v.div(1),
                damping: this.info.damping.div(1),
                location: this.info.location.div(1)
            }
            this.updatePostion(newInfo, dt);
            return newInfo.location;
        }

        /**
         * 更新节点坐标
         * @param dt 
         */
        public updateNodeLocation(dt: number) {
            this.updatePostion(this.info, dt);
            this.node.x = this.info.location.x;
            this.node.y = this.info.location.y;
            this.node.z = this.info.location.z;
        }

        /**
         * 速度公式
         * @param v0 
         * @param a 
         * @param t 
         */
        private v(v0, a, t) {
            return v0 + a * t;
        }

        /**
         * 距离公式
         * @param v0 
         * @param a 
         * @param t 
         */
        private s(v0, a, t) {
            return v0 * t + (a * t * t) / 2;
        }
    }

    export interface SportInfo {
        //米/秒^2
        a: cc.Vec3
        //米/秒
        v: cc.Vec3
        //位置
        location: cc.Vec3
        //阻尼
        damping: cc.Vec3;
    }

    export const PTM_RATIO: number = 32
}

export default SportHelper