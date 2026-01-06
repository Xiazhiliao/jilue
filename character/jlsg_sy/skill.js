import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	jlsgsy_baonu: {
		audio: "ext:极略/audio/skill:1",
		skillAnimation: true,
		trigger: { player: "changeHp" },
		unique: true,
		charlotte: true,
		firstDo: true,
		ruleSkill: true,
		forced: true,
		mode: ["identity", "guozhan", "boss", "stone"],
		init(player, skill) {
			let nameList = get.nameList(player);
			if (nameList.every(i => !i.startsWith("jlsgsy_"))) {
				game.log(player, "非法获得技能，已移除");
				player.removeSkill(skill);
				return;
			}
			player.addSkill(skill + "2");
		},
		filter(event, player) {
			let nameList = get.nameList(player);
			if (nameList.every(i => !i.startsWith("jlsgsy_"))) {
				return false;
			}
			let least = 4;
			return player.hp <= least;
		},
		async content(event, trigger, player) {
			if (get.mode() == "boss") {
				if (player.isLinked()) {
					await player.link();
				}
				if (player.isTurnedOver()) {
					await player.turnOver();
				}
				await player.discard(player.getCards("j"));
			}
			await event.trigger("jlsgsy_baonuBefore");
			let least = 4;
			if (player.hp < least) {
				player.hp = least;
			}
			let name1 = player.name1,
				name2 = player.name2;
			if (name1.startsWith("jlsgsy_") && !name1.endsWith("baonu")) {
				game.log(player, "将", get.translation(name1), "变更为", get.translation(name1 + "baonu"));
				player.reinit(name1, name1 + "baonu");
			}
			if (name2 && name2.startsWith("jlsgsy_") && !name2.endsWith("baonu")) {
				game.log(player, "将", get.translation(name2), "变更为", get.translation(name2 + "baonu"));
				player.reinit(name2, name2 + "baonu");
			}
			player.update();
			await event.trigger("jlsgsy_baonuAfter");
			const cards = Array.from(ui.ordering.childNodes);
			while (cards.length) {
				cards.shift().discard();
			}
			game.resetSkills();
			game.broadcastAll(ui.clear);
			let evt = trigger.getParent(1, true);
			while (evt?.name != "phaseLoop") {
				if (evt) {
					if (evt.name == "phase") {
						evt.pushHandler("onPhase", (evtx, option) => {
							evtx.step = 13;
							evtx.num = evtx.phaseList.length;
							game.broadcastAll(function (player) {
								player.classList.remove("glow_phase");
								if (_status.currentPhase) {
									game.log(_status.currentPhase, "结束了回合");
									delete _status.currentPhase;
								}
							}, evtx.player);
						});
					}
					evt.finish();
					evt._triggered = null;
					evt = evt.getParent(1, true);
				} else {
					break;
				}
			}
			_status.paused = false;
			player.insertPhase(event.name);
		},
	},
	jlsgsy_baonu2: {
		trigger: {
			global: "gameDrawBegin",
			player: "phaseDrawBegin2",
		},
		filter(event, player) {
			if (get.mode() != "boss") {
				return false;
			}
			return !event.numFixed;
		},
		forced: true,
		popup: false,
		priority: 100,
		async content(event, trigger, player) {
			if (event.name == "phaseDraw") {
				trigger.num += 2;
			} else {
				let cards = get.cards(2);
				player.directgain(cards, false);
			}
		},
	},
	jlsgsy_baonulvbu: {
		inherit: "jlsgsy_baonu",
		animationStr: "把你们全宰了！",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_wushuang: {
		audio: "ext:极略/audio/skill:1",
		locked: true,
		group: ["jlsgsy_wushuang1", "jlsgsy_wushuang2", "jlsgsy_wushuang3"],
	},
	jlsgsy_wushuang1: {
		audio: "jlsgsy_wushuang",
		trigger: { player: "useCard" },
		filter: function (event, player) {
			return get.tag(event.card, "damage") && get.number(event.card, player) & (1 === 1);
		},
		forced: true,
		direct: true,
		content: function () {
			trigger.baseDamage = 3;
			if (!["sha", "juedou"].includes(trigger.card.name)) {
				player.logSkill(event.name);
			}
		},
	},
	jlsgsy_wushuang2: {
		audio: "jlsgsy_wushuang",
		trigger: { player: "useCardToPlayered" },
		forced: true,
		filter: function (event, player) {
			return event.card.name == "sha" && !event.getParent().directHit.includes(event.target);
		},
		logTarget: "target",
		content: function () {
			var id = trigger.target.playerid;
			var map = trigger.getParent().customArgs;
			if (!map[id]) {
				map[id] = {};
			}
			if (typeof map[id].shanRequired == "number") {
				map[id].shanRequired++;
			} else {
				map[id].shanRequired = 2;
			}
		},
		ai: {
			directHit_ai: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg.card.name != "sha" || arg.target.countCards("h", "shan") > 1) {
					return false;
				}
			},
		},
	},
	jlsgsy_wushuang3: {
		audio: "jlsgsy_wushuang",
		trigger: { player: "useCardToPlayered", target: "useCardToTargeted" },
		forced: true,
		logTarget: function (trigger, player) {
			return player == trigger.player ? trigger.target : trigger.player;
		},
		filter: function (event, player) {
			return event.card.name == "juedou";
		},
		//priority:-1,
		content: function () {
			var id = (player == trigger.player ? trigger.target : trigger.player)["playerid"];
			var idt = trigger.target.playerid;
			var map = trigger.getParent().customArgs;
			if (!map[idt]) {
				map[idt] = {};
			}
			if (!map[idt].shaReq) {
				map[idt].shaReq = {};
			}
			if (!map[idt].shaReq[id]) {
				map[idt].shaReq[id] = 1;
			}
			map[idt].shaReq[id]++;
		},
		ai: {
			directHit_ai: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg.card.name != "juedou" || Math.floor(arg.target.countCards("h", "sha") / 2) > player.countCards("h", "sha")) {
					return false;
				}
			},
		},
	},
	jlsgsy_xiuluo: {
		audio: "ext:极略/audio/skill:1",
		trigger: { target: "useCardToTargeted" },
		filter: function (event, player) {
			return event.targets && event.targets.length === 1 && (event.card.name == "sha" || get.type(event.card) == "trick");
		},
		check: function (event, player) {
			return get.effect(player, { name: "juedou" }, event.player, player) + 4 > get.effect(player, event.card, event.player, player);
		},
		frequent: function (event, player) {
			return event.card.name != "juedou";
		},
		content: function () {
			"step 0";
			player.draw();
			trigger.card.name = "juedou";
			if (trigger.card.isCard && trigger.cards.length) {
				trigger.card.isCard = false;
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	jlsgsy_shenwei: {
		audio: "ext:极略/audio/skill:1",
		global: "jlsgsy_shenwei_g",
	},
	jlsgsy_shenwei_g: {
		mod: {
			maxHandcard: function (player, num) {
				return (
					num -
					game.countPlayer(function (current) {
						return current != player && current.hasSkill("jlsgsy_shenwei") && current.inRange(player);
					})
				);
			},
		},
	},
	jlsgsy_shenji: {
		audio: "ext:极略/audio/skill:1",
		mod: {
			selectTarget: function (card, player, range) {
				if (card.name != "sha") {
					return;
				}
				range[1] += 2;
			},
		},
		trigger: { player: "useCard1" },
		forced: true,
		firstDo: true,
		filter: function (event, player) {
			if (event.card.name != "sha") {
				return false;
			}
			return event.targets.length > 1;
		},
		content: function () {},
	},
	jlsgsy_guiming: {
		audio: "ext:极略/audio/skill:1", // audio: ['jlsgsy_guiming'],
		trigger: { player: "dying" },
		limited: true,
		skillAnimation: true,
		animationColor: "thunder",
		check: () => true,
		content: function () {
			"step 0";
			player.awakenSkill(event.name);
			event.cnt = game.filterPlayer().length;
			player.recover(event.cnt - player.hp);
			event.targets = game.filterPlayer(p => p != player).sortBySeat();
			"step 1";
			if (!event.targets.length) {
				event.finish();
				return;
			}
			let target = event.targets.shift();
			target.discard(target.getCards("he").randomGets(event.cnt), "notBySelf").set("delay", false);
			game.delayx(0.5);
			event.redo();
		},
	},
	jlsgsy_huangyin: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: ["loseAfter", "loseAsyncAfter"] },
		frequent: true,
		filter(event, player) {
			if (event.type != "discard") {
				return false;
			}
			if ((event.discarder || event.getParent(2).player) != player) {
				return false;
			}
			return game
				.filterPlayer(p => p != player)
				.some(p => {
					let evt = event.getl(p);
					return evt.hs.length > 0 || evt.es.length > 0;
				});
		},
		content: function () {
			let cards = game
				.filterPlayer(p => p != player)
				.map(p => {
					let evt = trigger.getl(p);
					return [evt.hs, evt.es];
				})
				.flat()
				.flat();
			if (cards.length) {
				let card = cards.randomGet();
				player.gain("log", false, card);
				player.$gain2(card);
				game.delayx(0.5);
			}
		},
	},
	jlsgsy_baonusunhao: {
		inherit: "jlsgsy_baonu",
		animationStr: "当个好皇帝有什么意思!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_mingzheng: {
		audio: "ext:极略/audio/skill:1",
		derivation: "jlsgsy_shisha",
		trigger: { global: "phaseDrawBegin" },
		frequent: true,
		content: function () {
			if (trigger.player == player) {
				trigger.num += 2;
			} else {
				trigger.num++;
			}
		},
		group: ["jlsgsy_mingzheng2"],
		ai: {
			threaten: 0.8,
		},
	},
	jlsgsy_mingzheng2: {
		sourceSkill: "jlsgsy_mingzheng",
		trigger: {
			player: "damageEnd",
			global: ["jlsgsy_baonuBefore", "jlsgsy_baonuAfter"],
		},
		filter(event, player, name) {
			if (name.includes("jlsgsy_baonu")) {
				return event.player == player;
			}
			return true;
		},
		forced: true,
		popup: false,
		async content(event, trigger, player) {
			player.logSkill("jlsgsy_mingzheng");
			let num = player.phaseNumber;
			if (event.triggername == "jlsgsy_baonuAfter") {
				num++;
			}
			await player.draw(player.phaseNumber + 1);
			await player.changeSkills(["jlsgsy_shisha"], ["jlsgsy_mingzheng"]);
		},
	},
	jlsgsy_shisha: {
		audio: "ext:极略/audio/skill:1", // audio: ['jlsgsy_shisha'],
		trigger: { player: "useCardToPlayered" },
		forced: true,
		filter(event, player) {
			return event.card.name == "sha" && event.target.countCards("he");
		},
		content: function () {
			"step 0";
			var num = 1 + Math.floor(Math.random() * 3);
			trigger.target.randomDiscard(num);
		},
	},
	jlsgsy_zuijiu: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		filter(event, player) {
			const sha = get.autoViewAs({ name: "sha", isCard: true }, []),
				jiu = get.autoViewAs({ name: "jiu", isCard: true }, []);
			let list = [sha, jiu].filter(card => player.hasUseTarget(card, false, false));
			if (!list.length) {
				return false;
			}
			let used = player.getStat("skill")?.jlsgsy_zuijiu || 0;
			return player.countDiscardableCards(player, "h") >= used;
		},
		delay: 0,
		async content(event, trigger, player) {
			let used = (player.getStat("skill")?.jlsgsy_zuijiu || 1) - 1;
			if (used > 0) {
				await player.randomDiscard(used, "h");
			}
			const sha = get.autoViewAs({ name: "sha", isCard: true }, []),
				jiu = get.autoViewAs({ name: "jiu", isCard: true }, []);
			let list = [sha, jiu].filter(card => player.hasUseTarget(card, false, false));
			if (!list.length) {
				return;
			}
			let card = list.randomGet();
			await player.chooseUseTarget(card.name, true, false, "nodistance");
		},
		ai: {
			order(item, player) {
				return get.order("sha", player) + 1;
			},
			result: {
				player(player) {
					let used = player.getStat("skill")?.jlsgsy_zuijiu || 0;
					if (used <= 2) {
						return 1;
					}
					return 0;
				},
			},
		},
	},
	jlsgsy_bolue: {
		audio: "ext:极略/audio/skill:4",
		trigger: { player: "phaseBegin" },
		forced: true,
		initList() {
			let result = {};
			for (let c of lib.jlsg.characterList) {
				let info = get.character(c);
				if (!result[info[1]]) {
					result[info[1]] = new Set();
				}
				info[3].filter(s => !lib.filter.skillDisabled(s) && (!lib.skill[s]?.ai || !lib.skill[s]?.ai?.neg)).forEach(s => result[info[1]].add(s));
			}
			for (let g in result) {
				result[g] = [...result[g]];
			}
			_status.jlsgsy_bolue_list = result;
		},
		init(player) {
			player.storage.jlsgsy_bolue = {
				wei: 1,
				shu: 1,
				wu: 1,
			};
		},
		content: function () {
			"step 0";
			if (!_status.jlsgsy_bolue_list) {
				lib.skill.jlsgsy_bolue.initList();
			}
			let obj = Object.assign({}, player.storage.jlsgsy_bolue);
			let list = [];
			for (let g in obj) {
				if (!_status.jlsgsy_bolue_list[g]) {
					continue;
				}
				list.addArray(_status.jlsgsy_bolue_list[g].randomGets(obj[g]));
			}
			player.addTempSkills(list, { player: "phaseBefore" });
		},
	},
	jlsgsy_baonusimayi: {
		inherit: "jlsgsy_baonu",
		animationStr: "老夫没时间陪你们了!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_biantian: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "phaseJudgeBefore" },
		forced: true,
		filter: function (event, player) {
			if (event.player == player) {
				return false;
			}
			return event.player.isAlive();
		},
		async content(event, trigger, player) {
			await trigger.player.executeDelayCardEffect("shandian");
		},
	},
	jlsgsy_tianyou: {
		audio: "ext:极略/audio/skill:1", // audio: ['jlsgsy_tianyou'],
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		filter(event, player) {
			let cnt = game.getAllGlobalHistory("changeHp", e => {
				let p = e.getParent();
				if (p.name != "damage") {
					return false;
				}
				return p.getParent().name == "jlsgsy_biantian" || (p.card && p.card.name == "shandian");
			}).length;
			return cnt != 0 || player.isDamaged();
		},
		content: function () {
			"step 0";
			let cnt = game.getAllGlobalHistory("changeHp", e => {
				let p = e.getParent();
				if (p.name != "damage") {
					return false;
				}
				return p.getParent().name == "jlsgsy_biantian" || (p.card && p.card.name == "shandian");
			}).length;
			if (cnt == 0) {
				player.recover();
			} else {
				player.draw(cnt);
			}
		},
	},
	jlsgsy_renji: {
		audio: "ext:极略/audio/skill:3",
		trigger: { player: "damageEnd" },
		frequent: true,
		content: function () {
			player.draw();
			if (!player.storage.jlsgsy_bolue) {
				player.storage.jlsgsy_bolue = {};
			}
			if (trigger.source) {
				let group = trigger.source.group || "qun";
				player.storage.jlsgsy_bolue[group] = player.storage.jlsgsy_bolue[group] || 0;
				player.storage.jlsgsy_bolue[group] += 1;
			}
		},
		ai: {
			maixie: true,
			combo: "jlsgsy_bolue",
		},
	},
	jlsgsy_zongyu: {
		audio: "ext:极略/audio/skill:1", // audio: ['zhongyu'],
		forced: true,
		trigger: { player: "useCardEnd" },
		filter: function (event, player) {
			return player.isPhaseUsing() && get.type(event.card, "trick") == "trick" && player.hasUseTarget({ name: "jiu", isCard: true }, null, false);
		},
		direct: true,
		content: function () {
			player.chooseUseTarget({ name: "jiu", isCard: true }, true, false, "nopopup", "noanimate").set("logSkill", event.name);
		},
	},
	jlsgsy_lingnue: {
		audio: "ext:极略/audio/skill:1", // audio: ['linnue'],
		trigger: { source: "damageSource" },
		filter: function (event) {
			return event.num >= 2;
		},
		frequent: true,
		content: function () {
			"step 0";
			player.draw(2);
			"step 1";
			player.gainMaxHp();
		},
	},
	jlsgsy_baozheng: {
		audio: "ext:极略/audio/skill:1",
		forced: true,
		trigger: { global: "phaseDrawAfter" },
		filter: function (event, player) {
			return event.player != player;
		},
		logTarget: "player",
		content: function () {
			"step 0";
			trigger.player
				.chooseCard(`交给${get.translation(event.player)}一张锦囊牌`, function (card) {
					return get.type(card, "trick") == "trick";
				})
				.set("ai", function (card, cards) {
					let player = _status.event.player;
					let source = _status.event.source;
					let v = -get.value(card, player) * get.attitude(player, player) + get.value(card, source) * get.attitude(player, source);
					// console.log("card v", card.name, v);
					v -= get.effect(player, { name: "sha" }, source, player) * 7;
					// console.log("add v", v);
					return v;
				})
				.set("source", player);
			"step 1";
			if (result.bool) {
				if (get.attitude(trigger.player, player) > 0 && trigger.player.ai.shown < player.ai.shown) {
					trigger.player.addExpose(0.2);
				}
				player.gain(result.cards[0], trigger.player, "give");
			} else {
				if (get.attitude(trigger.player, player) < 0 && trigger.player.ai.shown < player.ai.shown && trigger.player.countCards("h") > 0) {
					trigger.player.addExpose(0.05);
				}
				player.useCard({ name: "sha", isCard: true }, trigger.player, "noai");
			}
		},
		ai: {
			threaten: 3,
		},
	},
	jlsgsy_nishi: {
		audio: "ext:极略/audio/skill:1", // audio: ['nishi'],
		forced: true,
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			return event.source && event.source != player;
		},
		logTarget: "source",
		line: false,
		content: function () {
			"step 0";
			if (trigger.source.countCards("e") == 0) {
				event.goto(2);
				return;
			}
			let choice = trigger.source.getCards("e").reduce((a, b) => a + get.value(b), 0) < get.effect(trigger.source, { name: "sha" }, player, trigger.source);
			trigger.source.chooseBool(`是否弃置装备区的牌？`, choice);
			"step 1";
			if (result.bool) {
				trigger.source.discard(trigger.source.getCards("e"));
				event.finish();
			}
			"step 2";
			player.useCard({ name: "sha", isCard: true }, trigger.source, "noai");
		},
		ai: {
			maixie_defend: true,
		},
	},
	jlsgsy_hengxing: {
		audio: "ext:极略/audio/skill:1",
		trigger: { source: "damageBegin" },
		filter: function (event, player) {
			return !player.isPhaseUsing();
		},
		forced: true,
		content: function () {
			trigger.num += 1;
		},
		ai: {
			damageBonus: true,
			skillTagFilter: function (player) {
				return !player.isPhaseUsing();
			},
		},
	},
	jlsgsy_baonudongzhuo: {
		inherit: "jlsgsy_baonu",
		animationStr: "统统杀光",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_bujiao: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return event.player != player;
		},
		check: () => Math.random() < 0.8,
		logTarget: "player",
		content() {
			"step 0";
			trigger.player.draw("nodelay");
			"step 1";
			trigger.player.addMark("jlsgsy_taiping");
			game.delayx();
		},
		global: "jlsgsy_bujiao_debuff",
	},
	jlsgsy_bujiao_debuff: {
		mod: {
			maxHandcard: function (player, num) {
				if (player.storage["jlsgsy_taiping"]) {
					return num - player.storage["jlsgsy_taiping"] * game.filterPlayer(p => p != player && p.hasSkill("jlsgsy_bujiao")).length;
				}
			},
		},
	},
	jlsgsy_taiping: {
		audio: "ext:极略/audio/skill:1", // audio: ['taiping'],
		trigger: { player: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return game.filterPlayer().some(p => p.hasMark("jlsgsy_taiping"));
		},
		check(event, player) {
			let marks = game.filterPlayer().reduce((a, b) => a + b.countMark("jlsgsy_taiping"), 0);
			let diff = game.filterPlayer(p => p != player).reduce((a, b) => a + b.countCards("h"), 0) - player.countCards("h");
			if (marks > diff) {
				return true;
			}
			return Math.random > 0.5;
		},
		content: function () {
			"step 0";
			let marks = game.filterPlayer().reduce((a, b) => a + b.countMark("jlsgsy_taiping"), 0);
			player.draw(marks);
			for (let p of game.filterPlayer()) {
				if (p.storage.jlsgsy_taiping) {
					p.storage.jlsgsy_taiping = 0;
					p.syncStorage("jlsgsy_taiping");
					p.unmarkSkill("jlsgsy_taiping");
				}
			}
			"step 1";
			let others = game.filterPlayer(p => p != player).reduce((a, b) => a + b.countCards("h"), 0);
			if (others >= player.countCards("h")) {
				event.finish();
				return;
			}
			player.chooseBool("是否对所有其他角色造成1点伤害？", true);
			"step 2";
			if (result.bool) {
				let targets = game.filterPlayer(p => p != player).sortBySeat();
				player.line(targets);
				targets.forEach(p => p.damage());
			}
		},
		marktext: "平",
		intro: {
			name: "太平",
			name2: "太平",
			content: "mark",
		},
	},
	jlsgsy_yaohuo: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			if (player == target) {
				return false;
			}
			let quota = player.countDiscardableCards(player, "he"),
				skills = target.getSkills(null, false, false);
			skills = target.getStockSkills(true, true).filter(s => {
				for (let i in target.disabledSkills) {
					if (i == s) {
						return false;
					}
				}
				return skills.includes(s);
			});
			return (target.countCards("h") > 0 && quota >= target.countCards("h")) || (skills.length && quota >= skills.length);
		},
		delay: false,
		init(player) {
			player.storage.jlsg_yaohuo_retrieve = new Map();
		},
		content: function () {
			"step 0";
			let quota = player.countDiscardableCards(player, "he"),
				skills = target.getSkills(null, false, false);
			event.skills = target.getStockSkills(true, true).filter(s => {
				for (let i in target.disabledSkills) {
					if (i == s) {
						return false;
					}
				}
				return skills.includes(s);
			});
			let list = [];
			if (target.countCards("h") > 0 && quota >= target.countCards("h")) {
				list.push(`弃置${get.cnNumber(target.countCards("h"))}张牌并获得${get.translation(target)}的所有手牌。`);
			}
			if (event.skills.length && quota >= event.skills.length) {
				list.push(`弃置${get.cnNumber(event.skills.length)}张牌并取走${get.translation(target)}的所有技能。`);
			}
			event.list = list;
			player.chooseControlList(list, true);
			"step 1";
			event.choseCard = event.list[result.index].includes("并获得");
			if (event.choseCard) {
				player.chooseToDiscard(target.countCards("h"), true, "he");
			} else {
				player.chooseToDiscard(event.skills.length, true, "he");
			}
			"step 2";
			if (!result.bool) {
				event.finish();
				return;
			}
			if (event.choseCard) {
				player.gain(target.getCards("h"), target, "giveAuto");
				event.finish();
				return;
			}
			let addSkills = player.addTempSkills(event.skills, { player: "dieAfter" });
			addSkills.$handleInner = addSkills.$handle;
			addSkills.jlsg_yaohuo_target = target;
			addSkills.$handle = function () {
				let currentAdditional = Object.keys(this.player.additionalSkills);
				this.$handleInner.apply(this, arguments);
				let addtionalSkill = Object.keys(this.player.additionalSkills).removeArray(currentAdditional);
				console.assert(addtionalSkill.length == 1, "jlsg_yaohuo hook not working properly");
				if (!this.player.storage.jlsg_yaohuo_retrieve.has(this.jlsg_yaohuo_target)) {
					this.player.storage.jlsg_yaohuo_retrieve.set(this.jlsg_yaohuo_target, addtionalSkill[0]);
				}
			};

			target.storage.jlsgsy_yaohuo2 = target.storage.jlsgsy_yaohuo2 || [];
			target.storage.jlsgsy_yaohuo2.addArray(event.skills);
			target.storage.jlsgsy_yaohuo2_player = player;
			target.addTempSkill("jlsgsy_yaohuo2", { player: "phaseBeginStart" });
		},
		group: "jlsgsy_yaohuo_clear",
		ai: {
			order: 9.5,
			result: {
				target: function (player, target) {
					if (target.num("h") < 3) {
						return 0;
					}
					return -jlsg.relu(get.attitude(player, target));
				},
			},
			expose: 0.2,
		},
	},
	jlsgsy_yaohuo2: {
		init: function (player, skill) {
			player.disableSkill(skill, player.storage.jlsgsy_yaohuo2);
		},
		onremove: function (player, skill) {
			player.enableSkill(skill);
			if (player.storage.jlsgsy_yaohuo2_player) {
				let zj = player.storage.jlsgsy_yaohuo2_player;
				if (zj.storage.jlsg_yaohuo_retrieve) {
					let retrieve = zj.storage.jlsg_yaohuo_retrieve;
					if (retrieve.get(player)) {
						zj.removeAdditionalSkills(retrieve.get(player));
						retrieve.delete(player);
					}
				}
			}
			player.storage.jlsgsy_yaohuo2 = [];
			player.storage.jlsgsy_yaohuo2_player = null;
		},
		locked: true,
		mark: true,
		charlotte: true,
		intro: {
			content: function (storage, player, skill) {
				var list = [];
				for (var i in player.disabledSkills) {
					if (player.disabledSkills[i].includes(skill)) {
						list.push(i);
					}
				}
				if (list.length) {
					var str = "失效技能：";
					for (var i = 0; i < list.length; i++) {
						if (lib.translate[list[i] + "_info"]) {
							str += get.translation(list[i]) + "、";
						}
					}
					return str.slice(0, str.length - 1);
				}
			},
		},
	},
	jlsgsy_yaohuo_clear: {
		trigger: { global: "dieAfter" },
		silent: true,
		charlotte: true,
		filter(event, player) {
			return event.player.storage.jlsgsy_yaohuo2_player === player && event.player.storage.jlsgsy_yaohuo2 && player.storage.jlsg_yaohuo_retrieve;
		},
		content() {
			let retrieve = player.storage.jlsg_yaohuo_retrieve;
			if (retrieve.get(trigger.player)) {
				zj.removeAdditionalSkills(retrieve.get(trigger.player));
				retrieve.delete(trigger.player);
			}
		},
	},
	jlsgsy_sanzhi: {
		audio: "ext:极略/audio/skill:1",
		init(player) {
			player.storage["jlsgsy_sanzhi"] = [];
		},
		silent: true,
		trigger: { player: "useCardAfter" },
		filter(event, player) {
			return !player.getStorage("jlsgsy_sanzhi").includes(get.type(event.card, "trick"));
		},
		content: function () {
			"step 0";
			player.storage.jlsgsy_sanzhi.add(get.type(trigger.card, "trick"));
			if (player.hasSkill("jlsgsy_sanzhi")) {
				player.markSkill("jlsgsy_sanzhi");
			}
			if (player.getStorage("jlsgsy_sanzhi").length >= 3) {
				player.storage.jlsgsy_sanzhi = [];
				player.chooseBool(get.prompt2(event.name));
			} else {
				event.finish();
			}
			"step 1";
			if (!result.bool) {
				event.finish();
				return;
			}
			player.logSkill(event.name);
			game.filterPlayer(p => p != player).forEach(p => p.addMark("jlsgsy_taiping"));
		},
		intro: {
			content: function (storage, player, skill) {
				if (!storage.length) {
					return "还未记录牌类别";
				}
				return "使用了" + storage.map(t => lib.translate[t]).join();
			},
		},
	},
	jlsgsy_baonuzhangjiao: {
		inherit: "jlsgsy_baonu",
		animationStr: "招神劾鬼, 统摄天地!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_baonucaifuren: {
		inherit: "jlsgsy_baonu",
		animationStr: "别想逃出我的手掌心!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_dihui: {
		audio: "ext:极略/audio/skill:2", // audio: ['dihui', 2],
		enable: "phaseUse",
		usable: 1,
		complexCard: true,
		filter: function (event, player) {
			let players = game.filterPlayer();
			for (let i = 0; i < players.length - 1; ++i) {
				if (players[i].hp != players[i + 1].hp) {
					return true;
				}
			}
			return false;
		},
		filterTarget: function (card, player, target) {
			if (ui.selected.targets.length == 1) {
				return target.hp < ui.selected.targets[0].hp;
			}
			let min = Math.min(...game.filterPlayer().map(c => c.hp));
			return target.hp > min;
		},
		multitarget: true,
		targetprompt: ["造成伤害", "受到伤害"],
		selectTarget: 2,
		prompt2: "请选择造成伤害与受到伤害的角色",
		content: function () {
			"step 0";
			// targets[0].line(targets[1], 'green');
			targets[1].damage(targets[0]);
			if (targets[1].ai.shown > player.ai.shown) {
				player.addExpose(0.2);
			}
			"step 1";
			if (player.isDamaged() && targets[0] != player) {
				player.recover();
			}
		},
		ai: {
			order: 9.5,
			result: {
				target: function (player, target) {
					var att = ai.get.attitude(player, target);
					if (att < 0) {
						return att;
					}
				},
			},
			// expose: 0.2
		},
	},
	jlsgsy_luansi: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			if (!target.countCards("h")) {
				return false;
			}
			if (ui.selected.targets.length) {
				return !target.hasSkillTag("noCompareTarget");
			} else {
				return !target.hasSkillTag("noCompareSource");
			}
		},
		filter: function (event, player) {
			return game.countPlayer(p => p.countCards("h")) >= 2;
		},
		multitarget: true,
		targetprompt: ["发起拼点", "被拼点"],
		selectTarget: 2,
		prompt: "乱嗣：选择两名拼点目标,然后你弃置没赢的角色的两张牌。若拼点赢的角色不是你，你摸两张牌",
		async content(event, trigger, player) {
			const [target1, target2] = event.targets;
			target1.line(target2, "green");
			const result = await target1.chooseToCompare(target2).forResult();
			const lose = [];
			if (result.winner) {
				lose.add(result.winner == target1 ? target2 : target1);
			} else if (result.tie) {
				lose.addArray(event.targets);
			}
			for (const target of lose) {
				if (target.isIn() && target.countDiscardableCards(player, "he")) {
					await player.discardPlayerCard(target, "he", true, 2);
				}
			}
			if (!result.winner || result.winner != player) {
				await player.draw(2);
			}
		},
		ai: {
			order: 8,
			result: {
				target: function (player, target) {
					if (game.players.length <= 2) {
						return 0;
					}
					if (target.countCards("he") < 1) {
						return 0;
					}
					var att = ai.get.attitude(player, target);
					if (att < 0) {
						return -target.countCards("he");
					}
				},
			},
		},
	},
	jlsgsy_huoxin: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "damageBegin4" },
		filter: function (event, player, name) {
			if (event.num < 1) {
				return false;
			}
			return event.source && event.source.isIn();
		},
		forced: true,
		logTarget: "source",
		async content(event, trigger, player) {
			const result = await trigger.source
				.chooseBool(`###${get.translation(player)}对你发动了祸心###是否令${get.translation(player)}获得你区域里的各一张牌？否则其防止此次伤害且你失去一点体力`)
				.set("ai", (event, source) => {
					const player = event.player;
					const losehp = get.effect(source, { name: "losehp" }, player, source),
						damage = get.damageEffect(player, source, source, event.getTrigger().nature),
						gain = get.effect(source, { name: "shunshou_copy" }, player, source);
					return gain + damage > losehp;
				})
				.forResult();
			if (result.bool) {
				let position = "";
				for (let i of "hej") {
					if (trigger.source.countGainableCards(player, i)) {
						position += i;
					}
				}
				if (position.length > 0) {
					await player
						.gainPlayerCard(trigger.source, position, position.length, "祸心：获得每个区域各一张牌")
						.set("filterButton", button => {
							const player = get.player(),
								target = get.event().target;
							if (!lib.filter.canBeGained(button.link, player, target)) {
								return false;
							}
							if (ui.selected.buttons?.length) {
								const cards = ui.selected.buttons.map(i => i.link);
								for (const card of cards) {
									if (get.position(card) == get.position(button.link)) {
										return false;
									}
								}
							}
							return true;
						})
						.set("target", trigger.source);
				}
			} else {
				game.log(player, "防止了伤害");
				trigger.cancel();
				await trigger.source.loseHp(1);
			}
		},
		ai: {
			maixie_defend: true,
		},
	},
	jlsgsy_shiao: {
		audio: "ext:极略/audio/skill:true",
		trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
		filter: (event, player) => player.hasUseTarget("sha", false),
		direct: true,
		async content(event, trigger, player) {
			player.chooseUseTarget("###是否发动【恃傲】？###视为使用一张【杀】", { name: "sha" }, false, "nodistance").set("logSkill", "jlsgsy_shiao");
		},
	},
	jlsgsy_kuangxi: {
		audio: "ext:极略/audio/skill:2", // audio: ['kuangxi', 2],
		trigger: { player: "useCardEnd" },
		filter: function (event, player) {
			let targets = event.targets.slice().remove(player);
			if (!targets || targets.length == 0 || !event.card) {
				return false;
			}
			if (event.card.name == "wuxie") {
				return false;
			}
			if (get.type2(event.card) != "trick") {
				return false;
			}
			return targets.some(target => player.canUse(get.autoViewAs({ name: "sha" }, []), target, false));
		},
		check: function (event, player) {
			let targets = event.targets
				.slice()
				.remove(player)
				.filter(target => player.canUse(get.autoViewAs({ name: "sha" }, []), target, false));
			let att = 0;
			for (var i = 0; i < targets.length; i++) {
				att += get.effect(targets[i], get.autoViewAs({ name: "sha" }, []), player, player);
			}
			return att > 1;
		},
		async content(event, trigger, player) {
			const targets = trigger.targets
				.slice()
				.remove(player)
				.filter(target => player.canUse(get.autoViewAs({ name: "sha" }, []), target, false));
			await player.useCard(get.autoViewAs({ name: "sha" }, []), targets, false);
			if (!player.hasHistory("sourceDamage", e => e.getParent(3) === event)) {
				if (player.isIn()) {
					await player.loseHp(1);
				}
			}
		},
		ai: {
			effect: {
				player: function (card, player, target) {
					if (get.type(card) == "trick") {
						return [1, 2];
					}
				},
			},
		},
	},
	jlsgsy_baonuweiyan: {
		inherit: "jlsgsy_baonu",
		animationStr: "老子岂能受你们摆布!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_fangu: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "damageEnd",
		},
		forced: true,
		priority: 100,
		async content(event, trigger, player) {
			const cards = Array.from(ui.ordering.childNodes);
			while (cards.length) {
				cards.shift().discard();
			}
			game.broadcastAll(ui.clear);
			let evt = trigger.getParent(1, true);
			while (evt?.name != "phaseLoop") {
				if (evt) {
					if (evt.name == "phase") {
						evt.pushHandler("onPhase", (evtx, option) => {
							evtx.step = 13;
							evtx.num = evtx.phaseList.length;
							game.broadcastAll(function (player) {
								player.classList.remove("glow_phase");
								if (_status.currentPhase) {
									game.log(_status.currentPhase, "结束了回合");
									delete _status.currentPhase;
								}
							}, evtx.player);
						});
					}
					evt.finish();
					evt._triggered = null;
					evt = evt.getParent(1, true);
				} else {
					break;
				}
			}
			//也不知道为啥能触发结束阶段的技能，还原就是了
			//沟槽的，只触发结束阶段，而且能反复触发
			evt = trigger.getParent("phase", true, true);
			if (evt?.phaseList?.some(i => i.startsWith("phaseJieshu"))) {
				await evt.player.phaseJieshu();
			}
			_status.paused = false;
			player.insertPhase(event.name);
		},
	},
	jlsgsy_canlue: {
		audio: "ext:极略/audio/skill:1", // audio: ['jlsgsy_canlue'],
		trigger: { source: "gainEnd" },
		forced: true,
		filter: function (event, player) {
			return event.player && event.player != player && event.player.isIn();
		},
		logTarget: "player",
		content: function () {
			trigger.player.chooseToDiscard("he", trigger.cards.length, true);
		},
		group: ["jlsgsy_canlue2"],
	},
	jlsgsy_canlue2: {
		audio: "jlsgsy_canlue",
		trigger: { player: "gainEnd" },
		filter: function (event, player) {
			return event.source && event.source != player && event.source.isIn();
		},
		check: function (event, player) {
			return get.damageEffect(event.source, player, player) > 0;
		},
		prompt2: function (event, player) {
			return `对其造成${event.cards.length}点伤害`;
		},
		logTarget: "source",
		content: function () {
			trigger.source.damage(trigger.cards.length, player);
		},
	},
	jlsgsy_chanxian: {
		audio: "ext:极略/audio/skill:2", // audio: ['jlsgsy_chanxian', 2],
		enable: "phaseUse",
		usable: 1,
		selectTarget: 2,
		multitarget: true,
		complexTarget: true,
		filterTarget(card, player, target) {
			if (ui.selected.targets.length) {
				const from = ui.selected.targets[0];
				const js = from.getVCards("j");
				for (let i of js) {
					if (target.canAddJudge(i)) {
						return true;
					}
				}
				if (target.isMin()) {
					return false;
				}
				const es = from.getVCards("e");
				for (let i of es) {
					if (target.isEmpty(get.subtype(i))) {
						return true;
					}
				}
				return from.countCards("h") > 0;
			}
			return target.countVCards("ej") > 0 || target.countCards("h") > 0;
		},
		targetprompt: ["被移走", "移动目标"],
		async content(event, trigger, player) {
			const [from, to] = event.targets;
			const result = await player
				.choosePlayerCard("hej", true, from)
				.set("filterButton", function (button) {
					const to = _status.event.to;
					if (get.position(button.link) == "e") {
						return to.isEmpty(get.subtype(button.link));
					}
					return true;
				})
				.set("ai", function (button) {
					const player = _status.event.player,
						from = _status.event.from,
						to = _status.event.to;
					if (get.attitude(player, from) > 0 && get.attitude(player, to) < 0) {
						if (get.position(button.link) == "j") {
							return 12;
						}
						if (get.value(button.link, from) < 0 && get.effect(to, button.link, player, to) > 0) {
							return 10;
						}
						return 0;
					} else {
						if (get.position(button.link) == "j") {
							return -10;
						}
						return get.value(button.link) * get.effect(to, button.link, player, to);
					}
				})
				.set("from", from)
				.set("to", to)
				.setContent(lib.skill.jlsgsy_chanxian.choosePlayerCard)
				.forResult();
			if (result.bool && result.links.length) {
				const link = result.links[0];
				if (get.position(link) != "h") {
					if (from.getVCards("e").includes(link)) {
						if (!link.cards?.length) {
							from.removeVirtualEquip(link);
						}
						await to.equip(link);
					} else if (from.getVCards("j").includes(link)) {
						if (!link.cards?.length) {
							from.removeVirtualJudge(link);
						}
						await to.addJudge(link, link?.cards);
					}
					if (link.cards?.length) {
						from.$give(link.cards, to, false);
					}
					game.log(from, "的", link, "被移动给了", to);
				} else {
					await to.gain(link, from, "giveAuto");
				}
				await game.delay();
				const juedou = get.autoViewAs({ name: "juedou", isCard: true }, []);
				if (from.canUse(juedou, to, false)) {
					await from.useCard(juedou, to, "noai");
					const damaged = game
						.getGlobalHistory("changeHp", evt => {
							if (evt.parent?.name != "damage") {
								return false;
							}
							return evt.parent.card?.name == "juedou" && evt.getParent(4) == event;
						})
						.map(evt => evt.player)
						.flat()
						.sortBySeat(_status.currentPhase);
					for (let current of damaged) {
						if (!current.countGainableCards(player, "he")) {
							continue;
						}
						await player.gainPlayerCard(current, true);
					}
				}
			}
		},
		choosePlayerCard: function () {
			"step 0";
			if (!event.dialog) {
				event.dialog = ui.create.dialog("hidden");
			} else if (!event.isMine()) {
				event.dialog.style.display = "none";
			}
			if (event.prompt) {
				event.dialog.add(event.prompt);
			} else {
				event.dialog.add("选择" + get.translation(target) + "的一张牌");
			}
			if (event.prompt2) {
				event.dialog.addText(event.prompt2);
			}
			let expand_length = 0;
			const select = get.select(event.selectButton);
			const directFilter = event.forced && typeof event.filterOk != "function" && typeof event.selectButton != "function" && event.filterButton == lib.filter.all;
			let directh = !lib.config.unauto_choose && !event.isOnline() && select[0] == select[1] && (!event.complexSelect || select[1] === 1);

			for (var i = 0; i < event.position.length; i++) {
				if (event.position[i] == "h") {
					var hs = target.getCards("h");
					if (hs.length) {
						expand_length += Math.ceil(hs.length / 6);
						var title = event.dialog.add('<div class="text center" style="margin: 0px;">手牌区</div>');
						title.style.margin = "0px";
						title.style.padding = "0px";
						hs.randomSort();
						if (event.visible || target.isUnderControl(true) || player.hasSkillTag("viewHandcard", null, target, true)) {
							event.dialog.add(hs);
							directh = false;
						} else {
							var shown = hs.filter(card => get.is.shownCard(card));
							if (shown.length) {
								var hidden = hs.filter(card => !shown.includes(card));
								var buttons = ui.create.div(".buttons", event.dialog.content);
								event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(shown, "card", buttons));
								event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(hidden, "blank", buttons));
								if (event.dialog.forcebutton !== false) {
									event.dialog.forcebutton = true;
								}
								if (event.dialog.buttons.length > 3) {
									event.dialog.classList.remove("forcebutton-auto");
								} else if (!event.dialog.noforcebutton) {
									event.dialog.classList.add("forcebutton-auto");
								}
								directh = false;
							} else {
								event.dialog.add([hs, "blank"]);
							}
						}
					}
				} else if (event.position[i] == "e") {
					var es = target.getVCards("e");
					if (es.length) {
						expand_length += Math.ceil(es.length / 6);
						var title = event.dialog.add('<div class="text center" style="margin: 0px;">装备区</div>');
						title.style.margin = "0px";
						title.style.padding = "0px";
						event.dialog.add([es, "vcard"]);
						directh = false;
					}
				} else if (event.position[i] == "j") {
					var js = target.getVCards("j");
					if (js.length) {
						expand_length += Math.ceil(js.length / 6);
						var title = event.dialog.add('<div class="text center" style="margin: 0px;">判定区</div>');
						title.style.margin = "0px";
						title.style.padding = "0px";
						var shown = js.filter(card => {
							var name = card.viewAs || card.name,
								info = lib.card[name];
							if (!info || !info.blankCard) {
								return true;
							}
							return false;
						});
						if (shown.length < js.length && !target.isUnderControl(true)) {
							var hidden = js.filter(card => !shown.includes(card));
							var buttons = ui.create.div(".buttons", event.dialog.content);
							event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(shown, "card", buttons));
							event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(hidden, "blank", buttons));
							if (event.dialog.forcebutton !== false) {
								event.dialog.forcebutton = true;
							}
							if (event.dialog.buttons.length > 3) {
								event.dialog.classList.remove("forcebutton-auto");
							} else if (!event.dialog.noforcebutton) {
								event.dialog.classList.add("forcebutton-auto");
							}
						} else {
							event.dialog.add([js, "vcard"]);
						}
						directh = false;
					}
				}
			}
			if (event.dialog.buttons.length == 0) {
				event.finish();
				return;
			} else {
				if (event.isMine()) {
					if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
						ui.click.cancel();
						return;
					}
					event.dialog.open();
					game.check();
					game.pause();
					if (expand_length > 2) {
						ui.arena.classList.add("choose-player-card");
						event.dialog.classList.add("fullheight");
					}
				} else if (event.isOnline()) {
					event.send();
				} else {
					event.result = "ai";
				}
			}
			"step 1";
			if (event.result == "ai") {
				game.check();
				if ((ai.basic.chooseButton(event.ai) || forced) && (!event.filterOk || event.filterOk())) {
					ui.click.ok();
				} else {
					ui.click.cancel();
				}
			}
			event.dialog.close();
			if (event.result.links) {
				event.result.cards = event.result.links.slice(0);
			}
			event.resume();
			setTimeout(function () {
				ui.arena.classList.remove("choose-player-card");
			}, 500);
		},
		ai: {
			order: 8,
			result: {
				target: function (player, target) {
					return player == target ? -1 : Math.random();
				},
				player: 1,
			},
		},
	},
	jlsgsy_luanzheng: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "useCardToPlayer" },
		usable: 1,
		filter(event, player) {
			return event.targets.length == 1 && event.player != player && ["basic", "trick"].includes(get.type(event.card)) && game.countPlayer(p => !event.targets.includes(p));
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt("jlsgsy_luanzheng"), `每回合限一，你可以为${get.translation(trigger.card)}额外指定一个目标`)
				.set("filterTarget", (_, player, target) => !get.event().targetsx.includes(target))
				.set("ai", target => get.effect(target, get.event().card, get.event().user, player))
				.set("targetsx", trigger.targets)
				.set("card", trigger.card)
				.set("user", trigger.player)
				.forResult();
		},
		async content(event, trigger, player) {
			game.log(event.targets, "成为了", trigger.card, "额外目标");
			trigger.targets.addArray(event.targets);
		},
		ai: {
			threaten: 3,
		},
	},
	jlsgsy_baonuzhangrang: {
		inherit: "jlsgsy_baonu",
		animationStr: "灵帝, 都得叫我一声爹呢!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_baonudiaochan: {
		inherit: "jlsgsy_baonu",
		animationStr: "可惜、已经晚了！",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_meihuo: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			if (!player.countCards("h")) {
				return false;
			}
			return game.countPlayer(current => current != player && current.hasSex("male"));
		},
		filterTarget(card, player, target) {
			return player != target && target.hasSex("male");
		},
		selectCard: [1, Infinity],
		filterCard: true,
		check(card) {
			if (card.name == "du") {
				return 20;
			}
			const player = get.owner(card);
			if (card.name != "sha" && get.type(card) != "trick") {
				return 0;
			}
			let info = get.info(card);
			if (info.singleCard || info.notarget) {
				return 0;
			}
			const users = game.filterPlayer(current => current != player);
			return users.some(user => {
				const att = get.sgnAttitude(player, user),
					eff = user.getUseValue(card, false, false);
				return att * eff > 0;
			});
		},
		discard: false,
		lose: false,
		delay: false,
		async content(event, trigger, player) {
			const {
				targets: [target],
				cards,
			} = event;
			await player.give(cards, target);
			const useCards = target.getCards("h", c => {
				if (c.name != "sha" && get.type(c) != "trick") {
					return false;
				}
				return target.hasUseTarget(c, false, false);
			});
			const { targets: toTargets } = await player
				.chooseTarget([1, Infinity], `请选择${get.translation(target)}使用牌的目标"`, true)
				.set("filterTarget", (_, player, target) => target != get.event().preTarget)
				.set("ai", target => {
					const player = get.player(),
						preTarget = get.event().preTarget,
						useCards = get.event().useCards;
					return useCards.reduce((sum, card) => {
						if (!preTarget.canUse(card, target, false, false)) {
							return sum;
						}
						return sum + get.effect(target, card, preTarget, player);
					}, 0);
				})
				.set("preTarget", target)
				.set("useCards", useCards)
				.forResult();
			if (!useCards.length || !toTargets?.length) {
				await game.delay();
				return;
			}
			player.line(toTargets);
			useCards.randomSort();
			while (useCards.length) {
				if (!target.isIn()) {
					break;
				}
				let card = useCards.shift();
				if (!target.getCards("h").includes(card)) {
					continue;
				}
				let targets = toTargets.filter(current => target.canUse(card, current, false, false) && current.isIn());
				if (targets.length) {
					await target.useCard(card, targets, "noai");
				}
			}
		},
		ai: {
			order: 10,
			result: {
				target(player, target) {
					if (ui.selected.cards.some(card => card.name == "du")) {
						return -0.5;
					}
					if (player.storage.jlsgsy_meihuo) {
						return;
					}
					player.setStorage("jlsgsy_meihuo", true);
					const useEff = ui.selected.cards.reduce((sum, card) => target.getUseValue(card, false, false), 0);
					player.setStorage("jlsgsy_meihuo", undefined);
					return Math.log(useEff);
				},
			},
		},
	},
	jlsgsy_yaoyan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { target: "useCardToTarget" },
		filter(event, player) {
			const info = get.info(event.card);
			if (info.multitarget) {
				return false;
			}
			return event.player != player && ["basic", "trick"].includes(get.type(event.card)) && !event.targets.includes(event.player);
		},
		forced: true,
		logTarget: "player",
		async content(event, trigger, player) {
			game.log(trigger.player, "成为", trigger.card, "的额外目标");
			trigger.getParent().targets.push(trigger.player);
			trigger.getParent().triggeredTargets2.push(trigger.player);
			await game.delayx();
		},
		ai: {
			effect: {
				target_use(card, player, target) {
					if (player == target) {
						return;
					}
					const info = get.info(card);
					if (["basic", "trick"].includes(get.type(card)) || info.multitarget) {
						return;
					}
					if (target.storage.jlsgsy_yaoyan) {
						return;
					}
					target.setStorage("jlsgsy_yaoyan", true);
					let result = [1, 0, 1, get.effect(player, card, player, player) / 2];
					target.setStorage("jlsgsy_yaoyan", undefined);
					return result;
				},
			},
		},
	},
	jlsgsy_miluan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageEnd" },
		filter(event, player) {
			return game.filterPlayer(current => current != player).some(current => current.countDiscardableCards(player, "h"));
		},
		check(event, player) {
			let gain = game.filterPlayer(current => current != player).reduce((a, b) => a + b.countDiscardableCards(player, "h"), 0);
			let lose = Math.floor((gain + player.countCards("h")) / 2);
			return gain * 1.2 > lose;
		},
		logTarget(event, player) {
			return game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase);
		},
		async content(event, trigger, player) {
			const gainCards = [];
			for (let target of event.targets) {
				let gainableCards = target.getGainableCards(player, "h");
				if (gainableCards.length) {
					target.$give(gainableCards, player);
					gainCards.addArray(gainableCards);
				}
			}
			if (gainCards.length) {
				await game
					.loseAsync({
						gain_list: [[player, gainCards]],
						animate: "gain",
					})
					.setContent("gaincardMultiple");
			} else {
				await game.delay();
			}
			if (!player.getCards("h").length) {
				return;
			}
			const result = await player.chooseCard(true, "h", Math.floor(player.countCards("h") / 2)).forResult();
			if (!result?.bool || !result.cards?.length) {
				return;
			}
			const giveCards = result.cards;
			const gain_list = [];
			let cards = giveCards.slice().randomSort();
			if (giveCards.length <= event.targets.length) {
				let targets = event.targets.slice().randomSort();
				while (cards.length) {
					gain_list.push([targets.randomRemove(), cards.randomRemove(1)]);
				}
			} else {
				let giveNum = cards.length;
				for (let target of event.targets) {
					let num = Math.floor(Math.random() * giveNum);
					giveNum -= num;
					let cardsx = cards.randomRemove(num + 1);
					gain_list.push([target, cardsx]);
				}
			}
			await game
				.loseAsync({
					gain_list,
					cards: giveCards,
					player,
					giver: player,
					animate: "giveAuto",
				})
				.setContent("gaincardMultiple");
		},
		ai: {
			maixie: true,
			maixie_hp: true,
		},
	},
	jlsgsy_baonuyuanshao: {
		inherit: "jlsgsy_baonu",
		animationStr: "都是蝼蚁！",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_mojian: {
		audio: "ext:极略/audio/skill:2",
		forced: true,
		trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
		filter(event, player) {
			if (event.name == "phaseZhunbei") {
				return true;
			}
			return game.hasPlayer(p =>
				p.getHistory("respond").some(e => {
					if (e.card.name != "shan") {
						return false;
					}
					let wj = e.getParent(2);
					return wj.name == "wanjian" && wj.card.jlsgsy_mojian;
				})
			);
		},
		content() {
			player.chooseUseTarget({ name: "wanjian", isCard: true, jlsgsy_mojian: true }, true);
		},
	},
	jlsgsy_zhuzai: {
		audio: "ext:极略/audio/skill:2",
		trigger: { source: "damageBegin1", player: "damageBegin1" },
		forced: true,
		filter(event, player) {
			return event.card && get.type2(event.card) == "trick";
		},
		content() {
			if (trigger.player == player) {
				trigger.num -= 1;
			}
			if (trigger.source == player) {
				trigger.num += 1;
			}
		},
		ai: {
			notrick: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.type(card) == "trick" && get.tag(card, "damage")) {
						return "zeroplayertarget";
					}
				},
			},
		},
	},
	jlsgsy_duoji: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "die" },
		filter(event, player) {
			return event.source == player;
		},
		forced: true,
		logTarget: "player",
		content() {
			player.gain(trigger.player.getCards("he"), "give");
			var skills = trigger.player.getSkills(null, false, false).filter(function (i) {
				var info = get.info(i);
				return info && !info.charlotte;
			});
			if (skills.length) {
				player.addSkills(skills);
			}
		},
	},
	jlsgsy_baonusunluban: {
		inherit: "jlsgsy_baonu",
		animationStr: "这般无礼！",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_quanqing: {
		audio: "ext:极略/audio/skill:2",
		init(player) {
			player.storage.jlsgsy_quanqing = {
				shown: [],
				targets: [],
			};
		},
		onremove: true,
		enable: "phaseUse",
		filter: function (event, player) {
			if (!player.storage.jlsgsy_quanqing) {
				return false;
			}
			return player.countCards("h", c => !player.getStorage("jlsgsy_quanqing").shown.includes(c)) && game.hasPlayer(current => lib.skill.jlsgsy_quanqing.filterTarget(null, player, current));
		},
		filterTarget: function (card, player, target) {
			return player != target && !player.getStorage("jlsgsy_quanqing").targets.includes(target);
		},
		filterCard: function (card, player) {
			return !player.getStorage("jlsgsy_quanqing").shown?.includes(card) || false;
		},
		check(card) {
			const player = get.player();
			let hs = player.getCards("h", c => !player.getStorage("jlsgsy_quanqing").shown.includes(c)).sort((a, b) => get.number(a, player) - get.number(b, player));
			return hs.filter((v, i) => i == 0 || i == hs.length - 1).includes(card);
		},
		discard: false,
		lose: false,
		delay: false,
		content() {
			"step 0";
			player.showCards(cards);
			player.storage.jlsgsy_quanqing.shown.add(cards[0]);
			player.storage.jlsgsy_quanqing.targets.add(target);
			if (target.countCards("he", c => get.number(c, target) > get.number(cards[0]))) {
				var next = target
					.chooseToDiscard(c => get.number(c) > _status.event.number)
					.set("number", get.number(cards[0]))
					.set("recover", player.isDamaged());
				if (get.attitude(target, player) < 0) {
					next.set("ai", c => {
						let v = 9 - get.value(c);
						if (_status.event.recover) {
							v += 4;
						}
						return v - 2 * Math.random();
					});
				} else {
					next.set("ai", () => 0);
				}
			} else {
				event.goto(2);
			}
			"step 1";
			if (result.bool) {
				delete player.storage.jlsgsy_quanqing.choice;
				event.finish();
			}
			"step 2";
			let list = get.inpileVCardList(v => {
				if (!["basic", "trick"].includes(get.type(v[2], null, false))) {
					return false;
				}
				let card = get.autoViewAs({ name: v[2], nature: v[3], isCard: true }, []);
				return target.hasUseTarget(card);
			});
			var next = player.chooseButton(["", `###权倾###请选择${get.translation(target)}使用的牌`, [list, "vcard"]]);
			next.ai = function (button) {
				return button.link[2] === _status.event.choice[0] && (button.link[3] || true) === (_status.event.choice[1] || true);
			};
			next.choice = player.storage.jlsgsy_quanqing.choice ?? [];
			"step 3";
			delete player.storage.jlsgsy_quanqing.choice;
			if (!result.bool) {
				event.finish();
				return;
			}
			let card = { name: result.links[0][2], nature: result.links[0][3] };
			event.card = card;
			let info = get.info(card);
			let range;
			if (!info.notarget) {
				let select = get.copy(info.selectTarget);
				if (select == undefined) {
					range = [1, 1];
				} else if (typeof select == "number") {
					range = [select, select];
				} else if (get.itemtype(select) == "select") {
					range = select;
				} else if (typeof select == "function") {
					range = select(card, target);
				}
				game.checkMod(card, target, range, "selectTarget", target);
			}
			if (info.notarget || range[1] == -1) {
				target.chooseUseTarget(card, true);
				event.goto(5);
				return;
			}
			var next = player.chooseTarget();
			next.set("_get_card", card);
			next.set("filterTarget", function (card, player, target) {
				return lib.filter.targetInRange(card, _status.event.subject, target) && lib.filter.targetEnabledx(card, _status.event.subject, target);
			});
			next.set("ai", function (target, targets) {
				return get.effect_use(target, [], _status.event.subject, _status.event.player);
			});
			next.set("selectTarget", range);
			next.set("forced", true);
			next.set("subject", target);
			next.set("prompt", `选择${get.translation(card)}的目标`);
			next.set("prompt2", `由${get.translation(target)}使用`);
			"step 4";
			if (result.bool) {
				target.useCard(event.card, result.targets, "noai");
			}
			"step 5";
			if (player.isDamaged()) {
				player.recover();
			}
		},
		ai: {
			order(skill, player) {
				if (!lib.skill.jlsgsy_quanqing.filter(null, player)) {
					return 0;
				}
				let hs = player.getCards("h", c => !player.getStorage("jlsgsy_quanqing").shown.includes(c));
				let numbers = hs.map(i => get.number(i, player)).filter(i => i != Infinity && typeof i == "number"),
					orders = hs.map(i => get.order(i, player)).filter(i => i != Infinity && typeof i == "number");
				return Math.max.apply(Math, numbers.concat(orders)) + 0.1;
			},
			result: {
				player(player, target) {
					const cards = get.inpileVCardList(v => {
						if (!["basic", "trick"].includes(get.type(v[2], null, false))) {
							return false;
						}
						let card = get.autoViewAs({ name: v[2], nature: v[3], isCard: true }, []);
						return target.hasUseTarget(card);
					});
					if (cards.length) {
						let choice,
							value = 0,
							keys = ["effect", "canUse", "effect_use", "getUseValue"];
						for (let [, , cardName, nature] of cards) {
							let card = get.autoViewAs({ name: cardName, nature: nature }, []); //神金传虚拟牌，cardid也不设置一下😅
							let newV = lib.skill.dcpandi.getUseValue(card, target, player);
							if (newV > value) {
								choice = [cardName, nature];
								value = newV;
							}
							for (let key of keys) {
								//补救措施
								let info = _status.event._tempCache[key];
								for (let i in info) {
									if (i.indexOf(player.playerid) > -1 && i.endsWith("-") && i.indexOf("c:") == -1) {
										delete _status.event._tempCache[key][i];
									}
								}
							}
						}
						if (choice) {
							player.storage.jlsgsy_quanqing.choice = choice;
							return 1;
						}
					}
					return 0;
				},
				target(player, target) {
					if (lib.skill.jlsgsy_quanqing.ai.result.player.apply(this, arguments) > 0) {
						if (Math.floor(Math.random() * 7) + 1 > get.number(ui.selected.cards[0], player)) {
							return 1;
						}
					}
					return -1;
				},
			},
		},
		group: ["jlsgsy_quanqing_temp"],
		subSkill: {
			temp: {
				charlotte: true,
				forced: true,
				popup: false,
				trigger: { player: "phaseUseAfter" },
				content() {
					lib.skill.jlsgsy_quanqing.init(player);
				},
			},
		},
	},
	jlsgsy_raomeng: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseJudgeBegin" },
		forced: true,
		filter(event, player) {
			return event.player != player && !event.player.countCards("j");
		},
		check(event, player) {
			return get.attitude(player, event.player) < 0 && !event.player.skipList.includes("phaseUse");
		},
		content() {
			trigger.player.executeDelayCardEffect("lebu");
		},
	},
	jlsgsy_yongjie: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseJieshuBegin" },
		filter(event, player) {
			let dealers = game.me.getAllHistory("damage").map(e => e.source);
			return game.hasPlayer(p => p != player && dealers.includes(p));
		},
		direct: true,
		content() {
			"step 0";
			player
				.chooseTarget(get.prompt2(event.name), [1, Infinity], (_, player, target) => target.getAllHistory("sourceDamage", e => e.player == _status.event.player).length)
				.set("ai", (target, targets) => {
					if (get.attitude(_status.event.player, target) >= 0) {
						return 0;
					}
					let cnt = target.getAllHistory("sourceDamage", e => e.player == _status.event.player).length;
					let cnt2 = target.countDiscardableCards(target, "he");
					return Math.min(target.isHealthy() ? 2 : 1, cnt < cnt2 ? cnt : Infinity) - (get.attitude(_status.event.player, target) + Math.random()) / 10;
				});
			"step 1";
			if (!result.bool) {
				event.finish();
				return;
			}
			event.targets = result.targets.sortBySeat();
			player.logSkill(event.name, event.targets);

			for (let p of event.targets.slice().sort((a, b) => b.ai.shown - a.ai.shown)) {
				if (p.ai.shown > player.ai.shown) {
					player.addExpose(0.2);
				}
			}
			"step 2";
			var target = event.targets.shift();
			event.target = target;
			if (!target) {
				event.finish();
				return;
			}
			var cnt = target.getAllHistory("sourceDamage", e => e.player == _status.event.player).length;
			var cnt2 = target.countDiscardableCards(target, "he");
			if (cnt > cnt2) {
				event._result = { bool: false };
				return;
			}
			target
				.chooseToDiscard(cnt)
				.set("prompt2", "否则减一点体力上限")
				.set("ai", c => {
					let player = _status.event.player;
					if (player.maxHp == 1 && !player.storage.nohp) {
						return 20 - get.value(c);
					}
					let v = 7 - _status.event.selectCard[0] - get.value(c);
					if (player.isHealthy()) {
						v += 3;
					}
					return v;
				});
			"step 3";
			if (!result.bool) {
				target.loseMaxHp();
			}
			event.goto(2);
		},
	},
	jlsgsy_baonucaocao: {
		inherit: "jlsgsy_baonu",
		animationStr: "休叫天下人负我！",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_weiwu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageEnd" },
		frequent: true,
		content() {
			"step 0";
			player.draw(2);
			if (trigger.card && trigger.card.isCard && trigger.cards.length) {
				let cards = trigger.cards.slice().filterInD("o");
				let prompt = `是否获得${get.translation(cards)}与弃牌堆的所有${get.translation({ name: trigger.card.name, nature: trigger.card.nature })}?`;
				player.chooseBool(prompt).set("frequentSkill", "jlsgsy_weiwu");
			} else {
				event.finish();
			}
			"step 1";
			if (!result.bool) {
				event.finish();
				return;
			}
			var cards = trigger.cards
				.slice()
				.filterInD("o")
				.concat(Array.from(ui.discardPile.childNodes).filter(c => c.name == trigger.card.name && ((!c.nature && !trigger.card.nature) || c.nature === trigger.card.nature)));
			player.gain(cards, "gain2");
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target: function (card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) {
						return [1, -1];
					}
					if (get.tag(card, "damage")) {
						return [1, 2];
					}
				},
			},
		},
	},
	jlsgsy_duzun: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseBegin" },
		init(player) {
			player.storage.jlsgsy_duzun = new Map();
		},
		filter(event, player) {
			let cnt = player.storage.jlsgsy_duzun.get(event.player);
			return event.player != player && (!cnt || cnt < 2);
		},
		logTarget: "player",
		forced: true,
		content() {
			"step 0";
			let triggeredCnt = player.storage.jlsgsy_duzun.get(trigger.player) || 0;
			player.storage.jlsgsy_duzun.set(trigger.player, triggeredCnt + 1);

			event.allChoices = ["使用【杀】的次数上限", "摸牌阶段摸牌基数", "体力上限"];
			event.choices = [];
			if (trigger.player.getCardUsable("sha", true) > 0) {
				event.choices.push(event.allChoices[0]);
			}
			if ((trigger.player.storage.jlsgsy_duzun_buff || [null, 0])[1] > -2) {
				event.choices.push(event.allChoices[1]);
			}
			event.choices.push(event.allChoices[2]);
			var choice = (function () {
				let isFriend = get.attitude(trigger.player, player) > 0;
				if (isFriend) {
					if (event.choices.includes(event.allChoices[0]) && trigger.player.getCardUsable("sha", true) > 1) {
						return 0;
					}
					if (trigger.player.getDamagedHp() > 1) {
						return event.choices.indexOf(event.allChoices[2]);
					}
					return event.choices.map((_, i) => i).randomGet();
				}
				// player.hasSkill('jlsgsy_longbian')
				if (trigger.player.maxHp > 1) {
					return event.choices.indexOf(event.allChoices[2]);
				}
				return event.choices.map((_, i) => i).randomGet();
			})();
			trigger.player
				.chooseControlList(event.choices, true)
				.set("ai", function () {
					return _status.event.choice;
				})
				.set("choice", choice);
			"step 1";
			player.addSkill("jlsgsy_duzun_buff");
			trigger.player.addSkill("jlsgsy_duzun_buff");
			var index = event.allChoices.indexOf(event.choices[result.index]);
			lib.skill.jlsgsy_duzun_buff.addMark(trigger.player, index, -1);
			lib.skill.jlsgsy_duzun_buff.addMark(player, index, 1);
		},
		subSkill: {
			buff: {
				addMark(player, type, cnt) {
					if (type == 2) {
						if (cnt > 0) {
							player.gainMaxHp(cnt);
						} else {
							player.loseMaxHp(-cnt);
						}
						return;
					}
					if (!player.storage.jlsgsy_duzun_buff) {
						player.storage.jlsgsy_duzun_buff = [0, 0];
					}
					player.storage.jlsgsy_duzun_buff[type] += cnt;
					if (player.storage.jlsgsy_duzun_buff.some(i => i)) {
						player.markSkill("jlsgsy_duzun_buff");
					} else {
						player.unmarkSkill("jlsgsy_duzun_buff");
					}
				},
				audio: "jlsgsy_duzun",
				locked: false,
				marktext: "尊",
				intro: {
					markcount(storage, player) {
						return Math.abs(storage.reduce((a, b) => a + b));
					},
					content(storage, player) {
						let str = [];
						if (storage[0] != 0) {
							str.push("使用【杀】的次数上限" + (storage[0] < 0 ? "" : "+") + storage[0]);
						}
						if (storage[1] != 0) {
							str.push("摸牌阶段摸牌基数" + (storage[1] < 0 ? "" : "+") + storage[1]);
						}
						return str.join("<br>");
					},
				},
				mod: {
					cardUsable(card, player, num) {
						if (card.name == "sha" && player.storage.jlsgsy_duzun_buff) {
							return num + player.storage.jlsgsy_duzun_buff[0];
						}
					},
				},
				trigger: { player: "phaseDrawBegin2" },
				forced: true,
				filter: function (event, player) {
					return !event.numFixed && player.storage.jlsgsy_duzun_buff && player.storage.jlsgsy_duzun_buff[1];
				},
				content: function () {
					trigger.num += player.storage.jlsgsy_duzun_buff[1];
					if (trigger.num < 0) {
						trigger.num = 0;
					}
				},
			},
		},
		ai: {
			threaten: 2.5,
		},
	},
	jlsgsy_longbian: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseBegin" },
		direct: true,
		countShaUsable(player) {
			const card = get.autoViewAs({ name: "sha" }),
				name = "cardUsable";
			let num = get.info(card).usable,
				skills = [];
			if (typeof num == "function") {
				num = num(card, player);
			}
			if (typeof player.getModableSkills == "function") {
				skills = player.getModableSkills();
			} else if (typeof player.getSkills == "function") {
				skills = player.getSkills().concat(lib.skill.global);
				game.expandSkills(skills);
				skills = skills.filter(function (skill) {
					let info = get.info(skill);
					return info && info.mod;
				});
				skills.sort((a, b) => get.priority(a) - get.priority(b));
			}
			const arg = [card, player, num];
			skills.forEach(value => {
				var mod = get.info(value).mod[name];
				if (!mod) {
					return;
				}
				const result = mod.call(this, ...arg);
				if (!result || result === Infinity) {
					return;
				}
				if (typeof arg[arg.length - 1] != "object") {
					arg[arg.length - 1] = result;
				}
			});
			return arg[arg.length - 1];
		},
		filter(event, player) {
			let cnt = [lib.skill.jlsgsy_longbian.countShaUsable(player), 2 + (player.storage.jlsgsy_duzun_buff || [null, 0])[1], player.maxHp];
			return cnt.filter(cnt => cnt > 0).length >= 2;
		},
		content() {
			"step 0";
			var cnt = [lib.skill.jlsgsy_longbian.countShaUsable(player), 2 + (player.storage.jlsgsy_duzun_buff || [null, 0])[1], player.maxHp];
			event.cnt = cnt;
			var names = ["使用【杀】的次数上限", "摸牌阶段摸牌基数", "体力上限"];
			var promptGen = function (index) {
				let prompt = `令${names[index]}+1,令`;
				for (let index2 of [0, 1, 2]) {
					if (index2 == index) {
						continue;
					}
					prompt += names[index2] + `(${cnt[index2]})`;
				}
				prompt += "互换";
				return prompt;
			};
			event.choices = [0, 1, 2].map(promptGen);

			if (cnt.some(cnt => cnt <= 0)) {
				let index = cnt.findIndex(cnt => cnt <= 0);
				event.index = index;
				let prompt = `###${get.prompt(event.name)}###${promptGen(index)}`;
				player.chooseBool(prompt, true);
			} else {
				let choice = [0, 1, 2]
					.filter(index => {
						if (index == 2) {
							return true;
						}
						return cnt[1 - index] > player.hp - 2;
					})
					.randomGet();
				player
					.chooseControlList(get.prompt(event.name), event.choices)
					.set("ai", function () {
						return _status.event.choice;
					})
					.set("choice", choice);
				event.goto(2);
			}
			"step 1";
			if (!result.bool) {
				event.finish();
				return;
			}
			event._result = { index: event.index };
			"step 2";
			if (result.control == "cancel2") {
				event.finish();
				return;
			}
			player.logSkill(event.name);
			game.log(player, event.choices[result.index]);
			player.addSkill("jlsgsy_duzun_buff");
			var otherTwo = [0, 1, 2].filter(index => index != result.index);
			var diff = event.cnt[otherTwo[0]] - event.cnt[otherTwo[1]];
			lib.skill.jlsgsy_duzun_buff.addMark(player, otherTwo[0], -diff);
			lib.skill.jlsgsy_duzun_buff.addMark(player, otherTwo[1], diff);
			lib.skill.jlsgsy_duzun_buff.addMark(player, result.index, 1);
		},
		ai: {
			combo: "jlsgsy_duzun",
		},
	},
	jlsgsy_baonuzoushi: {
		animationStr: "既然如此，接下来的表演，将军可要看好了",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_huoshi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "useCardToPlayered" },
		filter(event, player) {
			if (event.player == player) {
				return false;
			}
			if (event.getParent("jlsgsy_mowu").name == "jlsgsy_mowu") {
				return false;
			}
			if (event.getParent().triggeredTargets3.length > 1) {
				return false;
			}
			if (!["basic", "trick"].includes(get.type(event.card, event.player))) {
				return false;
			}
			let players = game.filterPlayer(cur => !event.targets.includes(cur));
			return players.length;
		},
		forced: true,
		async content(event, trigger, player) {
			let targetx = game.filterPlayer(cur => !trigger.targets.includes(cur)).randomGet();
			trigger.targets.add(targetx);
			trigger.player.line(targetx);
			game.log(targetx, "成为", trigger.card, "的额外目标");
			await game.delayx();
		},
	},
	jlsgsy_yinzi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: ["gainAfter", "loseAsyncAfter", "recoverAfter"] },
		getIndex(event, player) {
			if (event.name == "recover") {
				return [event.player];
			}
			if (!event.getg) {
				return [];
			}
			return game
				.filterPlayer(current => {
					if (current == player) {
						return false;
					}
					return event.getg(current)?.length;
				})
				.sortBySeat();
		},
		filter(event, player, name, target) {
			if (!target?.isIn() || target == player || target == _status.currentPhase) {
				return false;
			}
			return !player.hasHistory("useSkill", evt => {
				if (evt.skill != "jlsgsy_yinzi") {
					return false;
				}
				if (!evt.targets || !evt.targets.includes(target)) {
					return false;
				}
				if (event.name == "recover") {
					return evt.event.triggername == "recoverAfter";
				}
				return true;
			});
		},
		forced: true,
		logTarget(event, player, name, target) {
			return target;
		},
		async content(event, trigger, player) {
			if (event.triggername != "recoverAfter") {
				await player.recover();
			} else {
				await player.draw(2);
			}
		},
	},
	jlsgsy_mowu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "useCardAfter" },
		filter(event, player) {
			if (event.getParent("jlsgsy_mowu").name == "jlsgsy_mowu") {
				return false;
			}
			let targets = (event._targets || event.targets).slice().filter(i => i.isIn());
			if (!event.player.isIn()) {
				return false;
			}
			if (!["basic", "trick"].includes(get.type(event.card, event.player))) {
				return false;
			}
			if (event.player != player && !targets.includes(player)) {
				return false;
			} else if (event.player == player && !targets.remove(player).length) {
				return false;
			}
			return true;
		},
		check(event, player) {
			let targets = (event._targets || event.targets).slice().filter(i => i.isIn());
			let cardEff = targets.reduce((t, cur) => t + get.effect(cur, event.card, event.player, player), 0);
			let drawer = targets.addArray([player, event.player]).filter(i => i.isIn());
			let drawEff = drawer.reduce((t, cur) => t + get.effect(cur, { name: "draw" }, player, player), 0);
			return drawEff + cardEff > 0;
		},
		prompt(event, player) {
			let targets = (event._targets || event.targets)
				.slice()
				.add(event.player)
				.remove(player)
				.filter(i => i.isIn());
			return `魔舞：是否与${get.translation(targets)}各摸一张牌？<br>然后令${get.translation(event.card)}额外结算一次`;
		},
		async content(event, trigger, player) {
			let targets = (trigger._targets || trigger.targets).slice().filter(i => i.isIn());
			let drawer = targets
				.slice()
				.addArray([player, trigger.player])
				.filter(i => i.isIn());
			await game.asyncDraw(drawer);
			let card = get.autoViewAs(trigger.card, []);
			card.cards = [];
			if (targets.length) {
				await trigger.player.useCard(card, targets, false);
			}
		},
		ai: {
			expose: 0.4,
			threaten: 0.9,
		},
	},
	jlsgsy_baonumenghuo: {
		animationStr: "非要逼我，现出真身！",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_qiushou: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter(event, player, name) {
			if (get.type(event.card) != "trick") {
				return false;
			}
			let source = event.player,
				target = event.target;
			if (source == player) {
				return target != player && target.isIn();
			}
			return source.isIn();
		},
		forced: true,
		logTarget(event, player) {
			let source = event.player,
				target = event.target;
			if (source == player) {
				return target;
			}
			return source;
		},
		async content(event, trigger, player) {
			let source = trigger.player,
				target = trigger.target,
				damage;
			if (source == player) {
				damage = target;
			} else {
				damage = source;
			}
			const result = await damage
				.chooseToRespond()
				.set("filterCard", card => get.name(card) == "sha")
				.set("ai", card => {
					const player = _status.event.player,
						source = get.event().source;
					if (get.damageEffect(player, source, player) > 0) {
						return 0;
					}
					return 8 - get.value(card);
				})
				.set("prompt", `${get.translation(player)}对你发动了【酋首】`)
				.set("prompt2", `请打出一张【杀】，或受到${get.translation(player)}造成的一点伤害`)
				.set("source", player)
				.forResult();
			if (!result.bool) {
				await damage.damage(1, player);
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (target == player) {
						return;
					}
					if (get.type(card) != "trick") {
						return;
					}
					return [1, 0, 1, -2];
				},
				player(card, player, target) {
					if (target == player) {
						return;
					}
					if (get.type(card) != "trick") {
						return;
					}
					return [1, 0, 1, -2];
				},
			},
		},
	},
	jlsgsy_moshou: {
		audio: "ext:极略/audio/skill:3",
		init(player) {
			player.storage.jlsgsy_moshou = {
				1: 0,
				2: 0,
				3: 0,
			};
		},
		mark: true,
		marktext: "兽",
		intro: {
			markcount(storage, player) {
				return player.storage.jlsgsy_moshou_record;
			},
			mark(dialog, storage, player) {
				const addNewRow = lib.element.dialog.addNewRow.bind(dialog),
					itemContainerCss = { height: "20px" },
					map = ["无", "①", "②", "③"];
				if (get.is.phoneLayout()) {
					dialog.classList.add("fullheight");
				}
				dialog.css({ width: "20%" });
				for (let i = 0; i < 4; i++) {
					let list;
					if (i == 0) {
						list = [
							{ item: `当前效果`, ratio: 0.5, itemContainerCss },
							{ item: `${map[player.storage.jlsgsy_moshou_record || 0]}`, ratio: 0.5, itemContainerCss },
						];
					} else {
						list = [
							{ item: `效果${map[i]}`, ratio: 0.5, itemContainerCss },
							{ item: `${get.cnNumber(storage[i.toString()])}次`, ratio: 0.5, itemContainerCss },
						];
					}
					addNewRow(...list);
				}
			},
		},
		trigger: { player: "phaseBegin" },
		locked: true,
		logAudio(event, player, triggername, _, costResult) {
			const num = costResult.cost_data.num;
			return [`ext:极略/audio/skill/jlsgsy_moshou${num}.mp3`];
		},
		async cost(event, trigger, player) {
			let num = [1, 2, 3].remove(player.storage.jlsgsy_moshou_record).randomGet();
			event.result = {
				bool: true,
				cost_data: { num },
			};
		},
		async content(event, trigger, player) {
			const num = event.cost_data.num;
			player.storage.jlsgsy_moshou_record = num;
			player.storage.jlsgsy_moshou[num.toString()]++;
			player.update();
			if (num == 2) {
				let targets = game.filterPlayer().remove(player).sortBySeat(player);
				for (let target of targets) {
					player.line(target);
					game.log(target, "的非锁定技和装备技能失效了");
					target.addTempSkill("jlsgsy_moshou_2", { player: "phaseEnd" });
				}
			}
			await player.draw(player.storage.jlsgsy_moshou[num.toString()]);
		},
		getSkills(player) {
			let equipSkills = player.getCards("e").reduce((list, card) => {
					const info = get.info(card);
					if (info && info.skills) {
						return list.addArray(info.skills);
					}
					return list;
				}, []),
				skills = player.getSkills(null, false, false);
			return equipSkills.concat(skills).filter(skill => {
				let info = get.info(skill);
				return info && !get.is.locked(skill, player) && !info.charlotte && !info.persevereSkill;
			});
		},
		group: ["jlsgsy_moshou_1", "jlsgsy_moshou_3"],
		subSkill: {
			1: {
				trigger: { source: "damageSource" },
				filter(event, player) {
					if (player.storage.jlsgsy_moshou_record != 1) {
						return false;
					}
					if (event.player == player) {
						return false;
					}
					return event.num > 0;
				},
				forced: true,
				charlotte: true,
				async content(event, trigger, player) {
					if (trigger.player.countDiscardableCards(player, "he")) {
						await trigger.player.randomDiscard("he", 1);
					}
					await trigger.player.turnOver();
				},
				ai: {
					effect: {
						player(card, player, target) {
							if (player.storage.jlsgsy_moshou_record != 1) {
								return;
							}
							if (get.tag(card, "damage")) {
								if (player.hasSkillTag("jueqing", false, target)) {
									return;
								}
								return [1, 0, 1, -1];
							}
						},
					},
				},
			},
			2: {
				init(player) {
					player.disableSkill("jlsgsy_moshou", lib.skill.jlsgsy_moshou.getSkills(player));
				},
				onremove(player) {
					player.enableSkill("jlsgsy_moshou");
				},
				trigger: {
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				filter(event, player) {
					if (event.name == "equip" && event.player == player) {
						return true;
					}
					const evt = event.getl(player);
					return evt && evt.player == player && evt.es && evt.es.length;
				},
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				async content(event, trigger, player) {
					player.enableSkill("jlsgsy_moshou");
					player.disableSkill("jlsgsy_moshou", lib.skill.jlsgsy_moshou.getSkills(player));
				},
				ai: {
					neg: true,
					unequip_equip1: true,
				},
			},
			3: {
				get trigger() {
					return lib.jlsg.debuffSkill.trigger;
				},
				filter(event, player) {
					if (player.storage.jlsgsy_moshou_record != 3) {
						return false;
					}
					let key = lib.jlsg.debuffSkill.translate[event.name];
					let bool = lib.jlsg.debuffSkill.getInfo(event, player, key).bool;
					if (!bool) {
						return false;
					}
					if (key == "damage") {
						if (event.hasNature()) {
							return false;
						}
						if (!event.source || event.source == player) {
							return false;
						}
					} else if (["loseHp", "loseMaxHp", "removeSkill", "link", "turnOver", "disableSkill"].includes(key)) {
						if (event.getParent().player && event.getParent().player == player) {
							return false;
						}
						if (!event.getParent().player) {
							return false;
						}
					} else if (key == "discard") {
						let discarder = event.discarder || event.getParent(2).player;
						if (discarder && discarder == player) {
							return false;
						}
						if (!discarder) {
							return false;
						}
					}
					return true;
				},
				forced: true,
				charlotte: true,
				async content(event, trigger, player) {
					let key = lib.jlsg.debuffSkill.translate[trigger.name];
					const { str } = lib.jlsg.debuffSkill.getInfo(trigger, player, key);
					if (trigger.name == "changeSkills") {
						trigger.removeSkill = [];
					} else if (trigger.name == "lose") {
						trigger.cards = trigger.cards.filter(card => {
							if (get.owner(card) == player) {
								return false;
							}
							return !["h", "e"].includes(get.position(card));
						});
						if (!trigger.cards.length) {
							trigger.cancel();
						}
					} else {
						trigger.cancel();
					}
					game.log(player, "取消了", `#y${str}`);
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (player == target || target.storage.jlsgsy_moshou_record != 3) {
								return;
							}
							if (card.name == "tiesuo") {
								return "zerotarget";
							}
							if (card.name == "guohe") {
								return "zerotarget";
							}
							if (get.tag(card, "damage")) {
								if (get.tag(card, "natureDamage")) {
									return;
								}
								return "zerotarget";
							} else if (get.name(card) == "guohe") {
								return "zerotarget";
							} else if (get.name(card) == "tiesuo" && !target.isLinked()) {
								return "zerotarget";
							}
						},
					},
				},
			},
		},
	},
	jlsgsy_baonuzhangchunhua: {
		animationStr: "冥河不渡，永坠无间",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_diaoling: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		trigger: { global: "loseBefore" },
		filter(event, player) {
			const evt = event.getParent("phaseDiscard");
			if (evt?.player == event.player && evt?.name == "phaseDiscard") {
				return false;
			}
			if (event.player == player || !event.player.isIn() || event.type != "discard") {
				return false;
			}
			return event.cards.some(card => {
				if (get.owner(card) != event.player) {
					return false;
				}
				return ["h", "e"].includes(get.position(card));
			});
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseBool(`###${get.prompt("jlsgsy_diaoling", trigger.player)}###令${get.translation(trigger.player)}将此次弃牌改为失去等量体力`)
				.set("ai", (event, player) => {
					const trigger = event.getTrigger();
					const target = trigger.player,
						cards = trigger.cards.filter(card => {
							if (get.owner(card) != target) {
								return false;
							}
							return ["h", "e"].includes(get.position(card));
						});
					return get.value(cards, target) < (get.effect(target, { name: "losehp" }, player, player) * cards.length) / 2;
				})
				.forResult();
			if (event.result?.bool) {
				event.result.targets = [trigger.player];
			}
		},
		async content(event, trigger, player) {
			const { player: target } = trigger;
			game.log(player, "取消了", target, "的弃牌");
			const cards = trigger.cards.filter(card => {
				if (get.owner(card) != target) {
					return false;
				}
				return ["h", "e"].includes(get.position(card));
			});
			trigger.cards.removeArray(cards);
			if (!trigger.cards.length) {
				trigger.cancel();
			}
			await target.loseHp(cards.length);
		},
	},
	jlsgsy_ejue: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		trigger: { player: "damageEnd" },
		filter(event, player) {
			if (event.name == "damage") {
				return event.num > 0;
			}
			if (player.isPhaseUsing()) {
				return !player.hasSkill("jlsgsy_ejue_used", null, false, false);
			}
			return false;
		},
		prompt: "是否发动【扼绝】？",
		prompt2: "摸两张牌并弃置其中一张，然后令所有其他角色弃置点数小于此牌的所有相同类型的牌，最后你从弃牌堆里随机获得每名角色以此法弃置的各一张牌。",
		check(event, player) {
			return true;
		},
		async content(event, trigger, player) {
			if (!trigger) {
				player.addTempSkill("jlsgsy_ejue_used", { player: "phaseUseAfter" });
			}
			const draw = await player.draw(2).forResult();
			if (!draw?.length) {
				return;
			}
			const discard = await player
				.chooseToDiscard("扼绝：弃置一张牌")
				.set("filterCard", card => get.event().cardx.includes(card))
				.set("ai", card => (8 - get.value(card)) * (14 - get.number(card)))
				.set("cardx", draw)
				.forResult();
			if (!discard?.cards?.length) {
				return;
			}
			const cardx = discard.cards[0];
			const targets = game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase);
			player.line(targets);
			for (const target of targets) {
				const cards = target.getDiscardableCards(target, "he", card => {
					if (get.type2(card, target) != get.type2(cardx, player)) {
						return false;
					}
					return get.number(card, target) < get.number(cardx);
				});
				if (!cards.length) {
					continue;
				}
				await target.discard(cards, "notBySelf");
			}
			const cardsList = targets.reduce((list, target) => {
				const history = target.getHistory("lose", evt => evt.getParent(2) == event),
					sum = list.slice().flat();
				const cardsx = history
					.map(evt => evt.cards.filterInD("d"))
					.flat()
					.unique();
				cardsx.removeArray(sum);
				if (cardsx.length) {
					list.push(cardsx);
				}
				return list;
			}, []);
			if (!cardsList.length) {
				return;
			}
			const cards = cardsList.map(list => list.randomGet());
			await player.gain(cards, "gain2");
		},
		subSkill: {
			used: { charlotte: true },
		},
		ai: {
			order: 10,
			result: {
				player: 1,
			},
		},
	},
	jlsgsy_jianmie: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			aiOrder(player, card, num) {
				if (get.name(card, player) == "sha") {
					if (["card", "vcard"].includes(get.itemtype(card)) && !card.hasNature()) {
						return num + 2;
					}
				}
			},
		},
		trigger: { player: "useCard1" },
		filter(event, player) {
			if (event.targets.some(target => target.countCards("h") >= player.countCards("h"))) {
				return false;
			}
			return event.card.name == "sha" && !event.card.hasNature();
		},
		forced: true,
		async content(event, trigger, player) {
			const original = get.translation(trigger.card);
			game.setNature(trigger.card, "fire");
			game.log(player, "将", `#y${original}`, "改为", trigger.card);
			if (trigger.addCount !== false) {
				trigger.addCount = false;
				trigger.player.getStat().card.sha--;
			}
		},
		group: ["jlsgsy_jianmie_dying"],
		subSkill: {
			dying: {
				sourceSkill: "jlsgsy_jianmie",
				sub: true,
				audio: "jlsgsy_jianmie",
				trigger: { global: "dyingBefore" },
				filter(event, player) {
					if (event.player == player || event.player.countCards("h") >= player.countCards("h")) {
						return false;
					}
					const phase = event.getParent("phase");
					return phase?.player == player && phase.name == "phase";
				},
				forced: true,
				firstDo: true,
				logTarget: "player",
				async content(event, trigger, player) {
					trigger.player.chat("孩子们，我坠机了");
					await trigger.player.die(trigger.reason);
				},
			},
		},
	},
	jlsgsy_baonuliru: {
		animationStr: "仁义？天道？今日，唯有魔道！",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_moce: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filter(event, player) {
			const guohe = get.autoViewAs({ name: "guohe" }, "unsure");
			return event.filterCard(guohe, player, event) && !event.jlsgsy_moce;
		},
		filterTarget(card, player, target) {
			const guohe = get.autoViewAs({ name: "guohe" }, "unsure");
			return player.canUse(guohe, target);
		},
		filterCard: () => false,
		selectCard: -1,
		viewAs: { name: "guohe", isCard: false },
		log: false,
		async precontent(event, trigger, player) {
			player.logSkill("jlsgsy_moce", event.result.targets);
			let evt = event.getParent(),
				maps = game
					.filterPlayer(current => current != player)
					.map(current => {
						return [
							current,
							current.getCards("he", card => {
								if (get.suit(card) != "spade") {
									return false;
								}
								return evt.filterCard(get.autoViewAs({ ...event.result.card, cards: [card] }, [card]), player, evt);
							}),
						];
					})
					.filter(map => map[1].length);
			evt.set("jlsgsy_moce", true);
			if (!maps.length) {
				player.chat("尽是些酒囊饭袋！");
				evt.goto(0);
				return;
			} else {
				let map = maps.randomGet();
				let card = map[1].randomGet();
				event.result.card.cards = [card];
				event.result.cards = [card];
			}
		},
		group: "jlsgsy_moce_draw",
		subSkill: {
			draw: {
				sub: true,
				sourceSkill: "jlsgsy_moce",
				audio: false,
				trigger: { player: "useCardAfter" },
				filter(event, player) {
					return event.skill == "jlsgsy_moce" && event.card.name == "guohe";
				},
				forced: true,
				async content(event, trigger, player) {
					await player.draw(1);
				},
			},
		},
		ai: {
			wuxie: (target, card, player, viewer, status) => {
				if (
					!target.countCards("hej") ||
					status * get.attitude(viewer, player._trueMe || player) > 0 ||
					(target.hp > 2 &&
						!target.hasCard(i => {
							let val = get.value(i, target),
								subtypes = get.subtypes(i);
							if (val < 8 && target.hp < 2 && !subtypes.includes("equip2") && !subtypes.includes("equip5")) {
								return false;
							}
							return val > 3 + Math.min(5, target.hp);
						}, "e") &&
						target.countCards("h") * _status.event.getRand("guohe_wuxie") > 1.57)
				) {
					return 0;
				}
			},
			basic: {
				order: 9,
				useful: (card, i) => 10 / (3 + i),
				value: (card, player) => {
					let max = 0;
					game.countPlayer(cur => {
						max = Math.max(max, lib.card.guohe.ai.result.target(player, cur) * get.attitude(player, cur));
					});
					if (max <= 0) {
						return 5;
					}
					return 0.42 * max;
				},
			},
			yingbian(card, player, targets, viewer) {
				if (get.attitude(viewer, player) <= 0) {
					return 0;
				}
				if (
					game.hasPlayer(function (current) {
						return !targets.includes(current) && lib.filter.targetEnabled2(card, player, current) && get.effect(current, card, player, player) > 0;
					})
				) {
					return 6;
				}
				return 0;
			},
			button: button => {
				let player = _status.event.player,
					target = _status.event.target;
				if (!lib.filter.canBeDiscarded(button.link, player, target)) {
					return 0;
				}
				let att = get.attitude(player, target),
					val = get.buttonValue(button),
					pos = get.position(button.link),
					name = get.name(button.link);
				if (pos === "j") {
					let viewAs = button.link.viewAs;
					if (viewAs === "lebu") {
						let needs = target.needsToDiscard(2);
						val *= 1.08 + 0.2 * needs;
					} else if (viewAs === "shandian" || viewAs === "fulei") {
						val /= 2;
					}
				}
				if (att > 0) {
					val = -val;
				}
				if (pos !== "e") {
					return val;
				}
				let sub = get.subtypes(button.link);
				if (sub.includes("equip1")) {
					return (val * Math.min(3.6, target.hp)) / 3;
				}
				if (sub.includes("equip2")) {
					if (name === "baiyin" && pos === "e" && target.isDamaged()) {
						let by = 3 - 0.6 * Math.min(5, target.hp);
						return get.sgn(get.recoverEffect(target, player, player)) * by;
					}
					return 1.57 * val;
				}
				if (att <= 0 && (sub.includes("equip3") || sub.includes("equip4")) && (player.hasSkill("shouli") || player.hasSkill("psshouli"))) {
					return 0;
				}
				if (sub.includes("equip6")) {
					return val;
				}
				if (sub.includes("equip4")) {
					return val / 2;
				}
				if (
					sub.includes("equip3") &&
					!game.hasPlayer(cur => {
						return !cur.inRange(target) && get.attitude(cur, target) < 0;
					})
				) {
					return 0.4 * val;
				}
				return val;
			},
			result: {
				target(player, target) {
					const att = get.attitude(player, target);
					const hs = target.getDiscardableCards(player, "h");
					const es = target.getDiscardableCards(player, "e");
					const js = target.getDiscardableCards(player, "j");
					if (!hs.length && !es.length && !js.length) {
						return 0;
					}
					if (att > 0) {
						if (
							js.some(card => {
								const cardj = card.viewAs ? { name: card.viewAs } : card;
								if (cardj.name === "xumou_jsrg") {
									return false;
								}
								return get.effect(target, cardj, target, player) < 0;
							})
						) {
							return 3;
						}
						if (target.isDamaged() && es.some(card => card.name === "baiyin") && get.recoverEffect(target, player, player) > 0) {
							if (target.hp === 1 && !target.hujia) {
								return 1.6;
							}
						}
						if (
							es.some(card => {
								return get.value(card, target) < 0;
							})
						) {
							return 1;
						}
						return -1.5;
					} else {
						const noh = hs.length === 0 || target.hasSkillTag("noh");
						const noe = es.length === 0 || target.hasSkillTag("noe");
						const noe2 =
							noe ||
							!es.some(card => {
								return get.value(card, target) > 0;
							});
						const noj =
							js.length === 0 ||
							!js.some(card => {
								const cardj = card.viewAs ? { name: card.viewAs } : card;
								if (cardj.name === "xumou_jsrg") {
									return true;
								}
								return get.effect(target, cardj, target, player) < 0;
							});
						if (noh && noe2 && noj) {
							return 1.5;
						}
						return -1.5;
					}
				},
			},
			tag: {
				loseCard: 1,
				discard: 1,
			},
		},
	},
	jlsgsy_fenjie: {
		audio: "ext:极略/audio/skill:2",
		onremove: true,
		trigger: { player: "phaseBegin" },
		forced: true,
		async content(event, trigger, player) {
			let num = player.getStorage(event.name, 0),
				targets = game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase || player);
			for (const target of targets) {
				if (target.isIn()) {
					player.line(target);
					if (num == 0) {
						await target.gainMaxHp(1);
						await target.draw(2);
					} else if (num == 1) {
						const cards = target.getDiscardableCards(target, "he", card => get.color(card) == "red");
						if (cards.length) {
							await target.discard(cards).set("discarder", target);
						}
					} else {
						await target.damage(player, 1, "fire");
					}
				}
			}
			num++;
			player.setStorage(event.name, num);
		},
	},
	jlsgsy_jinmie: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		trigger: {
			global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		getIndex(event, player) {
			return game
				.filterPlayer(current => {
					if (current == player) {
						return false;
					}
					let evt = event.getl(current);
					return evt?.hs?.length;
				})
				.sortBySeat(_status.currentPhase || player);
		},
		filter(event, player, triggername, target) {
			return !target.countCards("h") && target.isDamaged() && target.hp > 0;
		},
		prompt(event, player, triggername, target) {
			return get.prompt("jlsgsy_jinmie", target);
		},
		prompt2(event, player, triggername, target) {
			return `对其造成${target.hp}点火焰伤害`;
		},
		check(event, player, triggername, target) {
			return get.damageEffect(target, player, player, "fire") > 0;
		},
		logTarget(event, player, triggername, target) {
			return target;
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			await target.damage(player, target.hp, "fire");
		},
		global: ["jlsgsy_jinmie_ai"],
		subSkill: {
			ai: {
				sub: true,
				sourceSkill: "jlsgsy_jinmie",
				charlotte: true,
				ai: {
					effect: {
						target_use(card, player, target) {
							let currents = game.filterPlayer(current => {
								if (!current.hasSkill("jlsgsy_jinmie")) {
									return false;
								}
								return !current.hasSkill("counttrigger") || current.storage?.counttrigger?.jlsgsy_jinmie < 1;
							});
							if (!currents.length) {
								return;
							}
							let playerH = player.getCards("h");
							if (playerH.length == 1 && (card == playerH[0] || (Array.isArray(card?.cards) && card?.cards?.includes(player[0])))) {
								if (currents.some(current => get.attitude(player, current) < 0) && !player.hasSkillTag("nofire")) {
									return [1, 0, 1, -player.getHp()];
								}
							}
						},
					},
				},
			},
		},
	},
	jlsgsy_baonuyuanshu: {
		animationStr: "弑君之罪，当诛九族！",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_wangzun: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			attackRange(player, num) {
				return num + player.countExpansions("jlsgsy_wangzun");
			},
			cardUsable(card, player, num) {
				if (card.name == "sha") {
					return num + player.countExpansions("jlsgsy_wangzun");
				}
			},
			maxHandcard(player, num) {
				return num - player.countExpansions("jlsgsy_wangzun");
			},
		},
		marktext: "玺",
		intro: {
			markcount: "expansion",
			content: "expansion",
		},
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		logTarget(event, player) {
			const xi = player.getExpansions("jlsgsy_wangzun");
			if (!xi.length) {
				return game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase);
			}
			return player;
		},
		async content(event, trigger, player) {
			const xi = player.getExpansions(event.name);
			if (!xi.length) {
				for (const target of event.targets) {
					if (!target.isIn() || !target.countCards("he")) {
						continue;
					}
					const result = await player.choosePlayerCard(`###妄尊###请选择${get.translation(target)}的一张牌`, target, "he", true).forResult();
					if (result.bool && result.links.length) {
						const next = player.addToExpansion(target, result.links, "give", "log");
						next.gaintag.add(event.name);
						await next;
					}
				}
				if (!player.hasSkill(`${event.name}_effect`)) {
					player.addSkill(`${event.name}_effect`);
				}
			} else {
				const result = await player.chooseCardButton(true, "妄尊：选择获得一张“玺”", xi).forResult();
				if (result.bool && result.links.length) {
					await player.gain(result.links, player, "giveAuto");
					await player.recover(1);
				}
			}
		},
		subSkill: {
			effect: {
				charlotte: true,
				trigger: { player: "phaseDrawBegin2" },
				filter(event, player) {
					if (!player.countExpansions("jlsgsy_wangzun")) {
						return false;
					}
					return event.num > 0 && !event.numFixed;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					trigger.num += player.countExpansions("jlsgsy_wangzun");
				},
			},
		},
	},
	jlsgsy_jiantian: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "useCardToTargeted" },
		filter(event, player) {
			if (event.card.name != "sha" && get.type(event.card) != "trick") {
				return false;
			} else if (get.tag(event.card, "damage") < 1) {
				return false;
			}
			return event.getParent().triggeredTargets4.length == 1;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseBool(`###${get.prompt(event.skill)}###令${get.translation(trigger.card)}伤害+1且不能被响应`)
				.set("ai", (event, player) => {
					const trigger = event.getTrigger();
					const eff = trigger.targets.reduce((sum, target) => sum + get.effect(target, trigger.card, player, player), 0);
					return eff > 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			trigger.getParent().baseDamage++;
			trigger.getParent().directHit = game.players;
			player.addSkill(`${event.name}_debuff`);
			player.storage[`${event.name}_debuff`]++;
			player.markSkill(`${event.name}_debuff`);
		},
		subSkill: {
			debuff: {
				charlotte: true,
				init(player, skill) {
					player.setStorage(skill, 0, true);
				},
				onremove: true,
				mark: true,
				marktext: "僭",
				intro: {
					content(storage, player) {
						return "下次受到的伤害+" + storage;
					},
				},
				trigger: { player: "damageBegin3" },
				forced: true,
				pupup: false,
				async content(event, trigger, player) {
					trigger.num += player.getStorage(event.name, 0);
					player.removeSkill(event.name);
				},
			},
		},
	},
	jlsgsy_zhonggu: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		trigger: { player: ["damageEnd", "loseHpAfter", "loseMaxHpAfter", "loseAfter", "changeSkillsAfter", "linkAfter", "turnOverAfter", "disableSkillEnd"] },
		filter(event, player) {
			let key = lib.jlsg.debuffSkill.translate[event.name];
			return lib.jlsg.debuffSkill.getInfo(event, player, key).bool;
		},
		async cost(event, trigger, player) {
			const result = await player
				.chooseBool(`###${get.prompt(event.skill)}###令所有其他角色${lib.jlsg.debuffSkill.getInfo(trigger, player).str}`)
				.set("ai", (event, player) => {
					return true;
				})
				.forResult();
			event.result = {
				bool: result.bool,
				targets: game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase),
			};
		},
		async content(event, trigger, player) {
			let key = lib.jlsg.debuffSkill.translate[trigger.name],
				info = lib.jlsg.debuffSkill.getInfo(trigger, player, key);
			if (key == "removeSkill") {
				key = "removeSkills";
			}
			for (const target of event.targets) {
				if (!target.isIn()) {
					continue;
				}
				if (key == "removeSkills") {
					const skills = target.getSkills(null, false, false);
					if (!skills.length) {
						continue;
					}
					await target.removeSkills(skills.randomGets(info.num));
				} else if (key == "discard") {
					const cards = target.getDiscardableCards(target, "he");
					if (!cards.length) {
						continue;
					}
					await target.discard(cards.randomGets(info.num));
				} else if (key == "disableSkill") {
					if (trigger.type == "addSkillBlocker") {
						await target.addSkillBlocker(trigger.args[0]);
					} else {
						const skills = target.getSkills(null, false, false).randomGets(trigger.num);
						if (!skills.length) {
							return;
						}
						const args = get.copy(trigger.args);
						if (trigger.type == "tempBanSkill") {
							args[0] = skills;
						} else {
							args[1] = skills;
						}
						await target[trigger.type](...args);
					}
				} else {
					await target[key](info.num, info.nature);
				}
			}
		},
	},
};

export default skills;
