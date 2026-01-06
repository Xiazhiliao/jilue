import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

const dynamicTranslates = {
	jlsg_guanxing(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_zhugeliang"]?.[2] || upgradeStorage.other?.jlsg_guanxing;
		if (improve || player?.index) {
			return "回合开始阶段，或回合结束阶段，你可以观看牌堆顶的五张牌，将这些牌以任意顺序置于牌堆顶或牌堆底，然后你可以将牌堆底牌置于你的武将牌上，称为“星”。出牌阶段限一次，你可以获得任意张“星”，然后摸等量的牌，你以此法获得的牌无次数限制。";
		}
		return lib.translate["jlsg_guanxing_info"];
	},
	jlsg_sanfen(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_zhugeliang"]?.[2] || upgradeStorage.other?.jlsg_sanfen;
		if (improve || player?.index) {
			return "出牌阶段限一次，你可以展示牌堆顶的两张牌并分别交给两名角色，若如此做，视为以此法获得点数较大的牌的角色对另一名角色使用【杀】，然后你可以视为对其中任意名角色使用【杀】。当以此法使用的【杀】造成伤害后，你获得受伤角色的一张牌。若你以此法给出的牌里有【杀】，你可以重复此流程。";
		}
		return lib.translate["jlsg_sanfen_info"];
	},
	jlsg_weiwo(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_zhugeliang"]?.[2] || upgradeStorage.other?.jlsg_weiwo;
		let bool = player.storage?.jlsg_weiwo;
		if (improve || player?.index) {
			if (!bool) {
				return "锁定技，当你受到属性伤害时，若你有手牌，你防止此伤害；当你受到非属性伤害时，若你没有手牌，你防止此伤害。任意角色的回合结束时，若你于本回合内没有受到过伤害，你可以摸一张牌，然后对调此技能的“若你有手牌”和“若你没有手牌”。";
			} else {
				return "锁定技，当你受到属性伤害时，若你没有手牌，你防止此伤害；当你受到非属性伤害时，若你有手牌，你防止此伤害。任意角色的回合结束时，若你于本回合内没有受到过伤害，你可以摸一张牌，然后对调此技能的“若你有手牌”和“若你没有手牌”。";
			}
		}
		return lib.translate["jlsg_weiwo_info"];
	},
	jlsg_guicai(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_simayi"]?.[2] || upgradeStorage.other?.jlsg_sheji;
		if (improve || player?.index) {
			return "当判定牌生效前，你可以打出一张牌或用牌堆顶牌代替之，然后摸两张牌。";
		}
		return lib.translate["jlsg_guicai_info"];
	},
	jlsg_langgu(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_simayi"]?.[2] || upgradeStorage.other?.jlsg_sheji;
		if (improve || player?.index) {
			return "当你对其他角色造成伤害时，或其他角色对你造成伤害时，你可以摸一张牌并判定，若结果为：黑桃，此伤害+1；红桃，此伤害-1；梅花，你弃置其一张牌；方片，你摸一张牌。";
		}
		return lib.translate["jlsg_langgu_info"];
	},
	jlsg_zhuizun(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_simayi"]?.[2] || upgradeStorage.other?.jlsg_sheji;
		if (improve || player?.index) {
			return "限定技，当你进入濒死状态时，你可以回复体力至体力上限，然后判定，若如此做，你获得其他角色手牌里和弃牌堆里的与判定结果花色相同的所有牌。此回合结束后，你进行一个额外回合。";
		}
		return lib.translate["jlsg_zhuizun_info"];
	},
	jlsg_zhaoxiang(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player?.playerid] || {},
			storage = player?.getStorage?.("jlsg_zhaoxiang", [true, true, true]) || [true, true, true];
		let str = "当其他角色使用【杀】指定目标时，你可以获得其一张手牌，然后选择未执行过的一项：",
			list = ["1．令此【杀】不能被响应", "2．令此【杀】无效", "3．将此【杀】的目标改为你"];
		if (upgradeStorage["jlsgsr_caocao"]?.[2] || upgradeStorage.other?.jlsg_zhaoxiang || player?.index) {
			list.push("4．令目标角色于此【杀】结算后回复1点体力");
			if (storage.length < 4) {
				storage.push(true);
			}
		}
		for (let i in storage) {
			if (!storage[i]) {
				list[i] = `<span style="text-decoration: line-through;">${list[i]}</span>`;
			}
		}
		str += list.join("；") + "。当所有选项执行后，重置此技能。";
		return str;
	},
	jlsg_zhishi(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player?.playerid] || {};
		if (upgradeStorage["jlsgsr_caocao"]?.[2] || upgradeStorage.other?.jlsg_zhishi || player?.index) {
			return "当任意角色受到伤害后，你可以令其从随机三个能在此时机发动的技能中选择一个并发动。";
		}
		return lib.translate.jlsg_zhishi_info;
	},
	jlsg_rende(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_liubei"]?.[2] || upgradeStorage.other?.jlsg_rende;
		if (improve || player?.index) {
			return "任意角色的回合结束阶段，你可以摸三张牌，然后将等量的牌交给该角色，若如此做，该角色于本阶段结束后执行一个额外出牌阶段，该角色于此额外出牌阶段使用以此法获得的牌无距离和次数限制。";
		} else {
			return get.translation("jlsg_rende_info");
		}
	},
	jlsg_chouxi(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_liubei"]?.[2] || upgradeStorage.other?.jlsg_chouxi;
		if (improve || player?.index) {
			return "出牌阶段每名角色限一次，你可以获得一名其他角色至多三张牌，然后交给其等量的牌，若如此做，你可以对其造成X点伤害（X为你以此法获得的牌与给出的牌的类别数之差）。";
		} else {
			return get.translation("jlsg_chouxi_info");
		}
	},
	jlsg_quanheng(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_sunquan"]?.[2] || upgradeStorage.other?.jlsg_quanheng;
		if (improve || player?.index) {
			return "出牌阶段，你可以将X张手牌当【无中生有】或【杀】使用（X为你本回合先前发动此技能的次数）；当你使用【无中生有】后，你本回合使用的下一张【杀】的伤害+1；当你使用【杀】后，你本回合使用的下一张【无中生有】的摸牌数+1。";
		} else {
			return get.translation("jlsg_quanheng_info");
		}
	},
	jlsg_xionglve(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_sunquan"]?.[2] || upgradeStorage.other?.jlsg_xionglve;
		if (improve || player?.index) {
			return "每回合限一次，当你获得牌后，你可以将其中至少一张牌置于你的武将牌上，称为“略”，若这些牌里有出牌阶段可以使用的基本牌或普通锦囊牌，你可以依次视为使用之；每轮限一次，回合结束时，若你有“略”且你本回合造成的伤害为X，或获得的牌数为2X（X为“略”数），你可以获得所有“略”，然后于本回合结束后执行一个额外回合。";
		} else {
			return get.translation("jlsg_xionglve_info");
		}
	},
	jlsg_jiwu(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_lvbu"]?.[2] || upgradeStorage.other?.jlsg_jiwu;
		if (improve || player?.index) {
			return "锁定技，若你的装备区里没有武器牌，你视为装备着【方天画戟】，你使用【杀】造成的伤害+1。若你使用的【杀】是你每回合使用的第一张牌或最后的手牌，你令此【杀】不能被响应且造成的伤害+1。";
		}
		return get.translation("jlsg_jiwu_info");
	},
	jlsg_sheji(player) {
		const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
		let improve = upgradeStorage["jlsgsr_lvbu"]?.[2] || upgradeStorage.other?.jlsg_sheji;
		if (improve || player?.index) {
			return "当任意角色造成伤害后，若其装备区有武器牌，你可以获得之，否则你可以将随机临时武器牌置入其装备区。你可以将装备区的武器牌或所有手牌当【杀】使用。";
		}
		return get.translation("jlsg_sheji_info");
	},
};
export default dynamicTranslates;
