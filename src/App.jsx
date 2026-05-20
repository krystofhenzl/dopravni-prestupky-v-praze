import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const D = {"years":[2015,2016,2017,2018,2019,2020,2021,2022,2023],"tree":[{"id":"Parkovani","n":"Parkov\u00e1n\u00ed a b\u011b\u017en\u00fd provoz","c":"#E69F00","v":3264801,"ch":[{"id":"Parkovani|Parkovani, stani, znaceni","n":"Parkov\u00e1n\u00ed a b\u011b\u017en\u00fd provoz","v":3207464},{"id":"Parkovani|Zneuziti ZTP stani","n":"Zneu\u017eit\u00ed ZTP st\u00e1n\u00ed","v":57337}]},{"id":"Rychlost","n":"Rychlost","c":"#56B4E9","v":2540072,"ch":[{"id":"Rychlost|Do 20 km/h","n":"Do 20 km/h","v":2114739},{"id":"Rychlost|20-40 km/h","n":"20\u201340 km/h","v":421710},{"id":"Rychlost|40/50+ km/h","n":"40/50+ km/h","v":3623}]},{"id":"Cervena","n":"Projet\u00ed \u010derven\u00e9","c":"#D55E00","v":225267,"ch":[{"id":"Cervena|Projeti cervene","n":"Projet\u00ed \u010derven\u00e9","v":225267}]},{"id":"Nebezpecna","n":"Nebezpe\u010dn\u00e1 j\u00edzda","c":"#F0E442","v":10229,"ch":[{"id":"Nebezpecna|Telefon za jizdy","n":"Telefon za j\u00edzdy","v":5477},{"id":"Nebezpecna|Nedani prednosti","n":"Ned\u00e1n\u00ed p\u0159ednosti","v":2923},{"id":"Nebezpecna|Ohrozeni chodce","n":"Ohro\u017een\u00ed chodce","v":846},{"id":"Nebezpecna|Zakazane predjezdeni","n":"Zak\u00e1zan\u00e9 p\u0159edj\u00ed\u017ed\u011bn\u00ed","v":521},{"id":"Nebezpecna|Nehoda se zranenim","n":"Nehoda se zran\u011bn\u00edm","v":241},{"id":"Nebezpecna|Vjezd na prejezd","n":"Vjezd na p\u0159ejezd","v":189},{"id":"Nebezpecna|Protismer na dalnici","n":"Protism\u011br na d\u00e1lnici","v":27},{"id":"Nebezpecna|Jina nebezpecna jizda","n":"Jin\u00e1 nebezpe\u010dn\u00e1 j\u00edzda","v":5}]},{"id":"Alkohol","n":"Alkohol a drogy","c":"#CC79A7","v":23207,"ch":[{"id":"Alkohol|Rizeni pod vlivem","n":"\u0158\u00edzen\u00ed pod vlivem","v":15074},{"id":"Alkohol|Odmitnuti testu","n":"Odm\u00edtnut\u00ed testu","v":7645},{"id":"Alkohol|Nezpusobilost ridice","n":"Nezp\u016fsobilost \u0159idi\u010de","v":488}]},{"id":"BezOpravneni","n":"Bez opr\u00e1vn\u011bn\u00ed","c":"#0072B2","v":10952,"ch":[{"id":"BezOpravneni|Rizeni bez opravneni","n":"\u0158\u00edzen\u00ed bez opr\u00e1vn\u011bn\u00ed","v":10952}]},{"id":"Provozovatel","n":"Provozovatel","c":"#009E73","v":10188,"ch":[{"id":"Provozovatel|Objektivni odpovednost (125f)","n":"Objektivn\u00ed odpov\u011bdnost (\u00a7125f)","v":5438},{"id":"Provozovatel|Starsi forma (125d)","n":"Star\u0161\u00ed forma (\u00a7125d)","v":4750}]},{"id":"Jine","n":"Jin\u00e9","c":"#999999","v":4257,"ch":[{"id":"Jine|Zavadne vozidlo","n":"Z\u00e1vadn\u00e9 vozidlo","v":2991},{"id":"Jine|Jine prestupky","n":"Jin\u00e9 p\u0159estupky","v":699},{"id":"Jine|Prestupek autoskoly","n":"P\u0159estupek auto\u0161koly","v":559},{"id":"Jine|Omezeni tezkych vozidel","n":"Omezen\u00ed t\u011b\u017ek\u00fdch vozidel","v":8}]}],"ys":{"2015|Rychlost|Do 20 km/h":320555,"2015|Rychlost|20-40 km/h":64629,"2015|Parkovani|Parkovani, stani, znaceni":236770,"2015|Nebezpecna|Nehoda se zranenim":30,"2015|BezOpravneni|Rizeni bez opravneni":587,"2015|Alkohol|Odmitnuti testu":395,"2015|Alkohol|Rizeni pod vlivem":632,"2015|Rychlost|40/50+ km/h":411,"2015|Nebezpecna|Telefon za jizdy":292,"2015|Provozovatel|Objektivni odpovednost (125f)":1063,"2015|Jine|Prestupek autoskoly":20,"2015|Cervena|Projeti cervene":27830,"2015|Jine|Jine prestupky":139,"2015|Nebezpecna|Nedani prednosti":243,"2015|Jine|Zavadne vozidlo":228,"2015|Parkovani|Zneuziti ZTP stani":3194,"2015|Nebezpecna|Zakazane predjezdeni":51,"2015|Provozovatel|Starsi forma (125d)":237,"2015|Alkohol|Nezpusobilost ridice":20,"2015|Nebezpecna|Ohrozeni chodce":60,"2015|Nebezpecna|Vjezd na prejezd":7,"2015|Nebezpecna|Protismer na dalnici":4,"2015|Nebezpecna|Jina nebezpecna jizda":2,"2016|Rychlost|Do 20 km/h":299946,"2016|Rychlost|20-40 km/h":52842,"2016|Provozovatel|Starsi forma (125d)":584,"2016|Jine|Zavadne vozidlo":369,"2016|Alkohol|Rizeni pod vlivem":2136,"2016|Alkohol|Nezpusobilost ridice":57,"2016|Alkohol|Odmitnuti testu":848,"2016|BezOpravneni|Rizeni bez opravneni":1119,"2016|Nebezpecna|Telefon za jizdy":714,"2016|Rychlost|40/50+ km/h":403,"2016|Cervena|Projeti cervene":27833,"2016|Nebezpecna|Ohrozeni chodce":129,"2016|Nebezpecna|Zakazane predjezdeni":75,"2016|Nebezpecna|Nedani prednosti":440,"2016|Nebezpecna|Vjezd na prejezd":31,"2016|Nebezpecna|Protismer na dalnici":2,"2016|Parkovani|Zneuziti ZTP stani":3781,"2016|Jine|Omezeni tezkych vozidel":4,"2016|Nebezpecna|Nehoda se zranenim":24,"2016|Parkovani|Parkovani, stani, znaceni":248745,"2016|Jine|Jine prestupky":272,"2016|Jine|Prestupek autoskoly":72,"2016|Provozovatel|Objektivni odpovednost (125f)":949,"2016|Nebezpecna|Jina nebezpecna jizda":3,"2017|Provozovatel|Starsi forma (125d)":595,"2017|Jine|Zavadne vozidlo":354,"2017|Alkohol|Rizeni pod vlivem":1914,"2017|Alkohol|Nezpusobilost ridice":46,"2017|Alkohol|Odmitnuti testu":758,"2017|BezOpravneni|Rizeni bez opravneni":1226,"2017|Nebezpecna|Telefon za jizdy":623,"2017|Rychlost|40/50+ km/h":482,"2017|Rychlost|20-40 km/h":35439,"2017|Rychlost|Do 20 km/h":176207,"2017|Cervena|Projeti cervene":37678,"2017|Nebezpecna|Ohrozeni chodce":135,"2017|Nebezpecna|Zakazane predjezdeni":79,"2017|Nebezpecna|Nedani prednosti":398,"2017|Nebezpecna|Vjezd na prejezd":38,"2017|Nebezpecna|Protismer na dalnici":3,"2017|Parkovani|Zneuziti ZTP stani":4798,"2017|Nebezpecna|Nehoda se zranenim":27,"2017|Parkovani|Parkovani, stani, znaceni":209341,"2017|Jine|Jine prestupky":78,"2017|Jine|Prestupek autoskoly":82,"2017|Provozovatel|Objektivni odpovednost (125f)":350,"2018|Provozovatel|Starsi forma (125d)":984,"2018|Jine|Zavadne vozidlo":363,"2018|Alkohol|Rizeni pod vlivem":1970,"2018|Alkohol|Nezpusobilost ridice":53,"2018|Alkohol|Odmitnuti testu":796,"2018|BezOpravneni|Rizeni bez opravneni":1384,"2018|Nebezpecna|Telefon za jizdy":704,"2018|Rychlost|40/50+ km/h":450,"2018|Rychlost|20-40 km/h":40479,"2018|Rychlost|Do 20 km/h":207610,"2018|Cervena|Projeti cervene":37524,"2018|Nebezpecna|Ohrozeni chodce":128,"2018|Nebezpecna|Zakazane predjezdeni":73,"2018|Nebezpecna|Nedani prednosti":410,"2018|Nebezpecna|Vjezd na prejezd":52,"2018|Nebezpecna|Protismer na dalnici":2,"2018|Parkovani|Zneuziti ZTP stani":8598,"2018|Jine|Omezeni tezkych vozidel":1,"2018|Nebezpecna|Nehoda se zranenim":40,"2018|Parkovani|Parkovani, stani, znaceni":317043,"2018|Jine|Jine prestupky":54,"2018|Jine|Prestupek autoskoly":92,"2018|Provozovatel|Objektivni odpovednost (125f)":622,"2019|Provozovatel|Starsi forma (125d)":1248,"2019|Jine|Zavadne vozidlo":350,"2019|Alkohol|Rizeni pod vlivem":2380,"2019|Alkohol|Nezpusobilost ridice":72,"2019|Alkohol|Odmitnuti testu":849,"2019|BezOpravneni|Rizeni bez opravneni":1469,"2019|Nebezpecna|Telefon za jizdy":824,"2019|Rychlost|40/50+ km/h":362,"2019|Rychlost|20-40 km/h":38953,"2019|Rychlost|Do 20 km/h":226121,"2019|Cervena|Projeti cervene":34683,"2019|Nebezpecna|Ohrozeni chodce":114,"2019|Nebezpecna|Zakazane predjezdeni":73,"2019|Nebezpecna|Nedani prednosti":377,"2019|Nebezpecna|Vjezd na prejezd":13,"2019|Nebezpecna|Protismer na dalnici":3,"2019|Parkovani|Zneuziti ZTP stani":7934,"2019|Jine|Omezeni tezkych vozidel":2,"2019|Nebezpecna|Nehoda se zranenim":37,"2019|Parkovani|Parkovani, stani, znaceni":427316,"2019|Jine|Jine prestupky":67,"2019|Jine|Prestupek autoskoly":84,"2019|Provozovatel|Objektivni odpovednost (125f)":522,"2020|Provozovatel|Starsi forma (125d)":330,"2020|Jine|Zavadne vozidlo":340,"2020|Alkohol|Rizeni pod vlivem":1664,"2020|Alkohol|Nezpusobilost ridice":44,"2020|Alkohol|Odmitnuti testu":859,"2020|BezOpravneni|Rizeni bez opravneni":1259,"2020|Nebezpecna|Telefon za jizdy":761,"2020|Rychlost|40/50+ km/h":374,"2020|Rychlost|20-40 km/h":35207,"2020|Rychlost|Do 20 km/h":168361,"2020|Cervena|Projeti cervene":21779,"2020|Nebezpecna|Ohrozeni chodce":82,"2020|Nebezpecna|Zakazane predjezdeni":29,"2020|Nebezpecna|Nedani prednosti":309,"2020|Nebezpecna|Vjezd na prejezd":16,"2020|Nebezpecna|Protismer na dalnici":4,"2020|Parkovani|Zneuziti ZTP stani":4873,"2020|Nebezpecna|Nehoda se zranenim":18,"2020|Parkovani|Parkovani, stani, znaceni":319276,"2020|Jine|Jine prestupky":38,"2020|Jine|Prestupek autoskoly":66,"2020|Provozovatel|Objektivni odpovednost (125f)":476,"2021|Provozovatel|Starsi forma (125d)":204,"2021|Jine|Zavadne vozidlo":295,"2021|Alkohol|Rizeni pod vlivem":1372,"2021|Alkohol|Nezpusobilost ridice":56,"2021|Alkohol|Odmitnuti testu":1097,"2021|BezOpravneni|Rizeni bez opravneni":1241,"2021|Nebezpecna|Telefon za jizdy":614,"2021|Rychlost|40/50+ km/h":344,"2021|Rychlost|20-40 km/h":30120,"2021|Rychlost|Do 20 km/h":142655,"2021|Cervena|Projeti cervene":11785,"2021|Nebezpecna|Ohrozeni chodce":71,"2021|Nebezpecna|Zakazane predjezdeni":39,"2021|Nebezpecna|Nedani prednosti":288,"2021|Nebezpecna|Vjezd na prejezd":10,"2021|Nebezpecna|Protismer na dalnici":4,"2021|Parkovani|Zneuziti ZTP stani":6191,"2021|Nebezpecna|Nehoda se zranenim":27,"2021|Parkovani|Parkovani, stani, znaceni":421121,"2021|Jine|Jine prestupky":29,"2021|Jine|Prestupek autoskoly":63,"2021|Provozovatel|Objektivni odpovednost (125f)":356,"2022|Provozovatel|Starsi forma (125d)":261,"2022|Jine|Zavadne vozidlo":346,"2022|Alkohol|Rizeni pod vlivem":1435,"2022|Alkohol|Nezpusobilost ridice":70,"2022|Alkohol|Odmitnuti testu":988,"2022|BezOpravneni|Rizeni bez opravneni":1268,"2022|Nebezpecna|Telefon za jizdy":480,"2022|Rychlost|40/50+ km/h":285,"2022|Rychlost|20-40 km/h":52416,"2022|Rychlost|Do 20 km/h":247511,"2022|Cervena|Projeti cervene":12726,"2022|Nebezpecna|Ohrozeni chodce":61,"2022|Nebezpecna|Zakazane predjezdeni":43,"2022|Nebezpecna|Nedani prednosti":225,"2022|Nebezpecna|Vjezd na prejezd":11,"2022|Nebezpecna|Protismer na dalnici":1,"2022|Parkovani|Zneuziti ZTP stani":8847,"2022|Nebezpecna|Nehoda se zranenim":14,"2022|Parkovani|Parkovani, stani, znaceni":511829,"2022|Jine|Prestupek autoskoly":40,"2022|Jine|Jine prestupky":13,"2022|Provozovatel|Objektivni odpovednost (125f)":475,"2023|Parkovani|Parkovani, stani, znaceni":516023,"2023|Parkovani|Zneuziti ZTP stani":9121,"2023|Nebezpecna|Nedani prednosti":233,"2023|Alkohol|Rizeni pod vlivem":1571,"2023|Alkohol|Odmitnuti testu":1055,"2023|Jine|Zavadne vozidlo":346,"2023|Provozovatel|Starsi forma (125d)":307,"2023|BezOpravneni|Rizeni bez opravneni":1399,"2023|Nebezpecna|Telefon za jizdy":465,"2023|Cervena|Projeti cervene":13429,"2023|Alkohol|Nezpusobilost ridice":70,"2023|Rychlost|40/50+ km/h":512,"2023|Nebezpecna|Zakazane predjezdeni":59,"2023|Nebezpecna|Ohrozeni chodce":66,"2023|Rychlost|20-40 km/h":71625,"2023|Rychlost|Do 20 km/h":325773,"2023|Nebezpecna|Nehoda se zranenim":24,"2023|Provozovatel|Objektivni odpovednost (125f)":625,"2023|Jine|Prestupek autoskoly":40,"2023|Jine|Jine prestupky":9,"2023|Jine|Omezeni tezkych vozidel":1,"2023|Nebezpecna|Protismer na dalnici":4,"2023|Nebezpecna|Vjezd na prejezd":11},"yt":{"2015":657399,"2016":641378,"2017":470651,"2018":619432,"2019":743853,"2020":556165,"2021":617982,"2022":839345,"2023":942768},"ym":{"2015|01":35005,"2015|02":46346,"2015|03":68440,"2015|04":63386,"2015|05":73029,"2015|06":57189,"2015|07":58435,"2015|08":52368,"2015|09":66614,"2015|10":57074,"2015|11":45955,"2015|12":33558,"2016|01":40796,"2016|02":57893,"2016|09":62144,"2016|10":45022,"2016|06":54587,"2016|07":48188,"2016|04":61816,"2016|12":31521,"2016|11":36856,"2016|08":79376,"2016|03":64735,"2016|05":58444,"2017|05":44755,"2017|01":28615,"2017|04":43965,"2017|09":44723,"2017|02":34423,"2017|03":50817,"2017|06":38083,"2017|11":39280,"2017|10":48977,"2017|08":38156,"2017|07":29947,"2017|12":28910,"2018|05":48038,"2018|02":37584,"2018|10":73059,"2018|03":42925,"2018|01":41676,"2018|04":49407,"2018|06":45181,"2018|09":66413,"2018|08":56043,"2018|07":42915,"2018|12":52492,"2018|11":63699,"2019|03":66242,"2019|12":45688,"2019|04":73886,"2019|09":58799,"2019|11":54389,"2019|05":77142,"2019|02":54796,"2019|07":65703,"2019|06":67349,"2019|10":63323,"2019|08":57660,"2019|01":58876,"2020|01":55731,"2020|10":52076,"2020|04":31391,"2020|08":40539,"2020|05":52941,"2020|11":37998,"2020|06":57421,"2020|07":47629,"2020|12":34562,"2020|02":56314,"2020|09":54288,"2020|03":35275,"2021|12":40344,"2021|11":67974,"2021|01":37769,"2021|02":35494,"2021|08":49954,"2021|09":61749,"2021|04":56236,"2021|06":54527,"2021|07":50952,"2021|05":55057,"2021|03":41398,"2021|10":66528,"2022|11":85804,"2022|03":65713,"2022|12":55845,"2022|07":64426,"2022|09":73162,"2022|08":64893,"2022|10":82468,"2022|04":80187,"2022|06":64735,"2022|05":83673,"2022|01":56853,"2022|02":61586,"2023|02":70956,"2023|01":75711,"2023|03":87470,"2023|04":95375,"2023|05":94512,"2023|07":71984,"2023|06":80006,"2023|08":66075,"2023|09":83232,"2023|10":90209,"2023|11":78062,"2023|12":49176},"yo":{"2015|P\u010cR":74958,"2015|MPP":582441,"2016|P\u010cR":96017,"2016|MPP":545361,"2017|P\u010cR":48705,"2017|MPP":421946,"2018|P\u010cR":64697,"2018|MPP":554735,"2019|P\u010cR":88218,"2019|MPP":655635,"2020|P\u010cR":52192,"2020|MPP":503973,"2021|P\u010cR":39895,"2021|MPP":578087,"2022|P\u010cR":59431,"2022|MPP":779914,"2023|MPP":864148,"2023|P\u010cR":78620},"ds":["P4","P6","P5","P1","P9","P10","P2","P12","P16","P7","P8","P3","P13","P11","P14","P15","P20","P18","P17","P22","P21","P19"],"dt":{"P4":1218200,"P6":1043012,"P5":560310,"P1":477713,"P9":422258,"P10":384939,"P2":334766,"P12":322460,"P16":243314,"P7":240999,"P8":223211,"P3":178477,"P13":144778,"P11":113582,"P14":105657,"P15":45069,"P20":24284,"P18":3883,"P17":756,"P22":712,"P21":427,"P19":166},"yd":{"2015|P16":35670,"2015|P12":36008,"2015|P1":40093,"2015|P9":31999,"2015|P5":66238,"2015|P2":47003,"2015|P4":212389,"2015|P3":19838,"2015|P6":87696,"2015|P8":19134,"2015|P10":18086,"2015|P7":22322,"2015|P13":8468,"2015|P14":3265,"2015|P15":1799,"2015|P20":4,"2015|P11":7366,"2015|P18":10,"2015|P21":1,"2015|P17":5,"2015|P19":5,"2016|P16":60744,"2016|P12":25922,"2016|P20":26,"2016|P9":47584,"2016|P4":146914,"2016|P8":21120,"2016|P6":101345,"2016|P10":21161,"2016|P1":34470,"2016|P3":19647,"2016|P5":52543,"2016|P2":54248,"2016|P7":32158,"2016|P11":7768,"2016|P13":8325,"2016|P14":4722,"2016|P15":2617,"2016|P17":19,"2016|P22":15,"2016|P18":20,"2016|P19":3,"2016|P21":7,"2017|P2":33617,"2017|P5":39974,"2017|P8":14410,"2017|P4":75010,"2017|P9":40752,"2017|P3":10639,"2017|P10":27690,"2017|P12":19930,"2017|P1":20531,"2017|P6":114032,"2017|P7":20319,"2017|P21":19,"2017|P22":42,"2017|P11":10722,"2017|P15":3139,"2017|P18":39,"2017|P14":6187,"2017|P19":8,"2017|P16":20171,"2017|P17":31,"2017|P13":13324,"2017|P20":65,"2018|P1":34233,"2018|P9":45447,"2018|P4":123046,"2018|P5":60265,"2018|P10":41107,"2018|P8":23051,"2018|P3":15050,"2018|P2":37184,"2018|P6":115158,"2018|P7":22921,"2018|P13":15887,"2018|P15":5063,"2018|P18":143,"2018|P11":12985,"2018|P14":11946,"2018|P17":45,"2018|P12":31463,"2018|P16":24306,"2018|P22":45,"2018|P21":28,"2018|P20":43,"2018|P19":16,"2019|P5":69078,"2019|P1":46871,"2019|P8":30661,"2019|P2":35925,"2019|P4":139781,"2019|P10":51000,"2019|P6":118362,"2019|P3":22217,"2019|P9":54935,"2019|P7":24284,"2019|P15":7497,"2019|P12":37917,"2019|P17":59,"2019|P16":25239,"2019|P14":20859,"2019|P11":13498,"2019|P18":117,"2019|P13":21701,"2019|P21":27,"2019|P20":23770,"2019|P22":40,"2019|P19":15,"2020|P1":43788,"2020|P7":21131,"2020|P2":28034,"2020|P4":112911,"2020|P3":19108,"2020|P9":36784,"2020|P5":38968,"2020|P14":17025,"2020|P8":20549,"2020|P10":49849,"2020|P6":75875,"2020|P22":82,"2020|P21":28,"2020|P16":20528,"2020|P18":450,"2020|P13":18538,"2020|P11":13286,"2020|P12":32044,"2020|P15":7047,"2020|P20":82,"2020|P19":20,"2020|P17":38,"2021|P10":36321,"2021|P1":68348,"2021|P14":19667,"2021|P9":38393,"2021|P5":40490,"2021|P8":19863,"2021|P4":88443,"2021|P6":110371,"2021|P2":29432,"2021|P7":27672,"2021|P20":133,"2021|P3":25332,"2021|P21":91,"2021|P16":6612,"2021|P11":25062,"2021|P15":8142,"2021|P12":43814,"2021|P18":1361,"2021|P22":143,"2021|P17":133,"2021|P13":28139,"2021|P19":20,"2022|P1":100618,"2022|P4":112306,"2022|P5":76144,"2022|P7":35164,"2022|P6":152927,"2022|P3":23951,"2022|P9":47764,"2022|P11":20644,"2022|P10":61289,"2022|P13":29670,"2022|P18":1121,"2022|P2":33412,"2022|P14":20387,"2022|P8":40183,"2022|P22":215,"2022|P15":8560,"2022|P17":199,"2022|P12":52714,"2022|P19":51,"2022|P20":81,"2022|P21":147,"2022|P16":21798,"2023|P1":88761,"2023|P2":35911,"2023|P3":22695,"2023|P4":207400,"2023|P5":116610,"2023|P6":167246,"2023|P7":35028,"2023|P8":34240,"2023|P9":78600,"2023|P10":78436,"2023|P11":2251,"2023|P12":42648,"2023|P13":726,"2023|P14":1599,"2023|P15":1205,"2023|P16":28246,"2023|P17":227,"2023|P18":622,"2023|P19":28,"2023|P20":80,"2023|P21":79,"2023|P22":130},"gt":6088973,"go":["Parkovani","Rychlost","Cervena","Alkohol","Nebezpecna","BezOpravneni","Provozovatel","Jine"]};
const SUBJ = {"2015|firma":268004,"2015|osoba":306892,"2015|neprirazeno":82503,"2016|firma":267297,"2016|osoba":292862,"2016|neprirazeno":81220,"2017|firma":192323,"2017|neprirazeno":64654,"2017|osoba":213674,"2018|firma":245951,"2018|neprirazeno":105344,"2018|osoba":268137,"2019|firma":305383,"2019|osoba":360927,"2019|neprirazeno":77562,"2020|firma":228650,"2020|neprirazeno":52794,"2020|osoba":275271,"2021|firma":202911,"2021|osoba":355329,"2021|neprirazeno":61223,"2022|firma":351860,"2022|osoba":378502,"2022|neprirazeno":110712,"2023|firma":400295,"2023|osoba":391581,"2023|neprirazeno":152950};


