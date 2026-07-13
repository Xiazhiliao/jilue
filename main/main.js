import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import { characters } from "../character/index.js";
import { cards } from "../card/index.js";
import { basic } from "./basic.js";
let character = {
		connect: true,
	},
	skill = {
		connect: true,
	},
	card = {
		connect: true,
	};
export let extensionDefaultPackage = async function () {
	return {
		character,
		skill,
		card,
	};
};
