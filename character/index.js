import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import jlsg_sk from "./jlsg_sk.js";
import jlsg_sr from "./jlsg_sr.js";
import jlsg_soul from "./jlsg_soul.js";
import jlsg_sy from "./jlsg_sy.js";
import jlsg_skpf from "./jlsg_skpf.js";

if (lib.device || lib.node) {
	for (let pack of [jlsg_sk, jlsg_sr, jlsg_soul, jlsg_sy, jlsg_skpf]) {
		for (let name in pack) {
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
for (let pack of [jlsg_sk, jlsg_sr, jlsg_soul, jlsg_sy, jlsg_skpf]) {
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
