import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import jlsg_qs from "./jlsg_qs.js";
import old_jlsg_qs from "./old_jlsg_qs.js";
// 旧版本七杀包卡牌替换
if (lib.config[`extension_极略_old_jlsg_qs`]) {
	for (let i in old_jlsg_qs) {
		const info = old_jlsg_qs[i];
		for (let j in info) {
			if (j in jlsg_qs[i]) {
				jlsg_qs[i][j] = info[j];
			}
		}
	}
}
// 七杀特殊宝物规则
async function prepareEquip(event, trigger, player) {
	const emptySlots = player.countEmptySlot("equip3") + player.countEmptySlot("equip5");
	if (emptySlots) {
		if (player.countEmptySlot("equip3")) {
			event.card.subtypes = ["equip3"];
		} else {
			event.card.subtypes = ["equip5"];
		}
	} else {
		const subtypesList = player
			.getCards("e", card => get.subtypes(card).includes("equip3") || get.subtypes(card).includes("equip5"))
			.flatMap(card => get.subtypes(card))
			.unique();
		let result;
		if (subtypesList.length == 1) {
			result = { control: subtypesList[0] };
		} else {
			result = await player
				.chooseControl(subtypesList)
				.set("prompt", `请选择置入【${get.translation(event.card)}】的装备栏`)
				.forResult();
		}
		if (result?.control) {
			event.card.subtypes = [result.control];
		}
	}
}
for (let cardName in jlsg_qs.card) {
	let card = jlsg_qs.card[cardName];
	// 批量填写卡牌图片和语音路径
	if (card.fullskin) {
		if (_status.evaluatingExtension) {
			card.image = `db:extension-极略/image/card/${cardName}.png`;
		} else {
			card.image = `ext:极略/image/card/${cardName}.png`;
		}
	}
	if (card.audio === true) {
		card.audio = `ext:audio/card/极略`;
	}
	// 七杀特殊宝物规则
	if (!lib.config["extension_极略_qsRelic"] || card.type != "equip") {
		continue;
	}
	if (["equip1", "equip3", "equip4", "equip5", "equip6"].includes(card.subtype)) {
		if (card.subtype != "equip1") {
			if (card.subtype == "equip5") {
				if (!card.recastable) {
					card.recastable = true;
				}
			}
			card.prepareEquip = prepareEquip;
		} else if (get.mode() == "boss") {
			card.recastable = true;
		}
	}
}
// 七杀技能翻译和标记图片路径
for (let skill in jlsg_qs.skill) {
	let list = skill.split("_");
	let translate = list[0] + "_" + list[1];
	if (translate in jlsg_qs.translate) {
		jlsg_qs.translate[skill] = jlsg_qs.translate[translate];
	}
	let info = jlsg_qs.skill[skill];
	if (info.markimage2 && translate in jlsg_qs.card) {
		let img = jlsg_qs.card[translate].image;
		if (img.startsWith("ext:")) {
			info.markimage2 = `${lib.assetURL}extension/${img.slice(4)}`;
		} else {
			info.markimage2 = jlsg_qs.card[translate].image;
		}
	}
}
export let cards = jlsg_qs;