const g = (o, k) => (o && o[k]) || 0;
const fmt = n => n != null ? n.toLocaleString("cs-CZ") : "0";
const ML = ["Led","\u00dano","B\u0159e","Dub","Kv\u011b","\u010cvn","\u010cvc","Srp","Z\u00e1\u0159","\u0158\u00edj","Lis","Pro"];

const COLS = 50;
const ROWS = 10;
const N = COLS * ROWS;

const DESCRIPTIONS = {
  "Parkovani": {
    text: "Sb\u011brn\u00e1 kategorie \u00a7125c/1k: \u201eNespln\u011bn\u00ed nebo poru\u0161en\u00ed jin\u00e9 povinnosti stanoven\u00e9 v hlav\u011b II\u201c z\u00e1kona 361/2000 Sb. Hlava II pokr\u00fdv\u00e1 \u00a74\u2013\u00a760 (prakticky v\u0161echna pravidla provozu), a proto nen\u00ed mo\u017en\u00e9 tuto kategorii d\u00e1le subkategorizovat \u2013 data z MHMP obsahuj\u00ed pouze pr\u00e1vn\u00ed kvalifikaci, nikoliv popis skutku.",
    bullets: [
      "Parkov\u00e1n\u00ed a st\u00e1n\u00ed (\u00a727\u2013\u00a728) \u2013 nedovolen\u00e9 st\u00e1n\u00ed, parkov\u00e1n\u00ed v z\u00e1kazu, blokov\u00e1n\u00ed chodn\u00edku aj.",
      "Bezpe\u010dnostn\u00ed p\u00e1sy a d\u011btsk\u00e9 seda\u010dky (\u00a76a) \u2013 nep\u0159ipoutan\u00fd \u0159idi\u010d nebo spolujezdec",
      "Odbo\u010dov\u00e1n\u00ed a pr\u016fjezd k\u0159i\u017eovatkou (\u00a720\u2013\u00a723) \u2013 nespr\u00e1vn\u00e9 odbo\u010den\u00ed, chyb\u011bj\u00edc\u00ed blinkr",
      "J\u00edzda v pruz\u00edch (\u00a712\u2013\u00a714) \u2013 nespr\u00e1vn\u00e9 \u0159azen\u00ed, p\u0159ej\u00ed\u017ed\u011bn\u00ed pruh\u016f",
      "Ot\u00e1\u010den\u00ed a couv\u00e1n\u00ed (\u00a725\u2013\u00a726)",
      "Dopravn\u00ed zna\u010den\u00ed (\u00a745\u2013\u00a755) \u2013 poru\u0161en\u00ed z\u00e1kazov\u00fdch/p\u0159\u00edkazov\u00fdch zna\u010dek",
      "Osv\u011btlen\u00ed vozidla (\u00a732) \u2013 j\u00edzda bez sv\u011btel, nespr\u00e1vn\u00e9 pou\u017eit\u00ed d\u00e1lkov\u00fdch",
      "Dopravn\u00ed nehody (\u00a747) \u2013 nespr\u00e1vn\u00e9 ozna\u010den\u00ed nehody, neohl\u00e1\u0161en\u00ed",
      "A dal\u0161\u00ed povinnosti z \u00a74\u2013\u00a760 (nap\u0159. j\u00edzda v tunelu, na d\u00e1lnici, pravidla pro chodc\u016f a cyklisty)"
    ],
    note: "Na z\u00e1klad\u011b anal\u00fdzy vypl\u0148ovan\u00fdch lokalit v datasetech lze odhadnout, \u017ee ~85 % t\u011bchto z\u00e1znam\u016f se t\u00fdk\u00e1 parkov\u00e1n\u00ed, ale nelze to ur\u010dit p\u0159esn\u011b. V\u00fdjimkou je zneu\u017eit\u00ed ZTP st\u00e1n\u00ed, kter\u00e9 je vedeno pod vlastn\u00edm paragrafem (\u00a7125c/1f/11), a proto je v na\u0161\u00ed vizualizaci vy\u010dlen\u011bno jako samostatn\u00e1 podkategorie.",
  },
  "Rychlost": {
    text: "P\u0159ekro\u010den\u00ed nejvy\u0161\u0161\u00ed dovolen\u00e9 rychlosti dle \u00a7125c/1f body 2\u20134.",
    bullets: [
      "Do 20 km/h (bod 4) \u2013 m\u00edrn\u00e9 p\u0159ekro\u010den\u00ed, pokuta na m\u00edst\u011b, 2 body",
      "20\u201340 km/h (bod 3) \u2013 v\u00fdrazn\u00e9 p\u0159ekro\u010den\u00ed, vy\u0161\u0161\u00ed pokuta + 3\u20134 body",
      "40/50+ km/h (bod 2) \u2013 hrub\u00e9 p\u0159ekro\u010den\u00ed, hrozba z\u00e1kazu \u0159\u00edzen\u00ed + 5\u20136 bod\u016f"
    ],
  },
  "Cervena": {
    text: "Projet\u00ed na \u010dervenou nebo neuposlechnut\u00ed pokynu policisty \u010di semaforu dle \u00a7125c/1f/5. Pat\u0159\u00ed sem i nezastaven\u00ed na pokyn \u201eSt\u016fj\u201c.",
  },
  "Nebezpecna": {
    text: "Konkr\u00e9tn\u00ed nebezpe\u010dn\u00e9 chov\u00e1n\u00ed za volantem definovan\u00e9 v \u00a7125c/1f:",
    bullets: [
      "Telefon za j\u00edzdy (bod 1) \u2013 dr\u017een\u00ed telefonu p\u0159i \u0159\u00edzen\u00ed",
      "Ned\u00e1n\u00ed p\u0159ednosti v j\u00edzd\u011b (bod 8)",
      "Ohro\u017een\u00ed chodce na p\u0159echodu (bod 6)",
      "Zak\u00e1zan\u00e9 p\u0159edj\u00ed\u017ed\u011bn\u00ed (bod 7)",
      "Vjezd na \u017eelezni\u010dn\u00ed p\u0159ejezd (bod 9)",
      "Protism\u011br na d\u00e1lnici (bod 12)"
    ],
  },
  "Alkohol": {
    text: "P\u0159estupky spojen\u00e9 s alkoholem a n\u00e1vykov\u00fdmi l\u00e1tkami:",
    bullets: [
      "\u0158\u00edzen\u00ed pod vlivem (\u00a7125c/1b) \u2013 alkohol nebo drogy za volantem",
      "Odm\u00edtnut\u00ed testu (\u00a7125c/1d) \u2013 odm\u00edtnut\u00ed dechov\u00e9 zkou\u0161ky nebo testu na drogy",
      "Nezp\u016fsobilost \u0159idi\u010de (\u00a7125c/1c) \u2013 \u0159\u00edzen\u00ed ve stavu vylu\u010duj\u00edc\u00edm zp\u016fsobilost"
    ],
  },
  "BezOpravneni": {
    text: "\u0158\u00edzen\u00ed motorov\u00e9ho vozidla bez platn\u00e9ho \u0159idi\u010dsk\u00e9ho opr\u00e1vn\u011bn\u00ed dle \u00a7125c/1e \u2013 nap\u0159. po odebr\u00e1n\u00ed \u0159idi\u010d\u00e1ku, bez jeho z\u00edsk\u00e1n\u00ed nebo s propadl\u00fdm pr\u016fkazem.",
  },
  "Provozovatel": {
    text: "P\u0159estupek \u0159e\u0161en\u00fd s majitelem/provozovatelem vozidla, nikoli s \u0159idi\u010dem. Typicky se pou\u017e\u00edv\u00e1 u \u00fasek. m\u011b\u0159en\u00ed rychlosti, kde se nepoda\u0159ilo ur\u010dit \u0159idi\u010de.",
    bullets: [
      "\u00a7125f \u2013 objektivn\u00ed odpov\u011bdnost provozovatele (nov\u011bj\u0161\u00ed forma)",
      "\u00a7125d \u2013 star\u0161\u00ed forma odpov\u011bdnosti provozovatele"
    ],
  },
  "Jine": {
    text: "Ostatn\u00ed p\u0159estupky, kter\u00e9 nespadaj\u00ed do \u017e\u00e1dn\u00e9 z v\u00fd\u0161e uveden\u00fdch kategori\u00ed:",
    bullets: [
      "Z\u00e1vadn\u00e9 vozidlo (\u00a7125c/1a) \u2013 chyb\u011bj\u00edc\u00ed/fale\u0161n\u00e1 RZ, technick\u00e1 nezp\u016fsobilost",
      "P\u0159estupek u\u010ditele auto\u0161koly (\u00a7125c/3)",
      "Omezen\u00ed j\u00edzdy t\u011b\u017ek\u00fdch vozidel a dal\u0161\u00ed"
    ],
  },
};

