import ITicker from "../../../Blade/Interfaces/ITicker";

/**
 * 状态机类
 */
class StateMachine implements ITicker {

    private state: StateMachine.IState = null;

    constructor(start: StateMachine.IState) {
        this.setState(start);
        // 自动检测
        blade.ticker.register(this);
    }

    /**
     * 设置状态
     */
    private setState(state: StateMachine.IState) {
        if (this.state) {
            this.state.onExit();
        }
        this.state = state;
        this.state.onEnter();
    }


    /**
     * 获取当前状态名称
     */
    getStateName() {
        return this.state.getName()
    }

    /**
     * 更新状态
     * @param dt 
     */
    onTick(delta: number): void {
        const target = this.state.transition();
        if (target) {
            this.setState(target);
        } else {
            this.state.onUpdate(delta)
        }
    }
}

namespace StateMachine {
    /**
     * 状态类
     */
    export abstract class IState {
        /**
         * 名称
         *
         * @protected
         * @abstract
         * @type {string}
         * @memberof IState
         */
        protected abstract name: string;

        private transitions: Map<IState, ITransition> = new Map<IState, ITransition>();

        /**
         * 获取名称
         */
        public getName() {
            this.name;
        }

        /**
         * 增加变换
         * @param targetState 
         * @param callback 
         * @param caller 
         */
        public addTransition(targetState: IState, transition: ITransition) {
            this.transitions.set(targetState, transition)
        }

        /**
         * 移除变换
         * @param targetState 
         */
        public removeTransition(targetState: IState) {
            this.transitions.delete(targetState)
        }

        /**
         * 是否满足状态转移
         */
        public isMeet() {
            let is = false
            this.transitions.forEach((value) => {
                if (value.isMeet()) {
                    is = true;
                }
            })
            return is;
        }

        /**
         * 转移状态
         */
        public transition() {
            let state: IState = null
            this.transitions.forEach((value, key) => {
                if (value.isMeet()) {
                    state = key;
                }
            })
            return state;
        }

        /**
         * 进入状态
         */
        public abstract onEnter(): void
        /**
         * 保持状态
         */
        public abstract onUpdate(dt: number): void
        /**
         * 退出状态
         */
        public abstract onExit(): void
    }

    /**
     * 状态变化类
     */
    export abstract class ITransition {
        /**
         * 是否满足条件
         */
        public abstract isMeet(): boolean
    }
}


export default StateMachine;

