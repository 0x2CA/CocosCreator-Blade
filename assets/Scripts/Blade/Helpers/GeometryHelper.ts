/**
 * 几何助手
 */
export default class GeometryHelper {

    /**
     * 点到直线最短距离的平方(垂直距离)
     * @param point 点
     * @param linePoint 直线点
     * @param lineDirection 直线朝向
     * @returns
     */
    public static distanceSqrByPoint2Line(point: cc.Vec2, linePoint: cc.Vec2, lineDirection: cc.Vec2) {
        // 求点在直线上的投影距离
        let projectionLength = cc.Vec2.dot(lineDirection, point.sub(linePoint));
        // 求得投影点
        let projectionPoint = linePoint.add(lineDirection.normalize().mul(projectionLength));
        // 求点到投影点距离
        return point.sub(projectionPoint).magSqr();
    }

    /**
     * 点到线段最短距离的平方(有垂直距离是垂直距离,没有为到两端点最短距离)
     * @param point 点
     * @param linePoint1 线段点1
     * @param linePoint2 线段点2
     */
    public static distanceSqrByPoint2LineSegment(point: cc.Vec2, linePoint1: cc.Vec2, linePoint2: cc.Vec2) {
        // 求线段方向
        let lineDirection = linePoint2.sub(linePoint1);
        // 求点在直线上的投影距离
        let projectionLength = cc.Vec2.dot(lineDirection, point.sub(linePoint1));
        //  求投影点在线段的比例因子K
        let k = projectionLength / lineDirection.magSqr();
        //  约束在线段内(0-1)
        k = (k < 0) ? 0 : ((k > 1) ? 1 : k);
        //  求的投射点
        let projectionPoint = linePoint1.add(lineDirection.mul(k));
        // 求点到投影点距离
        return point.sub(projectionPoint).magSqr();
    }

    /**
     * 点p是否在矩形之中(abcd为顺序或者逆序排序的点)
     * @param p 点P
     * @param a 矩形点A
     * @param b 矩形点B
     * @param c 矩形点C
     * @param d 矩形点D
     */
    public static isPointInRectangle(p: cc.Vec2, a: cc.Vec2, b: cc.Vec2, c: cc.Vec2, d: cc.Vec2) {
        let BA = a.sub(b);
        let BP = p.sub(b);
        let DC = c.sub(d);
        let DP = p.sub(d);

        let AD = d.sub(a);
        let AP = p.sub(a);
        let CB = b.sub(c);
        let CP = p.sub(c);

        // Z字形夹角应该都是相同顺序(顺时针或者逆时针)的锐角
        let isBetweenBA_DC = BA.cross(BP) * DC.cross(DP) >= 0;
        let isBetweenAD_CB = AD.cross(AP) * CB.cross(CP) >= 0;

        return isBetweenBA_DC && isBetweenAD_CB;
    }

    /**
     * 两圆是否相交
     * @param center1 圆1中心
     * @param radius1 圆1半径
     * @param center2 圆2中心
     * @param radius2 圆2半径
     */
    public static isCicleCicleIntersect(center1: cc.Vec2, radius1: number, center2: cc.Vec2, radius2: number) {
        return center2.sub(center1).magSqr() <= Math.pow((radius1 + radius2), 2);
    }

    /**
     * 圆和矩形是否相交(矩形abcd为顺序或者逆序排序的点)
     * @param center 圆中心
     * @param radius 圆半径
     * @param rectA 矩形点A
     * @param rectB 矩形点B
     * @param rectC 矩形点C
     * @param rectD 矩形点D
     * @returns
     */
    public static isCicleRectangleIntersect(center: cc.Vec2, radius: number, rectA: cc.Vec2, rectB: cc.Vec2, rectC: cc.Vec2, rectD: cc.Vec2) {
        if (GeometryHelper.isPointInRectangle(center, rectA, rectB, rectC, rectD)) {
            // 圆心在矩形内,说明相交
            return true;
        } else {
            // 圆心在矩形外,只要和任意一个边相交,即相交
            let radiusSqr = Math.pow(radius, 2);

            if (GeometryHelper.distanceSqrByPoint2LineSegment(center, rectA, rectB) <= radiusSqr) {
                return true;
            }

            if (GeometryHelper.distanceSqrByPoint2LineSegment(center, rectB, rectC) <= radiusSqr) {
                return true;
            }

            if (GeometryHelper.distanceSqrByPoint2LineSegment(center, rectC, rectD) <= radiusSqr) {
                return true;
            }

            if (GeometryHelper.distanceSqrByPoint2LineSegment(center, rectD, rectA) <= radiusSqr) {
                return true;
            }
        }

        return false;
    }

