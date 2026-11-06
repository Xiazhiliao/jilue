import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

const dynamicTranslates = {
	jlsgsy_bolue(player, skill) {
		let extra = "";
		if (player?.hasStorage(skill)) {
			let skills = [],
				storage = player.getStorage(skill, []);
			for (let g in storage) {
				skills.push(get.cnNumber(storage[g]) + "个" + (lib.translate[g] || "??"));
			}
			if (skills.length) {
				extra = `<span class="bluetext">及额外${skills.join("、")}势力技能</span>`;
			}
		}
		return `锁定技，回合开始前，你随机获得一个魏/一个蜀/一个吴势力的技能${extra}，直到下个回合开始。`;
	},
};
export default dynamicTranslates;
