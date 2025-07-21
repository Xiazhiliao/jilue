import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import { config } from "../main/config.js";
import { oldCharacter } from "./oldCharacter/index.js";
import jlsg_sk from "./jlsg_sk.js";
import jlsg_sr from "./jlsg_sr.js";
import jlsg_soul from "./jlsg_soul.js";
import jlsg_sy from "./jlsg_sy.js";
import jlsg_skpf from "./jlsg_skpf.js";
import jlsgZhu from "./jlsg_zhu.js";

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
			pack.character[character] = replaceInfo.info;
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
//导入jlsgZhu里的skill和translate
if (lib.config?.extension_极略_jlsg_zhugong_buff) {
	//清除原有主公技
	for (let character in jlsg_sr.character) {
		const skills = jlsg_sr.character[character][3];
		for (let skill of skills) {
			const info = jlsg_sr.skill[skill];
			if (info?.zhuSkill) {
				jlsg_sr.character[character][3].remove(skill);
				if (info.group) {
					const group = Array.isArray(info.group) ? info.group : [info.group];
					for (let skill2 of group) {
						delete jlsg_sr.skill[skill2];
						delete jlsg_sr.translate[skill2];
						delete jlsg_sr.translate[skill2 + "_info"];
					}
				}
				delete jlsg_sr.skill[skill];
				delete jlsg_sr.translate[skill];
				delete jlsg_sr.translate[skill + "_info"];
			}
		}
	}

	for (let i in jlsgZhu.skill) {
		jlsg_sr.skill[i] = jlsgZhu.skill[i];
	}
	for (let i in jlsgZhu.translate) {
		jlsg_sr.translate[i] = jlsgZhu.translate[i];
	}
}
//魔将调整
if (lib.config?.extension_极略_syRefactor) {
	for (const name in jlsg_sy.character) {
		if (!name.startsWith("jlsgsy_")) continue;
		jlsg_sy.character[name][1] = "jlsgsy";
		const title = jlsg_sy.translate[name],
			baonu = name.endsWith("baonu") ? true : false;
		const info = baonu ? name.slice(7, -5) : name.slice(7);
		let num2 = 3;
		if (get.mode() == "boss") {
			num2 = 4;
		}
		if (baonu) jlsg_sy.character[name][2] = num2;
		if (get.mode() != "boss") {
			if (!title) continue;
			else {
				lib.arenaReady.push(function () {
					lib.characterTitle[name] = title;
					let translation = get.rawName(info);
					lib.translate[name] = "SY" + (baonu ? "暴怒" : "") + translation;
					lib.translate[name + "_ab"] = "极略SY" + (baonu ? "暴怒" : "") + translation;
					lib.translate[name + "_prefix"] = baonu ? "极略SY暴怒" : "极略SY";
					if (name == "jlsgsy_sunhaobaonu") {
						lib.characterPack.jlsg_sy[name][3].remove("jlsgsy_shisha");
						lib.characterPack.jlsg_sy[name][3].unshift("jlsgsy_mingzheng");
						if (lib.character[name]) {
							lib.character[name][3].remove("jlsgsy_shisha");
							lib.character[name][3].unshift("jlsgsy_mingzheng");
						}
					}
				});
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
export const characters = {
	jlsg_sk,
	jlsg_sr,
	jlsg_soul,
	jlsg_sy,
	jlsg_skpf,
};
