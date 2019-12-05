import IModel from "../Interfaces/IModel";
import Model from "../Decorators/Model";


@Model("GameModel")
export default class GameModel extends IModel {

    constructor(

        public data1 = 0,

    ) {
        super()

    }


}