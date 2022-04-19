import ModelBase from "../../Blade/Bases/ModelBase";
import Model from "../../Blade/Decorators/Model";


@Model("GameModel")
export default class GameModel extends ModelBase {

    constructor(

        public data1 = 0,

    ) {
        super()

    }


}