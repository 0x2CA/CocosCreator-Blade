declare namespace Configs {
	declare interface objList {
		[key: string]:{
			key: string;
			key1: number;
			key2: number;
			key3: string[];
			key4: number[];
			key5: number[];
		}
	}
	declare interface arrlist extends Array<
	{
		key: string;
		key1: number;
		key2: number;
		key3: string[];
		key4: number[];
		key5: number[];
	}>{}
}