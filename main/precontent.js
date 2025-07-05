import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import { characters } from "../character/index.js";
import { card as jlsg_qs } from "../card/jlsg_qs.js";
export async function precontent(config, originalPack) {
	if (!config.enable) {
		return;
	}
	if (config.debug) {
		window.__configCharactersBackup = lib.config.characters;
		lib.config.characters = ["jlsg_sk", "jlsg_sr", "jlsg_soul", "jlsg_sy"];
	}
	lib.namePrefix.set("极略SK神", {
		getSpan(prefix, name) {
			return `${get.prefixSpan("极略SK", name)}${get.prefixSpan("神", name)}`;
		},
	});
	lib.namePrefix.set("极略SP神", {
		getSpan(prefix, name) {
			return `${get.prefixSpan("极略SP", name)}${get.prefixSpan("神", name)}`;
		},
	});
	lib.namePrefix.set("极略SR", {
		getSpan: () => {
			return `<span style="writing-mode:horizontal-tb;-webkit-writing-mode:horizontal-tb;font-family:MotoyaLMaru;transform:scaleY(0.85)" data-nature="keymm">SR</span>`;
		},
	});
	lib.namePrefix.set("极略SK", {
		getSpan: () => {
			return `<span style="color:#fbefef;writing-mode:horizontal-tb;-webkit-writing-mode:horizontal-tb;font-family:MotoyaLMaru;transform:scaleY(0.85)" data-nature="firemm">SK</span>`;
		},
	});
	lib.namePrefix.set("极略SP", {
		getSpan: () => {
			return `<span style="writing-mode:horizontal-tb;-webkit-writing-mode:horizontal-tb;font-family:MotoyaLMaru;transform:scaleY(0.85)">SP</span>`;
		},
	});
	lib.namePrefix.set("极略★SK", {
		getSpan(prefix, name) {
			return `${get.prefixSpan("★SP", name)}${get.prefixSpan("极略SK", name)}`;
		},
	});
	//魔势力及前缀创建
	if (lib.config?.extension_极略_syRefactor) {
		game.addGroup("jlsgsy", "魔", "极略三英", { color: "#8B4A51" });
		lib.namePrefix.set("极略SY", {
			getSpan: () => {
				const span = document.createElement("span"),
					style = span.style;
				style.color = "#8B4A51";
				style.writingMode = style.webkitWritingMode = "horizontal-tb";
				style.fontFamily = "MotoyaLMaru";
				style.transform = "scaleY(0.85)";
				span.dataset.nature = "keymm";
				span.innerHTML = "SY";
				return span.outerHTML;
			},
		});
		lib.namePrefix.set("极略SY暴怒", {
			getSpan: () => {
				const span = document.createElement("span"),
					style = span.style;
				style.color = "#B22222";
				style.writingMode = style.webkitWritingMode = "horizontal-tb";
				style.fontFamily = "MotoyaLMaru";
				style.transform = "scaleY(0.85)";
				span.dataset.nature = "orangemm";
				span.innerHTML = "SY";
				return span.outerHTML;
			},
		});
		lib.arenaReady.push(function () {
			const characterPack = lib.characterPack["jlsg_sy"];
			for (const name in characterPack) {
				if (!name.startsWith("jlsgsy_")) continue;
				characterPack[name].group = "jlsgsy";
				const title = lib.translate[name],
					baonu = name.endsWith("baonu") ? true : false;
				const info = baonu ? name.slice(7, -5) : name.slice(7);
				if (baonu) {
					let num = 4;
					let filter = `锁定技，当你的体力值降至${num}或更低时，`;
					let eff1 = `重置武将牌并弃置判定区内所有牌，`;
					let eff2 = `你进入暴怒状态，${num == 6 ? eff1 : ""}然后立即执行一个额外回合。`;
					let str = filter + eff2;
					game.broadcastAll(
						function (name, str) {
							let skill = "jlsgsy_baonu" + name;
							if (lib.skill[skill]) lib.translate[skill + "_info"] = str;
						},
						info,
						str
					);
				}
				let num2 = 3;
				if (get.mode() == "boss") {
					num2 = 4;
				}
				characterPack[name].hp = baonu ? num2 : characterPack[name].hp;
				characterPack[name].maxHp = baonu ? num2 : characterPack[name].maxHp;
				if (get.mode() != "boss") {
					if (!title) continue;
					else {
						lib.characterTitle[name] = title;
						let translation = get.rawName(info);
						lib.translate[name] = "SY" + (baonu ? "暴怒" : "") + translation;
						lib.translate[name + "_ab"] = "极略SY" + (baonu ? "暴怒" : "") + translation;
						lib.translate[name + "_prefix"] = baonu ? "极略SY暴怒" : "极略SY";
						if (name == "jlsgsy_sunhaobaonu") {
							characterPack[name].skills.remove("jlsgsy_shisha");
							characterPack[name].skills.unshift("jlsgsy_mingzheng");
						}
						//AI禁选
						if (!baonu) {
							characterPack[name].isAiForbidden = true;
						}
					}
				}
			}
		});
	}

	// jlsg library
	lib.arenaReady.push(function () {
		lib.element.player.hasSkills = function (skills) {
			var skill = skills.split("|");
			for (var i = 0; i < skill.length; i++) {
				if (this.hasSkill(skill[i])) return true;
			}
			return false;
		};
	});
	var jlsg = {
		debug: {
			logCurrentRanks() {
				var logC = function (name) {
					console.log(`${name} ${get.translation(name)} ${get.rank(name)}`);
				};
				Array.from(document.getElementsByClassName("character"))
					.filter(c => c.link)
					.forEach(c => logC(c.link));
				if (!game.players || !game.players.forEach) return;
				game.players.forEach(p => {
					if (p.name1) logC(p.name1);
					if (p.name2) logC(p.name2);
				});
			},
			debugProperty(obj, name, get = true, set = true) {
				if (name in obj) {
					console.log(name, "found in", obj);
					obj["__" + name + "__"] = obj[name];
					delete obj[name];
				} else {
					console.log(name, "not found in", obj);
				}
				Object.defineProperty(obj, name, {
					get() {
						debugger;
						return this["__" + name + "__"];
					},
					set(value) {
						debugger;
						return (this["__" + name + "__"] = value);
					},
				});
			},
		},
		relu(num) {
			return num >= 0 ? num : 0;
		},
		get characterList() {
			let result;
			if (_status.characterlist) {
				result = _status.characterlist;
			} else if (_status.connectMode) {
				result = get.charactersOL(() => true);
			} else {
				result = get.gainableCharacters(() => true);
			}
			delete this.characterList;
			this.characterList = result;
			return result;
		},
		/**
		 *
		 * @param {Element} ele
		 */
		makeDraggable(ele) {
			game.broadcastAll(function (ele) {
				let x0, y0, x1, y1, delta, top0, left0;
				ele.addEventListener("pointerdown", e => {
					x0 = x1 = e.screenX;
					y0 = y1 = e.screenY;
					delta = 0;
					({ top: top0, left: left0 } = getComputedStyle(ele));
					let ctx = _status.jlsg_draggable.get(ele) || {
						ids: [],
					};
					ctx.ids = [e.pointerId];
					ele.style.transition = "none";
					ele.style.touchAction = "none";
					_status.jlsg_draggable.set(ele, ctx);
				});
				ele.addEventListener("pointermove", e => {
					if (e.pressure == 0) {
						return;
					}
					let ctx = _status.jlsg_draggable.get(ele);
					if (!ctx || !ctx.ids.includes(e.pointerId)) {
						return;
					}
					delta += Math.abs(e.screenX - x1);
					delta += Math.abs(e.screenY - y1);
					if (delta < 10) {
						return;
					}
					ele.style.left = `calc(${left0} + ${e.screenX - x0}px / ${game.documentZoom})`;
					ele.style.top = `calc(${top0} + ${e.screenY - y0}px / ${game.documentZoom})`;
				});
				if (!_status.jlsg_draggable) {
					_status.jlsg_draggable = new Map();
					let listener = e => {
						for (let ele of e.composedPath()) {
							let ctx = _status.jlsg_draggable.get(ele);
							if (!ctx) {
								continue;
							}
							ctx.ids.remove(e.pointerId);
							if (!ctx.ids.length) {
								ele.style.transition = "";
								ele.style.touchAction = "";
								_status.jlsg_draggable.delete(ele);
							}
						}
					};
					addEventListener("pointerup", listener);
					addEventListener("pointercancel", listener);
				}
			}, ele);
		},
		/**
		 *
		 * @param {Array<Number>} dist
		 * @returns {Number}
		 */
		distributionGet(dist) {
			var res = Math.random();
			let sum = dist.reduce((a, b) => a + b);
			console.assert(sum > 0, `utils.distributionGet received param ${JSON.stringify(dist)}`);
			dist = dist.map(v => v / sum);
			for (let i = 0; ; ) {
				if (res < dist[i]) return i;
				res -= dist[i];
				++i;
			}
		},
		showRepo() {
			var mirrorURL = lib.extensionPack["极略"] && lib.extensionPack["极略"].mirrorURL;
			if (!mirrorURL) return;
			this.openLink(mirrorURL);
		},
		openLink(url) {
			if (window.cordova) {
				if (cordova.InAppBrowser) {
					return cordova.InAppBrowser.open(url, "_system");
				}
				return;
			}
			if (window.require) {
				return require("electron").shell.openExternal(url);
			}
			return window.open(url);
		},
		checkUpdate(refNode) {
			if (!("noModule" in HTMLScriptElement.prototype)) {
				alert("游戏运行时/系统webview过老无法自动更新");
				return;
			}
			import("./modules/idb-keyval.js");
			var version = lib.extensionPack["极略"].version;
			refNode.insertAdjacentHTML("afterend", `<div>当前版本${version}<br>正在获取最新版本号</div>`);
			var cNode = refNode.nextSibling;
			var responsePromise = fetch("https://api.github.com/repos/xiaoas/jilue/releases/latest", {
				headers: {
					accept: "application/vnd.github.v3+json",
					"accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
					"cache-control": "no-cache",
					pragma: "no-cache",
				},
				method: "GET",
			});
			// TODO: only update to version with same major version
			let successHandler = response => {
				if (response.status >= 300) {
					cNode.innerHTML += ` 失败<br>${response.status} ${response.statusText}`;
					return Promise.reject(response);
				} else {
					cNode.innerHTML += " 成功";
					return response;
				}
			};
			let errorHandler = error => {
				cNode.innerHTML += ` 失败<br>${error}`;
				console.log(error);
				return Promise.reject(error);
			};
			responsePromise
				.then(successHandler, errorHandler)
				.then(response => response.json())
				.then(data => {
					var latestVersion = data.tag_name;
					if (latestVersion.startsWith("v")) {
						latestVersion = latestVersion.slice(1);
					}
					if (latestVersion > version) {
						refNode.innerHTML = `更新至 ${latestVersion}<br>`;
						window.jlsg.updateData = data;
						var newFunc = `jlsg.updateGuard(this)`;
						refNode.setAttribute("onClick", newFunc);
					} else {
						refNode.innerHTML = `当前已经是最新版<br>`;
					}
				});
		},
		async updateGuard(refNode) {
			if (!this.update) {
				return;
			}
			if (!this.update.guard) {
				this.update.guard = true;
				await this.update(refNode);
				this.update.guard = false;
			}
		},
		async update(refNode) {
			// TODO
			var latestTag = window.jlsg.updateData.tag_name;
			var currentTag = "v" + lib.extensionPack["极略"].version;
			var response = await fetch("https://api.github.com/repos/xiaoas/jilue/tags", {
				headers: {
					accept: "application/vnd.github.v3+json",
					"accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
				},
				method: "GET",
			});
			var tags = await response.json();
			tags = tags.map(t => t.name);
			if (!tags.includes(currentTag)) {
				if (tags.every(t => t > currentTag)) {
					refNode.insertAdjacentHTML("afterend", `<div>没有找到适用当前版本的更新讯息${currentTag}</div>`);
				}
				currentTag = tags.filter(t => t < currentTag).reduce((a, b) => (a < b ? b : a));
			}
			// var compareURI = `https://api.github.com/repos/xiaoas/jilue/compare/v2.1.0208...v2.2.0631`
			var compareURI = `https://api.github.com/repos/xiaoas/jilue/compare/${currentTag}...${latestTag}`;
			var cNode, data;
			try {
				refNode.insertAdjacentHTML("afterend", `<div>获取文件列表</div>`);
				cNode = refNode.nextSibling;
				let response = await fetch(compareURI, {
					headers: {
						accept: "application/vnd.github.v3+json",
						"accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
					},
					method: "GET",
				});
				data = await response.json();
				cNode.innerHTML += " 成功";
			} catch (e) {
				console.log(e);
				cNode.innerHTML += " 失败";
				return;
			}
			var files = data.files;
			game.saveExtensionConfig("极略", "pendingFiles", JSON.stringify(files));
			var idbKeyval;
			try {
				idbKeyval = await import("./modules/idb-keyval.js");
			} catch (e) {
				idbKeyval = await import("https://cdn.jsdelivr.net/npm/idb-keyval@5/+esm");
			}
			var required = files.filter(f => ["added", "modified"].includes(f.status));
			var blobs = await idbKeyval.getMany(required.map(f => f.sha));
			// var downloads = required.map((f,i) => blobs[i] || fetch(f.raw_url))
			var myMap = new Map();
			var waitBuffer = [];
			// for (let f of required) {
			//   if (f.raw_url.includes("raw.githubusercontent.com")) {
			//     f.raw_url.replace("raw.githubusercontent.com", "raw.fastgit.org")
			//   }
			// }
			const maxConcurrent = 5,
				maxRetry = 3;
			for (let [i, f] of required.entries()) {
				if (!blobs[i]) {
					if (myMap.size < maxConcurrent) {
						myMap.set(fetch(f.raw_url), f);
					} else {
						waitBuffer.push(f);
					}
				}
			}
			// required.forEach((f, i) => blobs[i] || myMap.set(fetch(f.raw_url), f))
			refNode.insertAdjacentHTML("afterend", `<div>正在下载<span>0</span>/${required.length}请耐心等待</div><br>`);
			cNode = refNode.nextSibling;
			var [valNode] = cNode.getElementsByTagName("span");
			var finishedCnt = {
				_v: null,
				get v() {
					return this._v;
				},
				set v(_v) {
					this._v = _v;
					valNode.innerHTML = _v.toString();
				},
			};
			var downloadError = 0;
			finishedCnt.v = required.length - myMap.size - waitBuffer.length;
			while (myMap.size) {
				let [completed] = await Promise.any(
					Array.from(myMap.keys()).map(p =>
						p.then(
							res => [p],
							res => [p]
						)
					)
				);
				let f = myMap.get(completed);
				myMap.delete(completed);
				try {
					let value = await completed;
					// value = await value.blob()
					// save as arrayBuffer
					value = await value.arrayBuffer();
					++finishedCnt.v;
					idbKeyval.set(f.sha, value);
					console.log(`${f.filename} downloaded and stored.`);
				} catch (e) {
					// console.log(f, e)
					f.retry = f.retry || 0;
					++f.retry;
					console.log(`${f.filename} download No.${f.retry} failed`);
					if (f.retry >= maxRetry) {
						++downloadError;
					} else {
						let nextURL = f.raw_url;
						nextURL = nextURL.replace("github.com", "hub.fastgit.org");
						myMap.set(fetch(nextURL), f);
					}
				} finally {
					if (myMap.size < maxConcurrent && waitBuffer.length) {
						let f = waitBuffer.pop();
						myMap.set(fetch(f.raw_url), f);
					}
				}
			}
			if (downloadError != 0) {
				cNode.innerHTML += `失败${downloadError} 下次运气会更好`;
				return;
			}
			// actually array Buffers
			blobs = await idbKeyval.getMany(required.map(f => f.sha));
			if (blobs.some(b => !b)) {
				cNode.innerHTML += " 失败<br> Error blob not found";
				return;
			}
			let blobMap = new Map(required.map((f, i) => [f.sha, blobs[i]]));
			if (!game.download) {
				throw "Not implemented";
			}
			cNode.innerHTML += " 成功<br>请酌情等待五秒后再重启不是不可以探测安装完了但是我太懒了";
			console.log("writing files");
			if (lib.node && lib.node.fs) {
				let prefix = __dirname + "/extension/极略/";
				for (let [i, f] of files.entries()) {
					switch (f.status) {
						case "added":
						case "modified":
							let blob = blobMap.get(f.sha);
							lib.node.fs.writeFile(prefix + f.filename, Buffer.from(blob), e => e && console.log(f, e));
							break;
						case "removed":
							lib.node.fs.rm(prefix + f.filename, e => e && console.log(f, e));
							break;
						case "renamed":
							lib.node.fs.rename(prefix + f.previous_filename, prefix + f.filename, e => e && console.log(f, e));
							break;
						default:
							console.log(f);
							break;
					}
				}
			} else {
				window.resolveLocalFileSystemURL(lib.assetURL, function (entry) {
					entry.getDirectory("extension/极略/", {}, function (dirEntry) {
						for (let [i, f] of files.entries()) {
							switch (f.status) {
								case "added":
								case "modified":
									let blob = blobMap.get(f.sha);
									dirEntry.getFile(f.filename, { create: true }, function (fileEntry) {
										fileEntry.createWriter(function (fileWriter) {
											fileWriter.write(blob);
										});
									});
									break;
								case "removed":
									dirEntry.getFile(f.filename, function (fileEntry) {
										fileEntry.remove();
									});
									break;
								case "renamed":
									dirEntry.getFile(f.previous_filename, function (fileEntry) {
										fileEntry.moveTo(dirEntry, f.filename);
									});
									break;
								default:
									console.log(f);
									break;
							}
						}
					});
				});
			}
			idbKeyval.clear();
		},
		showRepoElement(refElement) {
			let potentialRepo = refElement.nextElementSibling;
			if (potentialRepo && potentialRepo.id == "repo-link") {
				potentialRepo.remove();
			} else {
				refElement.insertAdjacentHTML("afterend", `<a id="repo-link" onclick="lib.jlsg.showRepo()" style="cursor: pointer;text-decoration: underline;display:block">Visit Repository</a>`);
				// refElement.nextElementSibling.scrollIntoView({
				//   behavior: 'smooth',
				//   block: 'nearest',
				// });
			}
		},
		getLoseHpEffect(player) {
			var loseHpEffect = -3;
			if (player.hp == 1) loseHpEffect *= 2.5;
			if (player.hp == 2) loseHpEffect *= 1.8;
			if (player.hp == 4) loseHpEffect *= 0.9;
			if (player.hp == 5) loseHpEffect *= 0.8;
			if (player.hp > 5) loseHpEffect *= 0.6;
			if (player.hasSkillTag("maihp")) loseHpEffect += 3;
			return loseHpEffect;
		},
		ai: {
			skill: {
				lose_equip: "xiaoji|xuanfeng",
				need_kongcheng: "shangshix|shangshi|jlsg_ruya|jlsg_qicai|lianying|relianying|kongcheng|sijian|hengzheng",
				rejudge: "guicai|jlsg_guicai|guidao|jilve|nos_zhenlie|huanshi|midao",
				save: "jlsg_guagu|jlsg_fangxin|jlsg_renxin|jijiu|buyi|chunlao|longhun|jlsg_longhun",
				need_card: "jlsg_youdi|jlsg_rende|jlsg_liuyun|jlsg_yansha|jlsg_huiqu|jlsg_zhaoxiang|kanpo|guicai|jlsg_guicai|guidao|beige|xiaoguo|liuli|tianxiang|jijiu|leiji|releiji|qingjian|zhuhai|qinxue|danqi",
				recover: "jlsg_liuyun|jlsg_zhishi|rerende|rende|kuanggu|zaiqi|jieyin|qingnang|yinghun|hunzi|shenzhi|longhun|zishou|ganlu|xueji|shangshi|chengxiang|buqu|quji",
				use_lion: "longhun|duanliang|qixi|guidao|relijian|lijian|xinjujian|jujian|zhiheng|mingce|yongsi|fenxun|gongqi|yinling|jilve|qingcheng",
				need_equip: "shensu|mingce|jujian|jlsg_liuyun|beige|yuanhu|huyuan|gongqi|gongji|yanzheng|qingcheng|longhun|shuijian|yinbing",
				straight_damage: "jlsg_chouxi|jlsg_zhishi|qiangxi|duwu|danshou",
				double_sha: "paoxiao|fuhun|tianyi|xianzhen|zhaxiang|lihuo|jiangchi|shuangxiong|qiangwu|luanji",
				need_maxhp: "jlsg_ruya|yingzi|zaiqi|yinghun|hunzi|juejing|ganlu|zishou|miji|chizhong|xueji|quji|xuehen|jushou|tannang|fangzhu|shangshi|miji",
				bad_skills: "benghuai|jlsg_wumou|shiyong|jlsg_shiyong|yaowu|chanyuan|chouhai",
				break_sha: "jlsg_zhaoxiang|jlsg_yansha",
				maixie_skill: "guixin|yiji|fankui|jieming|xuehen|neoganglie|ganglie|vsganglie|enyuan|fangzhu|nosenyuan|langgu|quanji|zhiyu|renjie|tanlan|tongxin|huashen|duodao|chengxiang|benyu",
			},
		},
		sort: {
			hp: function (a, b) {
				var c1 = a.hp;
				var c2 = b.hp;
				if (c1 == c2) {
					return jlsg.sort.threat(a, b);
				}
				return c1 > c2;
			},
			handcard: function (a, b) {
				var c1 = a.num("h");
				var c2 = b.num("h");
				if (c1 == c2) {
					return jlsg.sort.defense(a, b);
				}
				return c1 < c2;
			},
			value: function (a, b) {
				return jlsg.getValue(a) < jlsg.getValue(b);
			},
			chaofeng: function (a, b) {
				return jlsg.getDefense(a) > jlsg.getDefense(b);
			},
			defense: function (a, b) {
				return jlsg.getDefenseSha(a) < jlsg.getDefenseSha(b);
			},
			threat: function (a, b) {
				var d1 = a.num("h");
				for (var i = 0; i < game.players.length; i++) {
					if (a.canUse("sha", game.players[i]) && a != game.players[i]) {
						d1 = d1 + 10 / jlsg.getDefense(game.players[i]);
					}
				}
				var d2 = b.num("h");
				for (var i = 0; i < game.players.length; i++) {
					if (b.canUse("sha", game.players[i]) && b != game.players[i]) {
						d2 = d2 + 10 / jlsg.getDefense(game.players[i]);
					}
				}
				return d1 > d2;
			},
		},
		isKongcheng: function (player) {
			return player.countCards("h") == 0;
		},
		needKongcheng: function (player, keep) {
			if (keep) {
				return jlsg.isKongcheng(player) && (player.hasSkill("kongcheng") || (player.hasSkill("zhiji") && !player.storage.zhiji));
			}
			if (!jlsg.hasLoseHandcardEffective(player) && !jlsg.isKongcheng(player)) return true;
			if (player.hasSkill("zhiji") && !player.storage.zhiji) return true;
			return player.hasSkills(jlsg.ai.skill.need_kongcheng);
		},
		hasBaguaEffect: function (player) {
			if (player.countCards("e", "bagua")) return true;
			if (player.hasSkill("bazhen") && !player.get("e", "2")) return true;
			if (player.hasSkill("linglong") && !player.get("e", "2")) return true;
			return false;
		},
		hasBuquEffect: function (player) {
			if (player.hasSkill("buqu")) {
				if (player.storage.buqu == undefined) return true;
				if (player.storage.buqu && player.storage.buqu.length <= 4) return true;
				return false;
			}
			return false;
		},
		hasZhuqueEffect: function (player) {
			var cards = player.get("h");
			for (var i = 0; i < cards.length; i++) {
				if (cards[i].name == "sha" && cards[i].nature == "fire") return true;
				if (player.countCards("e", "zhuque") && cards[i].name == "sha" && !cards[i].nature) return true;
			}
			return false;
		},
		hasJiuEffect: function (player) {
			if (player.hasSkills("jiu|boss_zuijiu|luoyi2|reluoyi2|jie|nuzhan2|anjian|jlsg_huxiao|jlsg_jiwu_buff1|jlsg_wenjiu3")) return true;
			if (player.hasSkills("jlsg_ganglie_damage|jlsg_fenwei")) return true;
			if (player.hasSkill("jieyuan") && player.countCards("h") >= 2) if (player.hasSkill("chouhai") && jlsg.isKongcheng(player)) return true;
			if (player.hasSkill("qingxi")) {
				var num = 1;
				var info = get.info(player.get("e", "1"));
				if (info && info.distance && info.distance.attackFrom) {
					num -= info.distance.attackFrom;
				}
				return num > 1;
			}
			return false;
		},
		hasWushuangEffect: function (player) {
			if (player.hasSkills("wushuang|jlsg_shejing")) return true;
			return false;
		},
		hasZhugeEffect: function (player) {
			if (player.countCards("e", "zhuge")) return true;
			if (player.hasSkills("paoxiao|tianyi2|zhanlong2|xianzhen2|jlsg_shayi")) return true;
			return false;
		},
		loseCardEffect: function (player) {
			if (jlsg.needKongcheng(player)) return 3;
			if (jlsg.getLeastHandcardNum(player) > 0) return 1;
			return -player.countCards("h");
		},
		gainCardEffect: function (player) {
			if (jlsg.needKongcheng(target, true)) return -1;
			if (jlsg.getOverflow(player)) return 0;
			return 3;
		},
		getLeastHandcardNum: function (player) {
			var least = 0;
			if (player.hasSkills("lianying|relianying") && least < 1) least = 1;
			if (player.hasSkill("jlsg_ruya") && least < player.maxHp) least = player.maxHp;
			if (player.hasSkill("shangshix") && least < 4) least = 4;
			var jwfy = jlsg.findPlayerBySkillName("shoucheng");
			if (least < 1 && jwfy && jlsg.isFriend(player, jwfy)) least = 1;
			if (player.hasSkill("shangshi") && least < Math.min(2, jlsg.getLostHp(player))) least = Math.min(2, jlsg.getLostHp(player));
			return least;
		},
		hasLoseHandcardEffective: function (player) {
			return player.countCards("h") > jlsg.getLeastHandcardNum(player);
		},
		isWeak: function (player) {
			if (jlsg.hasBuquEffect(player)) return false;
			if (player.hasSkill("longhun") && player.countCards("he") > 2) return false;
			if (player.hasSkill("jlsg_longhun") && player.countCards("he") > 2) return false;
			if (player.hasSkill("hunzi") && !player.storage.hunzi && player.hp > 1) return false;
			if ((player.hp <= 2 && player.countCards("h") <= 2) || player.hp <= 1) return true;
			return false;
		},
		getLostHp: function (player) {
			return player.maxHp - player.hp;
		},
		getBestHp: function (player) {
			var arr = {
				ganlu: 1,
				yinghun: 2,
				xueji: 1,
				baobian: Math.max(0, player.maxHp - 3),
			};
			if (player.hasSkill("longhun") && player.countCards("he") > 2) return 1;
			if (player.hasSkill("hunzi") && !player.storage.hunzi) return 2;
			for (var i in arr) {
				if (player.hasSkill(i)) {
					return Math.max((player.isZhu && 3) || 2, player.maxHp - arr[i]);
				}
			}
			if (player.hasSkill("renjie") && player.hasSkill("sbaiyin")) return player.maxHp - 1;
			if (player.hasSkill("quanji") && player.hasSkill("zili")) return player.maxHp - 1;
			return player.maxHp;
		},
		getValue: function (player) {
			return player.hp * 2 + player.countCards("h");
		},
		isGoodHp: function (player) {
			if (player.hp > 1 || jlsg.getCardsNum("tao", player) >= 1 || jlsg.getCardsNum("jiu", player) >= 1) return true;
			if (jlsg.hasBuquEffect(player)) return true;
			if (player.hasSkill("niepan") && !player.storage.niepan) return true;
			if (player.hasSkill("reniepan") && !player.storage.reniepan) return true;
			if (player.hasSkill("jlsg_zhuizun") && !player.storage.jlsg_zhuizun) return true;
			if (player.hasSkill("fuli") && !player.storage.fuli) return true;
			return false;
		},
		isScure: function (player) {
			if (player.hp > jlsg.getBestHp(player)) return true;
			if (jlsg.countCanShaMe(player) <= 0) return true;
			if (jlsg.isGoodHp(player)) return true;
			return false;
		},
		needBear: function (player) {
			return (player.hasSkill("renjie") && player.hasSkill("sbaiyin") && !player.hasSkill("jilue") && player.storage.renjie < 4) || (player.hasSkill("qinxue") && !player.storage.qinxue);
		},
		cardNeed: function (card, player) {
			if (player == undefined || get.itemtype(player) != "player") player = get.owner(card);
			var friends = jlsg.getFriends(player).sort(jlsg.sort.hp);
			if (!friends.length) return null;
			if (card.name == "tao") {
				friends.sort(jlsg.sort.hp);
				if (friends[0].hp < 2) return 10;
				if (player.hp < 3 || (jlsg.getLostHp(player) > 1 && !player.hasSkills("longhun|buqu|jlsg_longhun")) || player.hasSkills("kurou|benghuai")) return 14;
				return jlsg.getUseValue(card, player);
			}
			var wuguotai = jlsg.findPlayerBySkillName("buyi");
			if (wuguotai && jlsg.isFriend(player, wuguotai) && get.type(card) != "basic") {
				if (player.hp < 3 || (jlsg.getLostHp(player) > 1 && !player.hasSkills("longhun|buqu|jlsg_longhun")) || player.hasSkills("kurou|benghuai")) return 13;
			}
			if (jlsg.isWeak(player) && card.name == "shan" && jlsg.getCardsNum("shan", player, player) < 1) return 12;
			return 0;
		},
		getOverflow: function (player, getMaxCards) {
			var kingdom_num = 0;
			if (player.hasSkill("yongsi") && _status.currentPhase == player && !(player.hasSkill("keji") && get.cardCount({ name: "sha" }, player) == 0)) {
				var list = ["wei", "shu", "wu"];
				for (var i = 0; i < game.players.length && list.length; i++) {
					if (list.includes(game.players[i].group)) {
						list.remove(game.players[i].group);
						kingdom_num++;
					}
				}
			}
			var MaxCards = 0;
			if (player.hasSkill("qiaobian")) MaxCards = Math.max(player.countCards("h") - 1, player.getHandcardLimit());
			if (player.hasSkill("keji") && get.cardCount({ name: "sha" }, player) == 0) MaxCards = player.countCards("h");
			if (getMaxCards && MaxCards > 0) return MaxCards;
			MaxCards = player.getHandcardLimit();
			if (kingdom_num > 0) {
				if (player.countCards("he") <= kingdom_num) MaxCards = 0;
				else MaxCards = Math.min(player.getHandcardLimit(), player.countCards("he") - kingdom_num);
				if (getMaxCards) return MaxCards;
			}
			if (getMaxCards) return player.getHandcardLimit();
			return player.countCards("h") - MaxCards;
		},
		willSkipPhaseUse: function (player) {
			var friend_wuxie = 0;
			for (var i = 0; i < game.players.length; i++) {
				if (jlsg.isFriend(player, game.players[i])) friend_wuxie = friend_wuxie + jlsg.getCardsNum("wuxie", game.players[i], player);
				if (jlsg.isEnemy(player, game.players[i])) friend_wuxie = friend_wuxie - jlsg.getCardsNum("wuxie", game.players[i], player);
			}
			if (player.skipList.includes("phaseUse")) return true;
			if (player.hasJudge("lebu") && !player.hasSkill("yanxiao2") && friend_wuxie <= 0) {
				if (!player.hasSkills("zongshi|keji|guanxing|qiaobian") && player.countCards("h") >= player.hp + 1) return true;
				return false;
			}
			return false;
		},
		willSkipPhaseDraw: function (player) {
			var friend_wuxie = 0;
			for (var i = 0; i < game.players.length; i++) {
				if (jlsg.isFriend(player, game.players[i])) friend_wuxie = friend_wuxie + jlsg.getCardsNum("wuxie", game.players[i], player);
				if (jlsg.isEnemy(player, game.players[i])) friend_wuxie = friend_wuxie - jlsg.getCardsNum("wuxie", game.players[i], player);
			}
			if (player.hasJudge("bingliang") && !player.hasSkill("yanxiao2") && friend_wuxie <= 0) {
				if (!player.hasSkills("guanxing|qiaobian") && player.countCards("h") <= player.hp + 2) return true;
				return false;
			}
			if (player.skipList.includes("phaseDraw")) return true;
			return false;
		},
		getViewAsCard: function (card, player) {
			var skills = player.get("s", true).concat(lib.skill.global);
			game.expandSkills(skills);
			var list = [];
			for (var i = 0; i < skills.length; i++) {
				var ifo = get.info(skills[i]);
				if (ifo.viewAs && ifo.viewAs.name && ifo.filterCard) {
					var filtercard = get.filter(ifo.filterCard);
					var pos = jlsg.getCardPlace(card);
					if ((ifo.selectCard == 1 || ifo.selectCard == undefined) && filtercard(card, player) && ((ifo.position && ifo.position.indexOf(pos) == 0) || (!ifo.position && pos == "h"))) {
						return game.createCard({ name: ifo.viewAs.name, suit: card.suit, number: card.number });
					}
				}
			}
			return null;
		},
		getSkillViewCard: function (card, name, player, place) {
			var skills = player.get("s", true).concat(lib.skill.global);
			game.expandSkills(skills);
			for (var i = 0; i < skills.length; i++) {
				var ifo = get.info(skills[i]);
				if (ifo.viewAs && ifo.viewAs.name == name) {
					if (ifo.filterCard) {
						var filtercard = get.filter(ifo.filterCard);
						if (filtercard(card, player) && (ifo.selectCard == 1 || ifo.selectCard == undefined)) {
							if (ifo.position && ifo.position.indexOf(place) == 0) return true;
							if (!ifo.position) return place == "h";
						}
					}
				}
			}
			return false;
		},
		getCardPlace: function (card) {
			var owner = get.owner(card);
			if (owner) {
				if (owner.get("h").includes(card)) return "h";
				if (owner.get("e").includes(card)) return "e";
				if (owner.get("j").includes(card)) return "j";
				return "s";
			}
			return "s";
		},
		isCard: function (name, card, player) {
			if (!player || !card) return false;
			if (card.name != name) {
				var owner = get.owner(card);
				var place;
				if (!owner || player != owner) {
					place = "h";
				} else {
					place = jlsg.getCardPlace(card);
				}
				if (jlsg.getSkillViewCard(card, name, player, place)) return true;
				if (player.hasSkill("wushen") && get.suit(card) == "heart" && card.name != "sha") return false;
				if (player.hasSkill("jinjiu") && card.name == "jiu") return true;
			} else {
				if (player.hasSkill("wushen") && get.suit(card) == "heart" && card.name == "sha") return true;
				if (player.hasSkill("jinjiu") && card.name == "jiu") return true;
				if (lib.filter.cardUsable(card, player)) return true;
			}
			return false;
		},
		getKnownCard: function (player, from, card_name, viewAs, flags) {
			flags = flags || "h";
			var forbid = false;
			if (!from && player == _status.event.player) forbid = true;
			from = from || _status.event.player;
			var cards = player.get(flags);
			var know = 0;
			for (var i = 0; i < cards.length; i++) {
				var card = cards[i];
				if (!forbid && player == from) {
					if ((viewAs && jlsg.isCard(card_name, card, player)) || card.name == card_name || get.suit(card) == card_name || get.color(card) == card_name) {
						know++;
					}
				}
			}
			return know;
		},
		getDefenseSha: function (player, attacker) {
			if (attacker == undefined || get.itemtype(attacker) != "player") attacker = _status.event.player;
			var defense = jlsg.getCardsNum("shan", player, attacker);
			var knownShan = jlsg.getKnownCard(player, attacker, "shan", true);

			defense = defense + knownShan * 1.2;

			if (attacker.hasSkill("liegong")) {
				var length = player.countCards("h");
				if (length >= attacker.hp || length <= get.attackRange(attacker)) return 0;
			}
			if (attacker.hasSkill("reliegong")) {
				var num = 0;
				if (player.countCards("h") >= attacker.num("h")) num++;
				if (player.hp >= attacker.hp) num++;
				if (get.attackRange(player) <= get.attackRange(attacker)) num++;
				if (num > 0) return 0;
			}

			if (jlsg.hasBaguaEffect(player)) {
				defense += 1.3;
				if (player.hasSkill("tiandu")) defense += 0.6;
				if (player.hasSkill("leiji")) defense += 0.4;
				if (player.hasSkill("boss_leiji")) defense += 0.5;
				if (player.hasSkill("releiji")) defense += 0.4;
				if (player.hasSkill("hongyan")) defense += 0.2;
			}

			if (jlsg.getCardsNum("shan", player, _status.event.player) > 1) {
				if (player.hasSkill("mingzhe")) defense += 0.2;
				if (player.hasSkill("tuntian") && player.hasSkill("zaoxian")) defense += 1.5;
			}

			if (player.hasSkill("aocai") && _status.currentPhase !== player) defense += 0.5;
			if (player.hasSkill("jlsg_zhenlie")) defense += 0.5;
			if (player.hasSkill("jlsg_danshou") && !jlsg.isKongcheng(player) && !jlsg.isKongcheng(attacker)) defense += 0.5;

			var jlsgsk_zhuran = jlsg.findPlayerBySkillName("jlsg_yonglie");
			if (jlsgsk_zhuran && jlsg.isGoodHp(jlsgsk_zhuran)) {
				if (player.inRangeOf(jlsgsk_zhuran) && jlsg.isFriend(player, jlsgsk_zhuran)) defense += 0.5;
			}
			var jlsgsr_zhangliao = jlsg.findPlayerBySkillName("jlsg_yansha");
			if (jlsgsr_zhangliao && jlsgsr_zhangliao.storage.jlsg_yansha2 && jlsgsr_zhangliao.storage.jlsg_yansha2.length) {
				if (jlsg.isFriend(player, jlsgsr_zhangliao) && get.attitude(jlsgsr_zhangliao, attacker) < 0 && attacker.num("he")) defense += 0.5;
			}

			if (player.hasZhuSkill("hujia")) {
				var caocao = player;
				var list = game.filterPlayer(function (target) {
					return jlsg.isFriend(target, caocao) && target.group == "wei" && target != caocao;
				});
				if (list.length > 0) {
					var hujiaShan = 0;
					for (var i = 0; i < list.length; i++) {
						hujiaShan += jlsg.getCardsNum("shan", list[i], _status.event.player);
						if (jlsg.hasBaguaEffect(list[i])) hujiaShan += 0.8;
					}
					defense += hujiaShan;
				}
			}
			defense = defense + Math.min(player.hp * 0.45, 10);
			if (attacker && !attacker.hasSkill("jueqing")) {
				if (player.hasSkillTag("maixie") && jlsg.isGoodHp(player)) defense++;

				if (player.hasSkill("jieming")) defense += 4;
				if (player.hasSkills("yiji|jlsg_yiji")) defense += 4;
				if (player.hasSkill("guixin")) defense += 4;
				if (player.hasSkill("yuce")) defense += 2;
			}

			if (player.hasSkills("rende|rerende") && player.hp > 2) defense++;
			if (player.hasSkill("kuanggu") && player.hp > 1) defense += 0.2;
			if (player.hasSkill("tianming") && player.hp > 1) defense += 0.1;
			if (player.hasSkills("zaiqi|rezaiqi") && player.hp > 1) defense += 0.35;
			if (player.hp > jlsg.getBestHp(player)) defense += 0.8;
			if (player.hp <= 2) defense -= 0.4;
			if (player.hasSkill("tianxiang")) defense += player.countCards("h") * 0.5;

			if (player.countCards("e", "tengjia") && jlsg.hasZhuqueEffect(attacker) && !attacker.hasSkill("unequip")) defense -= 0.6;
			if (player.isZhu) {
				defense -= 0.4;
				if (jlsg.isZhuInDanger()) defense -= 0.7;
			}
			if (player.isTurnedOver() && !player.hasSkill("jlsg_youxia")) defense -= 0.35;

			if (player.countCards("j", "lebu") && !player.hasSkill("yanxiao2")) defense -= 0.15;
			if (player.countCards("j", "bingliang") && !player.hasSkill("yanxiao2")) defense -= 0.15;
			if (player.countCards("j", "caomu") && !player.hasSkill("yanxiao2")) defense -= 0.15;

			if ((attacker.hasSkill("roulin") && player.sex == "female") || (attacker.sex == "female" && player.hasSkill("roulin"))) defense = defense - 2.4;

			if (!jlsg.hasBaguaEffect(player)) {
				if (player.hasSkill("jijiu")) defense -= 3;
				if (player.hasSkill("dimeng")) defense -= 2.5;
				if (player.hasSkill("guzheng") && !jlsg.getCardsNum("shan", player, attacker)) defense -= 2.5;
				if (player.hasSkill("qiaobian")) defense -= 2.4;
				if (player.hasSkill("jieyin")) defense -= 2.3;
				if (player.hasSkills("lijian|jlsg_lijian")) defense -= 2.2;
			}
			return defense;
		},
		getDefense: function (player) {
			if (player == undefined || get.itemtype(player) != "player") {
				return 0;
			}
			var current_player = _status.event.player;
			if (!current_player) return jlsg.getValue(player);

			var defense = jlsg.getValue(player);

			if (player.get("e", "2")) defense += 2;
			if (player.get("e", "3")) defense++;
			if (player.countCards("e", "muniu") && player.get("e", "5").cards) defense += player.get("e", "5").cards.length;

			if (jlsg.hasBaguaEffect(player)) {
				if (player.hasSkill("tiandu")) defense++;
				if (player.hasSkill("leiji")) defense += 2;
				if (player.hasSkill("boss_leiji")) defense += 2;
				if (player.hasSkill("releiji")) defense += 2;
				if (player.hasSkill("hongyan")) defense += 2;
			}
			var maixie = jlsg.ai.skill.maixie_skill.split("|");
			for (var i = 0; i < maixie.length; i++) {
				if (player.hasSkill(maixie[i]) && jlsg.isGoodHp(player)) defense++;
			}

			if (player.hasSkill("jieming")) defense += 3;
			if (player.hasSkills("yiji|jlsg_yiji")) defense += 3;
			if (player.hasSkill("guixin")) defense += game.players.length - 1;
			if (player.hasSkill("yuce")) defense += 2;
			if (player.hasSkill("chengxiang")) defense++;

			if (player.hasZhuSkill("shichou")) {
				var current = jlsg.findPlayerBySkillName("shichou_dying");
				if (current) defense += current.hp;
			}

			if (player.hasSkill("rende") && player.countCards("h") > 1 && player.hp > 2) defense++;
			if (player.hasSkill("rerende") && player.countCards("h") > 1 && player.hp > 2) defense++;
			if (player.hasSkill("kuanggu") && player.hp > 1) defense += 0.5;
			if (player.hasSkill("diykuanggu") && player.hp > 1) defense += 0.5;
			if (player.hasSkill("zaiqi") && player.hp > 1) defense = defense + (player.maxHp - player.hp) * 0.5;
			if (player.hasSkill("tianming")) defense += 0.5;
			if (player.hasSkill("keji")) defense += player.countCards("h") * 0.25;
			if (player.hasSkill("aocai") && _status.currentPhase !== player) defense += 0.5;
			if (player.hasSkill("tianxiang")) defense += player.countCards("h") * 0.5;

			if (player.hp > jlsg.getBestHp(player)) defense += 0.8;
			if (player.hp <= 2) defense = defense - 0.4;
			if (player.hasSkill("benghuai") && player.maxHp <= 5) defense--;
			if (player.hasSkills(jlsg.ai.skill.bad_skills)) defense--;

			if (player.isZhu) {
				defense = defense - 0.4;
				if (jlsg.isZhuInDanger()) defense = defense - 0.7;
			}

			var invaliditySkill = ["yijue", "boss_hujia", "retieji", "pozhou", "jlsg_zhenhun"];
			for (var i = 0; i < invaliditySkill.length; i++) {
				if (player.disabledSkills[invaliditySkill[i]] && player.disabledSkills[invaliditySkill[i]].length > 0) defense -= 5;
			}

			if (player.isTurnedOver()) defense--;

			if (player.countCards("j", "lebu") && !player.hasSkill("yanxiao2")) defense -= 0.5;
			if (player.countCards("j", "bingliang") && !player.hasSkill("yanxiao2")) defense -= 0.5;
			if (player.countCards("j", "caomu") && !player.hasSkill("yanxiao2")) defense -= 0.5;

			if (player.hasSkill("jijiu")) defense += 2;
			if (player.hasSkill("qingnang")) defense += 2;
			if (player.hasSkill("dimeng")) defense += 2.5;
			if (player.hasSkill("guzheng")) defense += 2.5;
			if (player.hasSkill("qiaobian")) defense += 2.4;
			if (player.hasSkill("jieyin")) defense += 2.3;
			if (player.hasSkills("jlsg_lijian|lijian")) defense += 2.1;
			if (player.hasSkill("yishe")) defense += 2;
			if (player.hasSkill("paiyi")) defense += 1.5;
			if (player.hasSkill("yongsi")) defense += 2;

			defense = defense + (game.players.length - (get.distance(player, _status.currentPhase, "absolute") % game.players.length)) / 4;

			defense = defense + player.get("s").length * 0.25;

			return defense;
		},
		findCardInCardPile: function (name) {
			var card;
			for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
				card = ui.cardPile.childNodes[i];
				if (typeof name == "string") {
					if (card.name == name) {
						return card;
					}
				} else if (typeof name == "function") {
					if (name(card)) {
						return card;
					}
				}
			}
			return null;
		},
		findCardInDiscardPile: function (name) {
			var cards = [];
			var card = false;
			for (var i = 0; i < ui.discardPile.childNodes.length; i++) {
				card = ui.discardPile.childNodes[i];
				if (typeof name == "string") {
					if (card.name == name) {
						return card;
					}
				} else if (typeof name == "function") {
					if (name(card)) {
						return card;
					}
				} else {
					cards = cards.concat(card);
				}
			}
			if (cards.length) return cards.randomGet();
			return null;
		},
		isZhuHealthy: function () {
			var zhu = get.zhu();
			if (!zhu) return false;
			var zhu_hp;
			if (zhu.hasSkill("benghuai") && zhu.hp > 4) {
				zhu_hp = 4;
			} else {
				zhu_hp = zhu.hp;
			}
			return zhu_hp > 3 || (zhu_hp > 2 && jlsg.getDefense(zhu) > 3);
		},
		isZhuInDanger: function () {
			var zhu = get.zhu();
			if (!zhu) return false;
			var zhu_hp;
			if (zhu.hasSkill("benghuai") && zhu.hp > 4) {
				zhu_hp = 4;
			} else {
				zhu_hp = zhu.hp;
			}
			return zhu_hp < 3;
		},
		findPlayerBySkillName: function (skills) {
			return game.findPlayer(function (player) {
				return player.hasSkills(skills);
			});
		},
		isFriend: function (other, another) {
			return get.attitude(other, another) > 0;
		},
		isEnemy: function (other, another) {
			return get.attitude(other, another) < 0;
		},
		getFriends: function (player) {
			return game.filterPlayer(function (target) {
				return jlsg.isFriend(player, target);
			});
		},
		getFriendsNoself: function (player) {
			return game.filterPlayer(function (target) {
				return jlsg.isFriend(player, target) && player != target;
			});
		},
		getEnemies: function (player) {
			return game.filterPlayer(function (target) {
				return jlsg.isEnemy(player, target);
			});
		},
		filterFriend: function (player, func) {
			var friends = jlsg.getFriends(player);
			for (var i = 0; i < friends.length; i++) {
				if (func(friends[i])) {
					return game.players[i];
				}
			}
			return null;
		},
		filterFriends: function (player, func) {
			var list = [];
			var friends = jlsg.getFriends(player);
			for (var i = 0; i < friends.length; i++) {
				if (func(friends[i])) {
					list.push(game.players[i]);
				}
			}
			return list;
		},
		filterEnemy: function (player, func) {
			var enemies = jlsg.getEnemies(player);
			for (var i = 0; i < enemies.length; i++) {
				if (func(enemies[i])) {
					return game.players[i];
				}
			}
			return null;
		},
		filterEnemies: function (player, func) {
			var list = [];
			var enemies = jlsg.getEnemies(player);
			for (var i = 0; i < enemies.length; i++) {
				if (func(enemies[i])) {
					list.push(game.players[i]);
				}
			}
			return list;
		},
		countFriends: function (player) {
			return game.countPlayer(function (target) {
				return jlsg.isFriend(player, target) && target != player;
			});
		},
		countEnemies: function (player) {
			return game.countPlayer(function (target) {
				return jlsg.isEnemy(player, target);
			});
		},
		countNextEmenies: function (from, to) {
			var num = 0;
			var current = from.getNext();
			for (var i = 0; i < 10 && current != to; i++) {
				if (jlsg.isEnemy(to, current)) {
					num++;
				}
				current = current.getNext();
			}
			return num;
		},
		getNextEmenies: function (from, to) {
			var list = [];
			var current = from.getNext();
			for (var i = 0; i < 10 && current != to; i++) {
				if (jlsg.isEnemy(to, current)) {
					list.push(current);
				}
				current = current.getNext();
			}
			return list;
		},
		countCanShaMe: function (player) {
			return game.countPlayer(function (target) {
				return jlsg.isEnemy(player, target) && target.canUse("sha", player) && get.effect(target, { name: "sha" }, player) > 0;
			});
		},
		getCanShaMe: function (player) {
			return game.filterPlayer(function (target) {
				return jlsg.isEnemy(player, target) && target.canUse("sha", player) && get.effect(player, { name: "sha" }, target) > 0;
			});
		},
		getWillShaTarget: function (player) {
			var target = game.filterPlayer(function (target1) {
				return player.canUse("sha", target1) && get.effect(target1, { name: "sha" }, player) > 0;
			});
			target.sort(function (a, b) {
				return get.effect(a, { name: "sha" }, player) < get.effect(a, { name: "sha" }, player);
			});
			return target[0];
		},
		getCardsNum: function (class_name, player, from) {
			if (player == undefined || get.itemtype(player) != "player") player = _status.event.player;
			var cards = player.get("h");
			if (player.countCards("e", "muniu") && player.get("e", "5").cards && player.get("e", "5").cards.length) {
				cards = cards.concat(player.get("e", "5").cards);
			}
			var num = 0,
				shownum = 0,
				redtao = 0,
				redsha = 0,
				rencard = 0,
				blackcard = 0,
				blackwuxie = 0,
				equipwuxie = 0;
			var equipcard = 0,
				heartsha = 0,
				hearttao = 0,
				spadewuxie = 0,
				spadejiu = 0,
				spadecard = 0,
				diamondcard = 0;
			var clubcard = 0,
				shashan = 0,
				jiunum = 0;
			var forbid = false;
			if (!from && _status.event.player != player) forbid = true;
			from = from || _status.event.player;
			for (var i = 0; i < cards.length; i++) {
				var card = cards[i];
				if (!forbid && player == from) {
					shownum++;
					if (card.name == class_name) num++;
					if (card.name == "jiu") jiunum++;
					if (get.type(card) == "equip") equipcard++;
					if (card.name == "sha" || card.name == "shan") shashan++;
					if (get.color(card) == "red") {
						rencard++;
						if (card.name != "sha") redsha++;
						if (card.name != "tao") redtao++;
					}
					if (get.color(card) == "black") {
						blackcard++;
						if (card.name != "wuxie") blackwuxie++;
					}
					if (get.suit(card) == "heart") {
						if (card.name != "sha") heartsha++;
						if (card.name != "tao") redtao++;
					}
					if (get.suit(card) == "spade") {
						if (card.name != "wuxie") spadewuxie++;
						if (card.name != "jiu") spadejiu++;
					}
					if (get.suit(card) == "diamond" && card.name != "sha") diamondcard++;
					if (get.suit(card) == "club") clubcard++;
				}
			}
			var ecards = player.get("e");
			for (var i = 0; i < ecards.length; i++) {
				var card = ecards[i];
				equipcard++;
				if (player.countCards("h") > player.hp) equipwuxie++;
				if (get.color(card) == "red") {
					redtao++;
					redsha++;
				}
				if (get.suit(card) == "heart") hearttao++;
				if (get.suit(card) == "spade") spadecard++;
				if (get.suit(card) == "diamond") diamondcard++;
				if (get.suit(card) == "club") clubcard++;
			}
			if (class_name == "sha") {
				var shanum;
				if (player.hasSkill("wusheng")) {
					shanum = redsha + num + (player.countCards("h") - shownum) * 0.69;
				}
				if (player.hasSkill("shizhi") && player.hp == 1) {
					shanum = shashan + (player.countCards("h") - shownum) * 0.3;
				} else if (player.hasSkill("wushen")) {
					shanum = heartsha + num + (player.countCards("h") - shownum) * 0.5;
				} else if (player.hasSkill("jinjiu")) {
					shanum = jiunum + num + (player.countCards("h") - shownum) * 0.5;
				} else if (player.hasSkills("longhun|jlsg_longhun")) {
					shanum = diamondcard + num + (player.countCards("h") - shownum) * 0.5;
				} else if (player.hasSkill("nos_gongji")) {
					shanum = equipcard + num + (player.countCards("h") - shownum) * 0.5;
				} else if (player.hasSkills("chixin")) {
					shanum = shashan + (player.countCards("h") - shownum) * 0.72;
				} else if (player.countCards("e", "zhangba")) {
					shanum = num + (player.countCards("h") - shownum) * 0.2;
				} else {
					shanum = num + (player.countCards("h") - shownum) * 0.35;
				}
				return (jlsg.hasWushuangEffect(player) && shanum * 2) || shanum;
			} else if (class_name == "shan") {
				if (player.hasSkill("qingguo")) {
					return blackcard + num + (player.countCards("h") - shownum) * 0.8;
				} else if (player.hasSkills("longdan|chixin")) {
					return shashan + (player.countCards("h") - shownum) * 0.72;
				} else if (player.hasSkills("longhun|jlsg_longhun")) {
					return clubcard + num + (player.countCards("h") - shownum) * 0.65;
				} else if (player.hasSkill("jieyue3")) {
					return rencard + num + (player.countCards("h") - shownum) * 0.5;
				} else {
					return num + (player.countCards("h") - shownum) * 0.6;
				}
			} else if (class_name == "tao") {
				if (player.hasSkill("jijiu")) {
					return num + redtao + (player.countCards("h") - shownum) * 0.6;
				} else if (player.hasSkills("longhun|jlsg_longhun")) {
					return hearttao + num + (player.countCards("h") - shownum) * 0.5;
				} else {
					return num;
				}
			} else if (class_name == "jiu") {
				if (player.hasSkill("jiuchi")) {
					return num + spadejiu + (player.countCards("h") - shownum) * 0.3;
				} else if (player.hasSkill("jiushi")) {
					return num + 1;
				} else {
					return num;
				}
			} else if (class_name == "wuxie") {
				if (player.hasSkill("kanpo")) {
					return num + blackwuxie + (player.countCards("h") - shownum) * 0.5;
				} else if (player.hasSkill("yanzheng")) {
					return num + equipwuxie;
				} else if (player.hasSkill("ruzong")) {
					return num * 3;
				} else {
					return num;
				}
			} else {
				return num;
			}
		},
		getCards: function (name, player) {
			player = player || _status.event.player;
			return player.countCards("he", name);
		},
	};
	lib.jlsg = jlsg;
	window.jlsg = jlsg;

	//单向联机
	for (let packName in characters) {
		const pack = characters[packName];
		let name = pack.name;
		game.import("character", function () {
			return pack;
		});
		lib.arenaReady.push(() => {
			lib.connectCharacterPack.add(name);
		});
		if (!_status.postReconnect[`${name}_pack`]) {
			_status.postReconnect[`${name}_pack`] = [
				function (pack, name) {
					lib.translate[`${name}_character_config`] = pack[name];
					lib.characterPack[name] = pack;
					lib.config[`extension_${name}_characters_enable`] = true;
					lib.connectCharacterPack.add(name);
					lib.config.characters.add(name);
				},
				lib.characterPack[name],
				name,
			];
		}
		if (!_status.postReconnect[`${name}_translate`]) {
			_status.postReconnect[`${name}_translate`] = [
				function (translates, name) {
					lib.translate[`${name}_character_config`] = translates[name];
					for (let key in translates) {
						lib.translate[key] = translates[key];
					}
				},
				pack.translate,
				name,
			];
		}
	}
	if (!_status.postReconnect.jlsg_namePrefix) {
		_status.postReconnect.jlsg_namePrefix = [
			function () {
				lib.namePrefix.set("极略SK神", {
					getSpan(prefix, name) {
						return `${get.prefixSpan("极略SK", name)}${get.prefixSpan("神", name)}`;
					},
				});
				lib.namePrefix.set("极略SP神", {
					getSpan(prefix, name) {
						return `${get.prefixSpan("极略SP", name)}${get.prefixSpan("神", name)}`;
					},
				});
				lib.namePrefix.set("极略SR", {
					getSpan: () => {
						return `<span style="writing-mode:horizontal-tb;-webkit-writing-mode:horizontal-tb;font-family:MotoyaLMaru;transform:scaleY(0.85)" data-nature="keymm">SR</span>`;
					},
				});
				lib.namePrefix.set("极略SK", {
					getSpan: () => {
						return `<span style="color:#fbefef;writing-mode:horizontal-tb;-webkit-writing-mode:horizontal-tb;font-family:MotoyaLMaru;transform:scaleY(0.85)" data-nature="firemm">SK</span>`;
					},
				});
				lib.namePrefix.set("极略SP", {
					getSpan: () => {
						return `<span style="writing-mode:horizontal-tb;-webkit-writing-mode:horizontal-tb;font-family:MotoyaLMaru;transform:scaleY(0.85)">SP</span>`;
					},
				});
				lib.namePrefix.set("极略★SK", {
					getSpan(prefix, name) {
						return `${get.prefixSpan("★SP", name)}${get.prefixSpan("极略SK", name)}`;
					},
				});
				if (lib.config?.extension_极略_syRefactor) {
					game.addGroup("jlsgsy", "魔", "极略三英", { color: "#8B4A51" });
					lib.namePrefix.set("极略SY", {
						getSpan: () => {
							const span = document.createElement("span"),
								style = span.style;
							style.color = "#8B4A51";
							style.writingMode = style.webkitWritingMode = "horizontal-tb";
							style.fontFamily = "MotoyaLMaru";
							style.transform = "scaleY(0.85)";
							span.dataset.nature = "keymm";
							span.innerHTML = "SY";
							return span.outerHTML;
						},
					});
					lib.namePrefix.set("极略SY暴怒", {
						getSpan: () => {
							const span = document.createElement("span"),
								style = span.style;
							style.color = "#B22222";
							style.writingMode = style.webkitWritingMode = "horizontal-tb";
							style.fontFamily = "MotoyaLMaru";
							style.transform = "scaleY(0.85)";
							span.dataset.nature = "orangemm";
							span.innerHTML = "SY";
							return span.outerHTML;
						},
					});
				}
			},
			[],
		];
	}

	let name = jlsg_qs.name;
	game.import("card", function () {
		return jlsg_qs;
	});
	lib.arenaReady.push(() => {
		lib.connectCardPack.add(name);
	});
	if (!_status.postReconnect[`${name}_pack`]) {
		_status.postReconnect[`${name}_pack`] = [
			function (pack, name) {
				lib.translate[`${name}_card_config`] = pack[name];
				lib.cardPack[name] = pack;
				lib.config[`extension_${name}_cards_enable`] = true;
				lib.connectCardPack.add(name);
				//lib.config.all.cards.add(name);
				lib.config.cards.add(name);
			},
			lib.cardPack[name],
		];
	}
	if (!_status.postReconnect[`${name}_translate`]) {
		_status.postReconnect[`${name}_translate`] = [
			function (translates, name) {
				lib.translate[`${name}_card_config`] = translates[name];
				for (let key in translates) lib.translate[key] = translates[key];
			},
			jlsg_qs.translate,
			name,
		];
	}

	lib.element.content.waitForPlayer = function () {
		"step 0";
		ui.auto.hide();
		ui.pause.hide();
		game.createServer();
		if (!lib.translate.zhu) {
			lib.translate.zhu = "主";
		}
		if (event.func) {
			event.func();
		}
		if (!lib.configOL.number) {
			lib.configOL.number = parseInt(lib.configOL.player_number);
		}
		if (game.onlineroom) {
			game.send("server", "config", lib.configOL);
		}
		ui.create.connectPlayers(game.ip);
		if (!window.isNonameServer) {
			var me = game.connectPlayers[0];
			me.setIdentity("zhu");
			me.initOL(get.connectNickname(), lib.config.connect_avatar);
			me.playerid = "1";
			game.onlinezhu = "1";
		}
		_status.waitingForPlayer = true;
		if (window.isNonameServer) {
			document.querySelector("#server_status").innerHTML = "等待中";
		}
		game.pause();
		("step 1");
		_status.waitingForPlayer = false;
		lib.configOL.gameStarted = true;
		if (window.isNonameServer) {
			document.querySelector("#server_status").innerHTML = "游戏中";
		}
		if (game.onlineroom) {
			game.send("server", "config", lib.configOL);
		}
		for (var i = 0; i < game.connectPlayers.length; i++) {
			game.connectPlayers[i].delete();
		}
		delete game.connectPlayers;
		if (ui.roomInfo) {
			ui.roomInfo.remove();
			delete ui.roomInfo;
		}
		if (ui.exitroom) {
			ui.exitroom.remove();
			delete ui.exitroom;
		}
		game.broadcast(function (postReconnect, pack) {
			postReconnect = get.parsedResult(postReconnect);
			for (var i in postReconnect) {
				if (Array.isArray(postReconnect[i])) {
					postReconnect[i].shift().apply(this, postReconnect[i]);
				}
			}
		}, _status.postReconnect);
		game.broadcast("gameStart");
		game.delay(2);
		ui.auto.show();
		ui.pause.show();
		if (lib.config.show_cardpile) {
			ui.cardPileButton.style.display = "";
		}
	};
}
