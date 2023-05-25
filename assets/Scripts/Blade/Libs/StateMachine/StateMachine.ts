/**
 * 状态机类
 */
class StateMachine<T> {

    /**
     * 当前状态Id
     */
    protected _stateId: T = null;

    /**
     * 当前状态实例
     */
    protected _state: StateMachine.IState<T> = null;

    /**
     * 状态集合
     */
    protected _states: Map<T, StateMachine.IState<T>> = new Map<T, StateMachine.IState<T>>();

    /**
     * 默认状态
     */
    protected _defaultStateId: T = null;

    public constructor(startState: T) {
        this._defaultStateId = startState;
        // this._stateId = startState;
    }

    /**
     * 添加状态
     * @param stateId
     * @param state
     */
    public addState(stateId: T, state: StateMachine.IState<T>) {
        if (this._states.has(stateId)) {
            throw new Error("状态机添加状态失败，状态已存在");
        }

        this._states.set(stateId, state);

        (state as any).bindStateMachine(this);

        // if (this._stateId === null) {
        //     this._stateId = stateId;
        // }
    }

    /**
     * 变换集合
     */
    protected _transitions: Map<T, Set<T>> = new Map<T, Set<T>>();

    /**
     * 添加变换
     * @param fromStateId
     * @param toStateId
     */
    public addTransition(fromStateId: T, toStateId: T) {
        if (this._states.has(fromStateId) == false) {
            throw new Error("状态机添加转换失败，起始状态不存在");
        }

        if (this._states.has(toStateId) == false) {
            throw new Error("状态机添加转换失败，目标状态不存在");
        }

        if (this._transitions.has(fromStateId) == false) {
            this._transitions.set(fromStateId, new Set<T>());
        }

        this._transitions.get(fromStateId).add(toStateId);
    }

    /**
     * 状态转移判断
     * @param toStateId
     * @returns
     */
    public can(toStateId: T) {
        // 没有目标状态
        if (this._states.has(toStateId) == false) {
            return false;
        }

        // /**
        //  * 没有进入初始状态
        //  */
        // if (this._state == null) {
        //     return true;
        // }

        if (this._transitions.has(this._stateId) == false) {
            return false;
        }

        return this._transitions.get(this._stateId).has(toStateId);
    }

    /**
     * 改变状态
     */
    public changeState(toStateId: T) {
        // if (this._stateId == toStateId) {
        //     // 还是当前状态
        //     console.warn("状态一致，不需要变换");
        //     return false;
        // }

        if (this._states.has(toStateId) == false) {
            console.warn("状态机改变状态失败，目标状态不存在");
            return false;
        }

        if (this.can(toStateId) == false) {
            console.warn("状态机改变状态失败，不能变换到目标状态");
            return;
        }

        if (this._state) {
            this._state.onExit();
            this._state = null;
        }

        this._stateId = toStateId;
        this._state = this._states.get(toStateId);
        this._state.onEnter();
        return true;
    }

    /**
     * 获取当前状态
     */
    public getStateId() {
        return this._stateId;
    }

    /**
     * 初始化
     */
    public init() {
        // 进入状态
        if (this._state != null) {
            this._state.onExit();
        }

        this._stateId = this._defaultStateId;

        if (this._stateId != null && this._state == null && this._states.has(this._stateId)) {
            this._state = this._states.get(this._stateId);
            this._state.onEnter();
        }
    }

    /**
     * 更新状态机
     * @param delta
     */
    public tick(delta: number) {
        if (this._state) {
            this._state.onTick(delta);
        }
    }

}

namespace StateMachine {
    /**
     * 状态类
     */
    export abstract class IState<T> {

        protected _stateMachine: StateMachine<T> = null;

        public constructor() {
        }

        /**
         * 绑定状态机
         * @param stateMachine
         */
        private bindStateMachine(stateMachine: StateMachine<T>) {
            this._stateMachine = stateMachine;
        }

        /**
         * 获取状态机
         * @returns
         */
        public getStateMachine() {
            return this._stateMachine;
        }

        /**
         * 进入状态
         */
        public abstract onEnter(): void

        /**
         * 保持状态
         */
        public abstract onTick(delta: number): void

        /**
         * 退出状态
         */
        public abstract onExit(): void
    }

}


export default StateMachine;

