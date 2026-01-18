// game.import(name: "极略"
import { lib, game, ui, get, ai, _status } from "../../noname.js";
import { content } from "./main/content.js";
import { precontent } from "./main/precontent.js";
import { config } from "./main/config.js";
import { help } from "./main/help.js";
import { basic } from "./main/basic.js";
import { extensionDefaultPackage } from "./main/main.js";

lib.init.css(lib.assetURL + "extension/极略", "extension");

let changelog = `
<a onclick="if (jlsg) jlsg.showRepo()" style="cursor: pointer;text-decoration: underline;">
Visit Repository</a><br>
群：702142668<br>
备用群：1058928074<br>
<span onclick="if (jlsg) jlsg.openLink('https://keu1vrp2sz.feishu.cn/docx/CpsrdV4sDoazzUxzChMcqGjIneh')" 
style="color: red; font-size: x-large;cursor: pointer;text-decoration: underline;">
汇报bug点我</span><br>
2025.12.06更新<br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="orangemm">SK陈式</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="woodmm">SK滕公主</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="qunmm">SP太史慈</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="thundermm">SP神甄姬</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="thundermm">SK神董卓</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="thundermm">魔袁术</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="firemm">刘备·龙横蜀汉</div><br>
&ensp; 将武将包进一步拆分<br>
&ensp; 将“负面效果”相关内容拆分<br>
&ensp; 重写“七杀包规则重构”<br>
&ensp; 修复若干bug<br>
`;

export let type = "extension";
export default async function () {
	const extensionInfo = await lib.init.promises.json(`${basic.extensionDirectoryPath}info.json`);
	let extension = {
		name: extensionInfo.name,
		editable: false,
		content: content,
		precontent: precontent,
		config: await basic.resolve(config),
		help: await basic.resolve(help),
		package: await basic.resolve(extensionDefaultPackage),
		files: { character: [], card: [], skill: [], audio: [] },
	};
	Object.keys(extensionInfo)
		.filter(key => key != "name")
		.forEach(key => (extension.package[key] = extensionInfo[key]));
	extension.package.changelog = changelog;
	return extension;
}