    /**
     * 获取向量和x正轴夹角(第一象限0-90,第二象限90-180,第三象限(-180)-(-90),第四象限(-90)-0)
     * @param direction 朝向
     * @returns
     */
    public static angleByDirection(direction: cc.Vec2) {
        let angle = Math.atan2(direction.y, direction.x);
        // 弧度转角度
        return angle * 180 / Math.PI
    }

    /**
     * 绕点旋转坐标
     * @param center 中心点
     * @param angle 角度
     * @param point 旋转点
     */
    public static rotatePoint(center: cc.Vec2, angle: number, point: cc.Vec2) {
        // 角度转弧度
        angle = angle * Math.PI / 180;
        // 向量
        let direction = point.sub(center);
        // 绕z轴旋转矩阵
        // rotate z mat
        // [
        //  cos, -sin, 0, 0
        //  sin, cos, 0, 0
        //  0, 0, 1, 0
        //  0, 0, 0, 1
        // ]
        let offsetX = Math.cos(angle) * direction.x - Math.sign(angle) * direction.y;
        let offsetY = -Math.sign(angle) * direction.x + Math.cos(angle) * direction.y;
        return new cc.Vec2(center.x + offsetX, center.y + offsetY);
    }

    /**
     *  是否圆与扇形相交
     * @param center 圆中心
     * @param radius 圆半径
     * @param sectorCenter 扇形中心
     * @param sectorDirection 扇形朝向
     * @param sectorTheta 扇形半角
     * @param sectorLength 扇形边长
     */
    public static isCicleSectorIntersect(center: cc.Vec2, radius: number, sectorCenter: cc.Vec2, sectorDirection: cc.Vec2, sectorTheta: number, sectorLength: number) {
        // 先扇形当圆形判断是否有可能相交
        if (GeometryHelper.isCicleCicleIntersect(center, radius, sectorCenter, sectorLength)) {
            //  圆心向量
            let direction = center.sub(sectorCenter);
            // 防止扇形朝向没有归一化
            sectorDirection = sectorDirection.normalize();
            //  圆心转换到扇形空间(扇形朝向为X正轴,逆时针90度为Y正轴);
            let sectorDirectionCounterClockwise90 = new cc.Vec2(-sectorDirection.y, sectorDirection.x);
            // 计算投影,转换空间
            let projectionX = cc.Vec2.dot(sectorDirection, direction);
            let projectionY = cc.Vec2.dot(sectorDirectionCounterClockwise90, direction);

            // 因为扇形对称原因,所以y<0情况和y>=0情况一样
            projectionY = Math.abs(projectionY);

            // 扇形空间下的圆中心坐标
            let projectionPoint = new cc.Vec2(projectionX, projectionY);

            // 在满足相交距离情况下,如果扇形空间下的圆中心与X正轴夹角小于扇形半角说明相交
            if (GeometryHelper.angleByDirection(projectionPoint) <= sectorTheta) {
                return true;
            }

            // 角度转弧度
            sectorTheta = sectorTheta * Math.PI / 180;

            // 判断左线段是否相交,扇形空间圆心到直线距离是否小于圆半径
            let linePoint1 = new cc.Vec2(Math.cos(sectorTheta), Math.sin(sectorTheta)).mul(sectorLength);
            let linePoint2 = cc.Vec2.ZERO;
            return GeometryHelper.distanceSqrByPoint2LineSegment(projectionPoint, linePoint1, linePoint2) <= Math.pow(radius, 2);
        }

        return false;
    }

    /**
     *  点是否在圆形中
     * @param point 点
     * @param center 圆心
     * @param radius 圆半径
     * @returns
     */
    public static isPointInCicle(point: cc.Vec2, center: cc.Vec2, radius: number) {
        return point.sub(center).magSqr() <= Math.pow(radius, 2);
    }

    /**
     *  点是否在扇形中
     * @param point 点
     * @param center 扇形中心
     * @param direction 扇形朝向
     * @param theta 扇形半角
     * @param length 扇形边长
     * @returns
     */
    public static isPointInSector(point: cc.Vec2, center: cc.Vec2, direction: cc.Vec2, theta: number, length: number) {
        //  先扇形当圆形判断是否有可能相交
        if (GeometryHelper.isPointInCicle(point, center, length)) {
            // 防止扇形朝向没有归一化
            direction = direction.normalize();
            // 点向量
            let pointDirection = point.sub(center).normalize();
            // 计算点向量和方向向量夹角
            let angle = Math.acos(cc.Vec2.dot(direction, pointDirection));
            // 弧度转角度
            angle = angle * 180 / Math.PI
            //  判断是否在角度范围内
            if (Math.abs(angle) <= theta) {
                return true;
            }
        }

        return false;
    }

