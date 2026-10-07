let skill = {
		jlsg_dmtt_shichou1: "纵目裂眦山河震，一怒千军尽胆寒！",
		jlsg_dmtt_shichou2: "断箭啖睛非吾惧，以血还血震乾坤！",
		jlsg_dmtt_shichou3: "父精母血凝身重，烈骨焚身报天恩！",
		jlsg_fqym_hongyan1: "黛眉不画青山色，自有韶光映玉容。",
		jlsg_fqym_hongyan2: "胭脂漫染冰绡透，不教流光染鬓秋。",
		jlsg_fqym_tianxiang1: "霓裳舞罢香风软，散作千红缀君衣。",
		jlsg_fqym_tianxiang2: "蕉窗月映芙蓉面，罗带轻萦翡翠烟。",
		jlsg_gygs_angyang1: "江东子弟，何惧于天下！",
		jlsg_gygs_angyang2: "当世豪杰，我等必扬名！",
		jlsg_gygs_weifeng1: "胆小鼠辈，可敢应战？",
		jlsg_gygs_weifeng2: "从者可免，拒者难容！",
		jlsg_jdjg_jieyin1: "琴瑟合鸣良缘结，刀剑共吟龙凤姻。",
		jlsg_jdjg_jieyin2: "郎才女貌鸾佩引，龙凤相合琴瑟鸣。",
		jlsg_jdjg_xiaoji1: "弓腰轻射柳，剑绣暗香来。",
		jlsg_jdjg_xiaoji2: "剑舞轻如月，弓盈射天狼。",
		jlsg_lffw_lingxin1: "慧思万千，集智大成。",
		jlsg_lffw_lingxin2: "才学智趣，蕙质兰心。",
		jlsg_lhsh_dade1: "广厦万间，愿庇天下寒士。",
		jlsg_lhsh_dade2: "唯贤于人，方能安国兴邦。",
		jlsg_lhsh_dade3: "德泽既布，四海皆仰汉恩。",
		jlsg_shhs_tiandu1: "事已至此，顺应天命。",
		jlsg_shhs_tiandu2: "得之我幸，失之我命。",
		jlsg_shhs_yiji1: "意之所随，不可言传。",
		jlsg_shhs_yiji2: "隔岸观火，坐利天下。",
		jlsg_smdq_biyue1: "闭月羞花貌，沉鱼落雁容。",
		jlsg_smdq_biyue2: "盈盈碧玉露，芙蓉明月珠。",
		jlsg_smdq_lijian1: "两不相舍，渔翁得利。",
		jlsg_smdq_lijian2: "撩人之舞，二者皆伤。",
		jlsg_spwq_wushuang1: "辕门射戟，天下无双！",
		jlsg_spwq_wushuang2: "这世间，还有谁能挡得住我！",
		jlsg_sslh_luoshen1: "芳蔼幽兰，情意阑珊。",
		jlsg_sslh_luoshen2: "洛灵感焉，徙倚彷徨。",
		jlsg_sslh_qingguo1: "一顾倾城，再顾倾国。",
		jlsg_sslh_qingguo2: "奇服旷世，骨像应图。",
		jlsg_syqj_wusheng1: "刀锋在前，忠义当先！",
		jlsg_syqj_wusheng2: "以义传魂，以武入圣！",
	},
	die = {
		jlsgsk_jdjg_sunshangxiang: "此生此身，唯与君随。",
		jlsgsk_syqj_guanyu: "梦回桃园，恩义常在。",
		jlsgsk_sslh_zhenji: "行行重行行,与君生别离。",
		jlsgsk_spwq_lvbu: "呃啊，绝不可能！",
		jlsgsk_smdq_diaochan: "倾城绝世舞，亦有落幕时...",
		jlsgsk_gygs_sunce: "大业未成，竟被无名之辈暗算...",
		jlsgsk_lffw_huangyueying: "愿来生再与先生相遇...",
		jlsgsk_shhs_guojia: "天劫将至，主公保重...",
		jlsgsk_lhsh_liubei: "若见中原复汉鼎，江陵灯火告孤魂！",
		jlsgsk_fqym_xiaoqiao: "朱砂点染相思意，不若君心似月明...",
		jlsgsk_dmtt_xiahoudun: "力拔山河终不溃，独目何惧赴黄泉！",
	};
for (let i in skill) {
	let ii = "#ext:极略/audio/skill/" + i;
	skill[ii] = skill[i];
	delete skill[i];
}
for (let i in die) {
	let ii = `#ext:极略/audio/die/${i}:die`;
	die[ii] = die[i];
	delete die[i];
}
export default { ...skill, ...die };