function buildWaffle(year) {
  const gt = year ? (D.yt[String(year)] || 1) : D.gt;
  const ordered = D.go.map(gid => D.tree.find(t => t.id === gid)).filter(Boolean);
  const groups = ordered.map(gr => {
    const val = year ? gr.ch.reduce((s, c) => s + g(D.ys, year + "|" + c.id), 0) : gr.v;
    const children = gr.ch.map(c => ({
      id: c.id, name: c.n, value: year ? g(D.ys, year + "|" + c.id) : c.v,
    })).filter(c => c.value > 0);
    return { id: gr.id, name: gr.n, color: gr.c, value: val, children };
  }).filter(g => g.value > 0);

  let cells = groups.map(g => ({ ...g, cells: Math.max(1, Math.round(g.value / gt * N)) }));
  const diff = cells.reduce((s, c) => s + c.cells, 0) - N;
  if (diff !== 0) cells[0].cells -= diff;

  const grid = [];
  for (const gr of cells) {
    for (let i = 0; i < gr.cells; i++) {
      grid.push({ groupId: gr.id, color: gr.color });
    }
  }
  return { grid, groups: cells, gt };
}

function WaffleChart({ year }) {
  const { grid, groups, gt } = useMemo(() => buildWaffle(year), [year]);
  const [hoverGroup, setHoverGroup] = useState(null);
  const [openLegend, setOpenLegend] = useState(false);
  const hoveredData = hoverGroup != null ? groups.find(g => g.id === hoverGroup) : null;

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 12px", marginBottom: 10 }}>
        {groups.map(gr => (
          <div key={gr.id} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#8899aa",
            opacity: hoverGroup === null || hoverGroup === gr.id ? 1 : 0.3, transition: "opacity .15s",
            cursor: "pointer" }}
            onMouseEnter={() => setHoverGroup(gr.id)} onMouseLeave={() => setHoverGroup(null)}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: gr.color, flexShrink: 0 }} />
            <span>{gr.name}</span>
            <span style={{ color: "#556", fontSize: 10 }}>{(gr.value / gt * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(" + COLS + ", 1fr)", gap: 2, background: "#0d1b2a", borderRadius: 8, padding: 4 }}
        onMouseLeave={() => setHoverGroup(null)}>
        {grid.map((cell, i) => {
          const isHover = hoverGroup === cell.groupId;
          const isDim = hoverGroup !== null && hoverGroup !== cell.groupId;
          return (
            <div key={i} style={{
              aspectRatio: "1", borderRadius: 3,
              background: cell.color, opacity: isDim ? 0.12 : isHover ? 1 : 0.75,
              transition: "opacity .15s", cursor: "pointer",
            }} onMouseEnter={() => setHoverGroup(cell.groupId)} />
          );
        })}
      </div>

      {hoveredData && (
        <div style={{
          marginTop: 8, background: "rgba(10,22,40,.95)", borderRadius: 10, padding: "10px 14px",
          border: "2px solid " + hoveredData.color,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: hoveredData.children.length > 1 ? 6 : 0 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#e8e8f0" }}>{hoveredData.name}</span>
            <span style={{ fontSize: 12, color: "#8899aa" }}>
              {fmt(hoveredData.value)} ({(hoveredData.value / gt * 100).toFixed(2)}%)
            </span>
          </div>
          {hoveredData.children.length > 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {hoveredData.children.sort((a, b) => b.value - a.value).map((ch, ci, arr) => {
                const chPct = ch.value / gt;
                const maxVal = arr[0].value;
                const barPct = maxVal > 0 ? (ch.value / maxVal) * 100 : 0;
                return (
                  <div key={ch.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
                    <div style={{ flex: 1, minWidth: 0, background: "rgba(255,255,255,.06)", borderRadius: 3, height: 16, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", inset: 0, width: Math.max(2, barPct) + "%", background: hoveredData.color, opacity: 0.4, borderRadius: 3 }} />
                      <span style={{ position: "relative", padding: "0 6px", lineHeight: "16px", color: "#ccd", fontSize: 10, whiteSpace: "nowrap" }}>
                        {ch.name}
                      </span>
                    </div>
                    <span style={{ color: "#8899aa", fontSize: 10, whiteSpace: "nowrap", width: 120, textAlign: "right", flexShrink: 0 }}>
                      {fmt(ch.value)} ({(chPct * 100).toFixed(2)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setOpenLegend(prev => !prev)} style={{
          background: "none", border: "1px solid #1e3a5f", borderRadius: 6, color: "#8899aa",
          padding: "5px 12px", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ transform: openLegend ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .15s", display: "inline-block" }}>{"\u25B6"}</span>
          {"Co znamenaj\u00ed jednotliv\u00e9 kategorie?"}
        </button>
        {openLegend && (
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            {D.tree.map(gr => {
              const desc = DESCRIPTIONS[gr.id];
              if (!desc) return null;
              return (
                <div key={gr.id} style={{ fontSize: 11, lineHeight: 1.6, padding: "10px 12px", background: "rgba(255,255,255,.02)", borderRadius: 6, borderLeft: "3px solid " + gr.c }}>
                  <div style={{ fontWeight: 700, color: "#e8e8f0", marginBottom: 4, fontSize: 12 }}>{gr.n}</div>
                  <div style={{ color: "#7888a0", marginBottom: desc.bullets ? 6 : 0 }}>{desc.text}</div>
                  {desc.bullets && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 2, marginLeft: 8 }}>
                      {desc.bullets.map((b, i) => (
                        <div key={i} style={{ color: "#6b7b8d", display: "flex", gap: 6 }}>
                          <span style={{ color: gr.c, flexShrink: 0 }}>{"\u2022"}</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {desc.note && (
                    <div style={{ color: "#8899aa", marginTop: 6, fontStyle: "italic", fontSize: 10, lineHeight: 1.5 }}>{desc.note}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function TimeHist({ year }) {
  const data = useMemo(() => {
    if (year) return ML.map((m, i) => ({ label: m, count: g(D.ym, year + "|" + String(i + 1).padStart(2, "0")) }));
    return D.years.map(y => ({ label: String(y), count: D.yt[String(y)] || 0 }));
  }, [year]);
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#8899aa" }} axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip formatter={v => [fmt(v), "p\u0159estupk\u016f"]}
          contentStyle={{ background: "#0d1b2a", border: "1px solid #1e3a5f", borderRadius: 8, fontSize: 12, color: "#e8e8f0" }} />
        <Bar dataKey="count" fill="#E69F00" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function AuthDonut({ year }) {
  const data = useMemo(() => {
    if (year) return [
      { name: "M\u011bstsk\u00e1 policie Praha", s: "MPP", value: g(D.yo, year + "|MPP") },
      { name: "Policie \u010cR", s: "P\u010cR", value: g(D.yo, year + "|P\u010cR") },
    ];
    const m = D.years.reduce((s, y) => s + g(D.yo, y + "|MPP"), 0);
    const p = D.years.reduce((s, y) => s + g(D.yo, y + "|P\u010cR"), 0);
    return [{ name: "M\u011bstsk\u00e1 policie Praha", s: "MPP", value: m }, { name: "Policie \u010cR", s: "P\u010cR", value: p }];
  }, [year]);
  const t = data[0].value + data[1].value;
  const C = ["#E69F00", "#56B4E9"];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <ResponsiveContainer width={140} height={140}>
        <PieChart><Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={36} strokeWidth={0}>
          {data.map((_, i) => <Cell key={i} fill={C[i]} />)}
        </Pie></PieChart>
      </ResponsiveContainer>
      <div style={{ fontSize: 12, width: "100%" }}>
        {data.map((d, i) => (
          <div key={d.s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: C[i], flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: "#e8e8f0" }}>{d.name}</div>
              <div style={{ fontSize: 11, color: "#6b7b8d" }}>{fmt(d.value)} {" p\u0159estupk\u016f"}</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: C[i] }}>{t > 0 ? Math.round(d.value / t * 100) : 0}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubjectDonut({ year }) {
  const data = useMemo(() => {
    if (year) return [
      { name: "Fyzick\u00e1 osoba", s: "osoba", value: g(SUBJ, year + "|osoba") },
      { name: "Firma / provozovatel", s: "firma", value: g(SUBJ, year + "|firma") },
      { name: "Nep\u0159i\u0159azeno", s: "neprirazeno", value: g(SUBJ, year + "|neprirazeno") },
    ];
    const o = D.years.reduce((s, y) => s + g(SUBJ, y + "|osoba"), 0);
    const f = D.years.reduce((s, y) => s + g(SUBJ, y + "|firma"), 0);
    const n = D.years.reduce((s, y) => s + g(SUBJ, y + "|neprirazeno"), 0);
    return [
      { name: "Fyzick\u00e1 osoba", s: "osoba", value: o },
      { name: "Firma / provozovatel", s: "firma", value: f },
      { name: "Nep\u0159i\u0159azeno", s: "neprirazeno", value: n },
    ];
  }, [year]);
  const t = data.reduce((s, d) => s + d.value, 0);
  const C = ["#D55E00", "#009E73", "#999999"];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <ResponsiveContainer width={140} height={140}>
        <PieChart><Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={36} strokeWidth={0}>
          {data.map((_, i) => <Cell key={i} fill={C[i]} />)}
        </Pie></PieChart>
      </ResponsiveContainer>
      <div style={{ fontSize: 12, width: "100%" }}>
        {data.map((d, i) => (
          <div key={d.s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: C[i], flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: "#e8e8f0" }}>{d.name}</div>
              <div style={{ fontSize: 11, color: "#6b7b8d" }}>{fmt(d.value)} {" p\u0159estupk\u016f"}</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: C[i] }}>{t > 0 ? Math.round(d.value / t * 100) : 0}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DistChart({ year }) {
  const data = useMemo(() =>
    D.ds.map(d => ({
      name: d, count: year ? g(D.yd, year + "|" + d) : (D.dt[d] || 0),
    })).sort((a, b) => b.count - a.count)
  , [year]);
  return (
    <ResponsiveContainer width="100%" height={Math.max(420, data.length * 20)}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 55, bottom: 4, left: 4 }}>
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" width={30}
          tick={{ fontSize: 11, fill: "#8899aa" }} axisLine={false} tickLine={false} interval={0} />
        <Tooltip formatter={v => [fmt(v), "p\u0159estupk\u016f"]} labelFormatter={l => "Praha " + l.replace("P", "")}
          contentStyle={{ background: "#0d1b2a", border: "1px solid #1e3a5f", borderRadius: 8, fontSize: 12, color: "#e8e8f0" }} />
        <Bar dataKey="count" fill="#E69F00" radius={[0, 3, 3, 0]}
          label={{ position: "right", fontSize: 10, fill: "#6b7b8d", formatter: v => v > 0 ? fmt(v) : "" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const Sec = ({ title, note, children }) => (
  <div style={{ background: "#0d1b2a", borderRadius: 12, padding: "16px 16px 12px", border: "1px solid #1e3a5f" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
      <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#e8e8f0" }}>{title}</h3>
      {note && <span style={{ fontSize: 11, color: "#5a6a7a" }}>{note}</span>}
    </div>
    {children}
  </div>
);

export default function Dashboard() {
  const [year, setYear] = useState(null);
  const total = year ? (D.yt[String(year)] || 0) : D.gt;
  const label = year ? String(year) : "2015\u20132023";

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", color: "#e8e8f0", background: "#0a1628", minHeight: "100vh", padding: "24px 20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-.02em" }}>{"Dopravn\u00ed p\u0159estupky v Praze"}</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#5a6a7a" }}>
          {"Data MHMP \u00b7 " + label + " \u00b7 "}<strong style={{ color: "#E69F00" }}>{fmt(total)}</strong>{" p\u0159estupk\u016f celkem"}
        </p>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        <button onClick={() => setYear(null)} style={{
          padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
          background: !year ? "#E69F00" : "#0d1b2a", color: !year ? "#fff" : "#8899aa",
        }}>Celkem</button>
        {D.years.map(y => (
          <button key={y} onClick={() => setYear(y)} style={{
            padding: "7px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: y === year ? "#E69F00" : "#0d1b2a", color: y === year ? "#fff" : "#8899aa",
          }}>{y}</button>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <Sec title={"Typy p\u0159estupk\u016f"} note={"1 bu\u0148ka \u2248 0,2 % \u00b7 mo\u017en\u00fd rozsah 0,04\u20130,30 % kv\u016fli zaokrouhlen\u00ed \u00b7 " + label}>
          <WaffleChart year={year} />
        </Sec>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Sec title={year ? "M\u011bs\u00ed\u010dn\u00ed rozlo\u017een\u00ed " + year : "Po\u010det p\u0159estupk\u016f podle roku"} note={year ? "leden\u2013prosinec" : "2015\u20132023"}>
          <TimeHist year={year} />
        </Sec>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Sec title="Oznamovatel" note={label}>
            <AuthDonut year={year} />
          </Sec>
          <Sec title={"Subjekt p\u0159estupku"} note={label}>
            <SubjectDonut year={year} />
          </Sec>
        </div>
        <Sec title={"Spr\u00e1vn\u00ed obvody"} note={"Praha 1\u201322 \u00b7 " + label}>
          <DistChart year={year} />
        </Sec>
      </div>

      <div style={{ textAlign: "center", fontSize: 10, color: "#3d4d5d", marginTop: 20, paddingBottom: 12 }}>
        {"Zdroj: MHMP \u00b7 z\u00e1k. \u010d. 361/2000 Sb."}
      </div>
    </div>
  );
}
