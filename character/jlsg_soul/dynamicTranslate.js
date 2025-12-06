import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

const dynamicTranslates = {
	jlsg_xiejia: function (player) {
		let cnt = player.countMark("jlsg_xiejia");
		if (!cnt) {
			return lib.translate.jlsg_xiejia_info;
		}
		return `锁定技，若你的装备区没有防具牌，你使用【杀】和【决斗】对其他角色造成的伤害+<span class="bluetext">+${1 + cnt}</span>。每当你从装备区失去防具后，你以此法造成的伤害额外+1。`;
	},
	jlsg_qianyuan: function (player) {
		let str = "当你受到未记录的负面效果前，你可以令此效果对你无效，然后获得1枚“潜渊”标记并记录此负面效果。每回合限X次（X为存活角色数），当你受到已记录的负面效果前，你可以将此负面效果随机改为另一种负面效果。";
		if (lib.config.extension_极略测试_jlsgsoul_sp_zhaoyun) {
			return "锁定技，" + str;
		}
		return str;
	},
	jlsg_qifeng: function (player) {
		const [recover, draw, damage] = player?.storage?.jlsg_qifeng ?? [1, 0, 0];
		return `锁定技，当你进入濒死状态时，你减1点体力上限，回复体力至${recover}点，摸${draw}张牌，然后对一名其他角色造成${damage}点火焰伤害。`;
	},
};
export default dynamicTranslates;