    /**
     * 获取向量法线(逆时针90度)
     * @param direction 向量
     * @returns
     */
    public static normalByDirection(direction: cc.Vec2) {
        // 同一逆时针90度求的法线
        return GeometryHelper.rotatePoint(cc.Vec2.ZERO, -90, direction);
    }

    /**
     * 是否轴重叠
     * @param axis
     * @param points1
     * @param points2
     * @returns
     */
    public static isAxisOverlapping(axis: cc.Vec2, points1: cc.Vec2[], points2: cc.Vec2[]) {
        if (points1.length == 0) {
            return false;
        }

        if (points2.length == 0) {
            return false;
        }

        let min1 = null;
        let max1 = null;

        for (let index = 0; index < points1.length; index++) {
            const point = points1[index];
            // 点在轴上的映射长度
            let projectionLength = cc.Vec2.dot(axis, point);
            // 取轴上最小最大投射长度
            if (min1 == null || projectionLength < min1) {
                min1 = projectionLength;
            }
            if (max1 == null || projectionLength > max1) {
                max1 = projectionLength;
            }
        }

        let min2 = null;
        let max2 = null;

        for (let index = 0; index < points1.length; index++) {
            const point = points1[index];
            // 点在轴上的映射长度
            let projectionLength = cc.Vec2.dot(axis, point);
            // 取轴上最小最大投射长度
            if (min2 == null || projectionLength < min2) {
                min2 = projectionLength;
            }
            if (max2 == null || projectionLength > max2) {
                max2 = projectionLength;
            }
        }

        // 比较投射长度是否重叠
        if (min1 <= max2 && min2 <= max1) {
            return true;
        }

        return false;
    }

    /**
     * 矩形和矩形相交检测(矩形abcd为顺序或者逆序排序的点)
     * @param rectA1 矩形1点A
     * @param rectB1 矩形1点B
     * @param rectC1 矩形1点C
     * @param rectD1 矩形1点D
     * @param rectA2 矩形2点A
     * @param rectB2 矩形2点B
     * @param rectC2 矩形2点C
     * @param rectD2 矩形2点D
     * @returns
     */
    public static isRectangleRectangleIntersect(rectA1: cc.Vec2, rectB1: cc.Vec2, rectC1: cc.Vec2, rectD1: cc.Vec2, rectA2: cc.Vec2, rectB2: cc.Vec2, rectC2: cc.Vec2, rectD2: cc.Vec2) {
        // 使用STA分轴方法,因为是矩形所以只需要比较长宽就好

        let rect1 = [rectA1, rectB1, rectC1, rectD1];
        let rect2 = [rectA2, rectB2, rectC2, rectD2];

        let normal = GeometryHelper.normalByDirection(rectB1.sub(rectA1));

        if (GeometryHelper.isAxisOverlapping(normal, rect1, rect2) == false) {
            // 轴分离说明不相交
            return false;
        }

        normal = GeometryHelper.normalByDirection(rectC1.sub(rectB1));

        if (GeometryHelper.isAxisOverlapping(normal, rect1, rect2) == false) {
            // 轴分离说明不相交
            return false;
        }

        normal = GeometryHelper.normalByDirection(rectB2.sub(rectA2));

        if (GeometryHelper.isAxisOverlapping(normal, rect1, rect2) == false) {
            // 轴分离说明不相交
            return false;
        }

        normal = GeometryHelper.normalByDirection(rectC2.sub(rectB2));

        if (GeometryHelper.isAxisOverlapping(normal, rect1, rect2) == false) {
            // 轴分离说明不相交
            return false;
        }

        // 所有轴都不能分离说明相交
        return true;
    }

    /**
     * 获取矩形的顺时针点(左上角为起点)
     * @param rect 矩形
     * @returns
     */
    public static pointsByRect(rect: cc.Rect) {
        return [
            new cc.Vec2(rect.xMin, rect.yMax),
            new cc.Vec2(rect.xMax, rect.yMax),
            new cc.Vec2(rect.xMax, rect.yMin),
            new cc.Vec2(rect.xMin, rect.yMin)
        ];
    }
}