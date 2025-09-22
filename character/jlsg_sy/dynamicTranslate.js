import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

const dynamicTranslates = {
	jlsgsy_bolue(player) {
		let extra = "";
		if (player?.storage?.jlsgsy_bolue) {
			let skills = [];
			for (let g in player.storage.jlsgsy_bolue) {
				skills.push(get.cnNumber(player.storage.jlsgsy_bolue[g]) + "个" + (lib.translate[g] || "??"));
			}
			if (skills.length) {
				extra = `<span class="bluetext">及额外${skills.join("、")}势力技能</span>`;
			}
		}
		return `锁定技，回合开始前，你随机获得一个魏/一个蜀/一个吴势力的技能${extra}，直到下个回合开始。`;
	},
};
export default dynamicTranslates;
