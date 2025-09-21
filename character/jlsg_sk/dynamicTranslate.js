import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

const dynamicTranslates = {
	jlsg_zhidi(player) {
		let storage = player?.getStorage("jlsg_zhidi") || [];
		let result = "锁定技，准备阶段，你随机获得以下一项你还未获得的效果：";
		let effects = [`1.你使用【杀】造成伤害后，你摸一张牌；`, `2.你使用【杀】无视防具且不能被【闪】相应；`, `3.你使用【杀】无距离限制且次数上限+X；`, `4.你使用【杀】可以额外指定X个目标`];
		for (let i = 0; i < 4; i++) {
			if (storage.includes(String(i + 1))) {
				result += `<span class="bluetext">${effects[i]}</span>`;
			} else {
				result += effects[i];
			}
		}
		result += `（X为你以此法获得的效果数<span class="legendtext">(${storage.length})</span>）`;
		return result;
	},
	jlsg_tiandao(player) {
		let storage = player?.storage?.jlsg_tiandao || [1, 1, 1, 1];
		return `锁定技，回合开始阶段，你摸${storage[0]}张牌，随机获得${storage[1]}个群势力技能，然后可以选择一名角色，令其随机弃置${storage[2]}张牌，对其造成${storage[3]}点雷电伤害。`;
	},
	jlsg_guolun(player) {
		switch (player?.storage?.jlsg_guolun) {
			case 3:
				return lib.translate["jlsg_guolun4_info"];
			case 2:
				return lib.translate["jlsg_guolun3_info"];
			case 1:
				return lib.translate["jlsg_guolun2_info"];
			default:
				return lib.translate["jlsg_guolun_info"];
		}
	},
	jlsg_guanxu: function (player) {
		if (!("jlsg_guanxu" in player.storage) || typeof player.storage.jlsg_guanxu != "number") {
			return "任意角色的回合开始时，你可以观看其手牌，然后你可以。。。";
		}
		let map = new Map([
			[0, "获得其中至多X张牌（X为其体力）。"],
			[1, "弃置其中一张牌，令其加1点体力上限并回复1点体力。"],
			[2, "弃置其中点数最大的牌，选择其一个技能于本回合内无效。"],
			[3, "弃置其中点数最小的牌，令其发现一个你拥有的技能。"],
			[4, "弃置其中花色相同且数量最少的所有牌，若这些牌为黑色，你令其减1点体力上限。"],
			[5, "弃置其中花色相同且数量最多的所有牌，令其摸等同于弃牌数双倍的牌。"],
			[6, `将其中一张牌交给另一名角色，视为后者对前者使用"杀"。`],
			[7, `将其中一张牌置于牌堆顶，令其进行"闪电"判定。`],
		]);
		return "任意角色的回合开始时，你可以观看其手牌，然后你可以" + map.get(player.storage.jlsg_guanxu);
	},
	jlsg_huituo(player) {
		const storage = player.storage?.jlsg_huituo || [true, true, true, true];
		const choiceList = [`1.令一名角色回复体力至全场唯一最多`, `2.令一名角色摸牌至全场唯一最多`, `3.选择一名角色，系统为该角色的每个空装备栏选择一张装备牌，然后该角色使用之`, `4.令其他一名角色获得技能〖恢拓〗`];
		for (let i in choiceList) {
			if (!storage[i]) {
				choiceList[i] = `<span style="text-decoration: line-through;">${choiceList[i]}</span>`;
			}
		}
		return `准备阶段，你可以选择一名角色并选择一项：${choiceList.join(";")}。每项限一次。`;
	},
};
export default dynamicTranslates;
