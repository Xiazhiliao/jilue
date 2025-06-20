import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import { characters } from "../character/index.js";
import { card as cardx } from "../card/jlsg_qs.js";
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
		character: await basic.resolve(character),
		skill: await basic.resolve(skill),
		card: await basic.resolve(card),
	};
};
