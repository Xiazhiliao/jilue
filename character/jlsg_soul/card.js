import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

const cards = {
	jlsg_qixian_gōng: {
		fullskin: true,
		noname: true,
	},
	jlsg_qixian_shāng: {
		fullskin: true,
		noname: true,
	},
	jlsg_qixian_jué: {
		fullskin: true,
		noname: true,
	},
	jlsg_qixian_zhǐ: {
		fullskin: true,
		noname: true,
	},
	jlsg_qixian_yǔ: {
		fullskin: true,
		noname: true,
	},
	jlsg_qixian_wén: {
		fullskin: true,
		noname: true,
	},
	jlsg_qixian_wǔ: {
		fullskin: true,
		noname: true,
	},
};
for (let cardName in cards) {
	let card = cards[cardName];
	if (card.fullskin) {
		if (_status.evaluatingExtension) {
			card.image = `db:extension-极略/image/card/${cardName}.png`;
		} else {
			card.image = `ext:极略/image/card/${cardName}.png`;
		}
	}
}
export default cards;
