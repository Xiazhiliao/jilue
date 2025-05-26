// game.import(name: "极略"
import { lib, game, ui, get, ai, _status } from '../../noname.js';
import { precontent } from './js/precontent/index.js';
import { content } from './js/content.js';
import { config } from './js/config.js';
import { help } from './js/help.js';

lib.init.css(lib.assetURL + 'extension/极略', 'extension');

let extensionPackage = {
  name: "极略",
  connect: true,
  editable: false,
  content: content,
  precontent: precontent,
  config: config,
  help: help,
  package: {
    character: {}, card: {}, skill: {},
    intro: `<div>\
<img src="${lib.assetURL}extension/极略/image/other/logo.webp" alt="极略三国"\
style="width:100%;max-width:492px;display:block;margin:auto;"\
onclick="if (lib.jlsg) lib.jlsg.showRepoElement(this)"></img>
<ul><li>极略全部武将·附带七杀卡包+极略三英武将，不需要请记得关闭。<li>帮助中查看更多内容</ul>
<a onclick="if (jlsg) jlsg.checkUpdate(this)" style="cursor: pointer;text-decoration: underline;font-weight: bold;">
检查更新Beta<br></a>
</div>`,
    author: "可乐，赵云，青冢，萧墨(17岁)，xiaoas<br>维护：流年",
    diskURL: "",
    forumURL: "",
    mirrorURL: "https://github.com/Xiazhiliao/jilue",
    version: "2.7.0526",
    changelog: `
<a onclick="if (jlsg) jlsg.showRepo()" style="cursor: pointer;text-decoration: underline;">
Visit Repository</a><br>
群：702142668<br>
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
2025.05.08更新<br>
&ensp; 修复bug（刚直、玲珑、武志、精策、扼绝）<br>
&ensp; 优化技能（悍勇、反骨、魔兽）<br>
2025.04.27更新<br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="thundermm">SP神关羽</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="orangemm">万魂归寂</div><br>
&ensp; 修复bug（灵泽、三绝、反骨、扶汉、才遇、枕戈）<br>
&ensp; 优化（草船借箭、通天）<br>
&ensp; 武将原画、语音归类<br>
&ensp; 拆分extension.js文件<br>
`,
  },
  files: {},
};
export let type = 'extension';
export default extensionPackage;