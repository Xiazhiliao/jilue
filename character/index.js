import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import { config } from "../main/config.js";
import { oldCharacter } from "./oldCharacter/index.js";
import jlsg_sk from "./jlsg_sk.js";
import jlsg_sr from "./jlsg_sr.js";
import jlsg_soul from "./jlsg_soul.js";
import jlsg_sy from "./jlsg_sy.js";
import jlsg_skpf from "./jlsg_skpf.js";

const packList = [jlsg_sk, jlsg_sr, jlsg_soul, jlsg_sy, jlsg_skpf];
//技能替换
for (let character in config) {
	let info = character.split("_");
	let prefix = info[0];
	if (!["jlsgsk", "jlsgsr", "jlsgsoul", "jlsgsy"].includes(prefix)) {
		continue;
	}
	const configx = lib.config[`extension_极略_${character}`];
	if (!configx || configx == "false") {
		continue;
	}
	const packName = prefix.includes("jlsgsk_skpf") ? "jlsg_skpf" : prefix.slice(0, 4) + "_" + prefix.slice(4);
	const replaceInfo = oldCharacter[packName]?.[character]?.[configx],
		pack = packList.find(i => i.name == packName);
	if (!replaceInfo) continue;
	for (let i in replaceInfo) {
		if (i == "info") {
			pack[character] = replaceInfo.info;
		} else if (i == "translate") {
			for (let j in replaceInfo.translate) {
				pack.translate[j] = replaceInfo.translate[j];
			}
		} else if (i == "skill") {
			for (let j in replaceInfo.skill) {
				pack.skill[j] = replaceInfo.skill[j];
			}
		}
	}
}
if (lib.device || lib.node) {
	for (let pack of [jlsg_sk, jlsg_sr, jlsg_soul, jlsg_sy, jlsg_skpf]) {
		const prefixList = ["SK神", "SP神", "SK", "SR", "SP"];
		for (let name in pack.character) {
			//初始化第五格
			if (!pack.character[name][4]) pack.character[name][4] = [];
			//原画
			pack.character[name][4].push(`${lib.device || lib.node ? "ext:" : "db:extension-"}极略/image/character/${name}.jpg`);
			//阵亡语音
			if (!pack.character[name][4].some(j => j.startsWith("die:"))) {
				pack.character[name][4].add("die:ext:极略/audio/die:true");
			}
			//前缀
			if (name in pack.translate && !name.startsWith("jlsgsy") && !name.startsWith("jlsgrm")) {
				let translate = pack.translate[name];
				if (!(name + "_ab" in pack.translate)) {
					pack.translate[name + "_ab"] = "极略" + translate;
				}
				let prefix = prefixList.find(prefix => translate.startsWith(prefix));
				if (prefix) {
					pack.translate[name + "_prefix"] = "极略" + prefix;
				}
			}
		}
	}
}
if (!_status.postReconnect.extErdai_skill) {
	_status.postReconnect.extErdai_skill = [
		function (skills, info) {
			for (let skill in skills) {
				lib.skill[skill] = skills[skill];
				if (info[skill]) {
					lib.translate[skill] = info[skill];
				}
				if (info[skill + "_info"]) {
					lib.translate[skill + "_info"] = info[skill + "_info"];
				}
				game.finishSkill(skill);
			}
		},
		{},
		{},
	];
}
for (let pack of packList) {
	for (let key in pack.skill) {
		_status.postReconnect.extErdai_skill[1][key] = pack.skill[key];
		if (pack.translate[key]) _status.postReconnect.extErdai_skill[2][key] = pack.translate[key];
		if (pack.translate[key + "_info"]) _status.postReconnect.extErdai_skill[2][key + "_info"] = pack.translate[key + "_info"];
	}
}
export const characters = {
	jlsg_sk,
	jlsg_sr,
	jlsg_soul,
	jlsg_sy,
	jlsg_skpf,
};
