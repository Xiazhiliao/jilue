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
    mirrorURL: "https://github.com/xiaoas/jilue",
    version: "2.7.0508",
    changelog: `
<a onclick="if (jlsg) jlsg.showRepo()" style="cursor: pointer;text-decoration: underline;">
Visit Repository</a><br>
群：702142668<br>
<span onclick="if (jlsg) jlsg.openLink('https://keu1vrp2sz.feishu.cn/docx/CpsrdV4sDoazzUxzChMcqGjIneh')" 
style="color: red; font-size: x-large;cursor: pointer;text-decoration: underline;">
汇报bug点我</span><br>
2025.05.08更新<br>
&ensp; 修复bug（刚直、玲珑、武志、精策、扼绝）<br>
&ensp; 优化技能（悍勇、反骨、魔兽）<br>
<span style="font-size: large;">历史：</span><br>
2025.04.27更新<br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="thundermm">SP神关羽</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="orangemm">万魂归寂</div><br>
&ensp; 修复bug（灵泽、三绝、反骨、扶汉、才遇、枕戈）<br>
&ensp; 优化（草船借箭、通天）<br>
&ensp; 武将原画、语音归类<br>
&ensp; 拆分extension.js文件<br>
2025.04.18更新<br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="woodmm">SK岑昏</div><br>
&ensp; 修复bug（矫诏、矢北、星舞、逐星、兴汉）<br>
&ensp; 优化技能（恢拓）<br>
2025.04.08更新<br>
&ensp; 修复bug（逐星、恃傲、图南、兴汉、玲珑）<br>
&ensp; 优化技能（千幻、三绝、芳魂、天道、博略、天工、观虚）<br>
2025.03.30更新<br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="firemm">SK杨婉</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="woodmm">冠勇盖世·孙策</div><br>
&ensp; 修复技能bug（天工、烈弓、绝世、传说无双、鬼驱、灵泽）<br>
&ensp; 优化技能（锦织、鱼忧、玲珑）<br>
&ensp; 修复资料页无法播放武将阵亡配音的bug<br>
2025.03.17更新<br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="thundermm">SK神蔡文姬</div><br>
&ensp; 修复若干bug(离魂、逐星、龙魂、罗刹)<br>
&ensp; 优化忧恤写法，优化天工、玲珑ai<br>
2025.02.28更新<br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="watermm">SK诸葛诞</div><br>
&ensp; 调整武将<span style="display:inline; font-family: xingkai, xinwei;" data-nature="thundermm">SP神赵云</span>技能为最新版[6.4.3]<br>
&ensp; 修复[天工]托管时的一个bug<br>
2025.02.26更新<br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="thundermm">SK神庞统</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="thundermm">SP神赵云</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="thundermm">SP神孙尚香</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="firemm">SK秦宓</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="firemm">SK吕凯</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="watermm">SK郭淮</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="woodmm">SK周夷</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="qunmm">SK邢道荣</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="qunmm">SK黄承彦</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="qunmm">水墨丹青•貂蝉</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="orangemm">妖媚之殃</div><br>
&ensp; 更新武将<div style="display:inline; font-family: xingkai, xinwei;" data-nature="orangemm">南中魔兽</div><br>
&ensp; 修复若干历史遗留bug<br>
`,
  },
  files: {},
};
export let type = 'extension';
export default extensionPackage;