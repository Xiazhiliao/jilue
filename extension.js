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
2025.05.26更新<br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="qunmm">SK葛玄</div><br>
&ensp; 修复bug（观虚、羽化、星舞、同心、暴怒、离魂、储元、天辩）<br>
&ensp; 优化技能（搏战、忠侯）<br>
&ensp; 添加extension.css以适配后续武将使用“临时牌”样式<br>
&ensp; 对srlose规则进行调整<br>
&ensp; 对SR包和SK包内的武将姓名进行补充/更正<br>
&ensp; 对SR武将进行翻修（张辽、甄姬、许诸、司马懿、郭嘉、吕布、华佗、貂蝉、孙尚香、大乔、黄盖、吕蒙）<br>
&ensp; 从extension.js中拆分help，并补充相关信息（许愿、临时牌）<br>
<span style="font-size: large;">历史：</span><br>
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
