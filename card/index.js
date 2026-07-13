import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import jlsg_qs from "./jlsg_qs.js";
import old_jlsg_qs from "./old_jlsg_qs.js";
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
export let cards = jlsg_qs;
