import IModel from "../../Blade/Interfaces/IModel";
import Model from "../../Blade/Decorators/Model";


@Model("GameModel")
export default class GameModel extends IModel {

    constructor(

        public data1 = 0,

    ) {
        super()

    }


}