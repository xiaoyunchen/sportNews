/**
 * @file index.js
 * @author swan
 */
const app = getApp()

Page({
    data: { // 页面的初始数据
        newsList: [],
        docidList: [
            "icezzrr1449158",
            "icezuev1972539",
            "icezuev4155240",
            "icezzrr3666741",
            "icezzrq9671826",
        ],
        newsListObj: {
            "icezuev4155240": {
                "_id": "c4d610055a553815a9da16b07bf0e98b",
                "appEtime": 1571949351,
                "appProduct": 140754669929990,
                "appType": 576,
                "author": "新浪体育",
                "authorId": "",
                "bpic": 0,
                "category": {
                    "体育_足球_国际足球_英超": 1
                },
                "channelid": 57308,
                "channelids": [
                    57308,
                    257,
                    56510,
                    57307,
                    72485,
                    60107,
                    72427,
                    68388,
                    63576,
                    72320,
                    258,
                    40750,
                    72318,
                    72298,
                    72264,
                    68389,
                    60100,
                    63577,
                    72486,
                    72428
                ],
                "classes": {
                    "体育": 1
                },
                "commentid": "ty:slidenews-album-730-232043:0",
                "ctime": 1571776551,
                "cx_pkey": "default",
                "dataid": "comos:icezuev4155240",
                "docid": "icezuev4155240",
                "doct": 0,
                "editLevel": 3,
                "etype": 11,
                "eventHotValue": 0,
                "eventID": "",
                "eventLevel": 99,
                "eventName": "",
                "f_docid": "slide:2-730-232043",
                "fp": "c4d610055a553815a9da16b07bf0e98b",
                "fpTime": 1571776551,
                "fp_iid": "FbgnK",
                "hotPoint": {
                    "subject": 1
                },
                "iid": "FbgnK",
                "img_count": 16,
                "img_fp": "c4d610055a553815a9da16b07bf0e98b",
                "img_fp_iid": "FbgnK",
                "index": "subType=9",
                "info": "c4d610055a553815a9da16b07bf0e98b|9|3|0|100|none|1571972744|0|9|0|0|FbgnK|0|0|||a|0|0|comos:icezuev4155240||",
                "intro": "北京时间10月23日03:00(英国当地时间22日20:00)，2019/20赛季欧冠第3比赛日C组一场焦点战在伊蒂哈德球场展开争夺，曼城主场5比1大胜亚特兰大，...",
                "is_3pics": 0,
                "is_update": 0,
                "keywords": [
                    "亚特兰大",
                    "曼城",
                    "欧冠",
                    "阿圭罗"
                ],
                "labels": {
                    "亚特兰大": 0.722,
                    "曼城": 0.278
                },
                "labels_show": [
                    "欧洲足球",
                    "亚特兰大",
                    "曼城"
                ],
                "level": 1,
                "media": "新浪体育",
                "media_copyright": 1,
                "media_id": "1638781994",
                "media_level": 1,
                "media_show": "新浪体育:1638781994",
                "media_type": 2,
                "mtime": 1571778822,
                "muid": "1624368",
                "muid_list": [
                    {
                        "muid": "1969983",
                        "muid_type": 2,
                        "weight": 1,
                        "word": "阿圭罗"
                    }
                ],
                "new_commentid": "ty:slidenews-album-730-232043:0",
                "new_labels_show": [
                    {
                        "id": "l:Nyl",
                        "text": "亚特兰大"
                    },
                    {
                        "id": "l:9of",
                        "text": "曼城"
                    }
                ],
                "new_subclass_show": [
                    {
                        "id": "sc:2S",
                        "text": "国际足球"
                    }
                ],
                "new_topic_show": [
                    {
                        "id": "t:eEv",
                        "text": "欧洲足球"
                    }
                ],
                "no_bcard": 0,
                "org_imgCount": 16,
                "pcProduct": 4398650490880,
                "pid": 6,
                "pos": -1,
                "qscore": 10,
                "reason": 9,
                "rep_rate": 0,
                "short_intro": "曼城主场5比1大胜亚特兰大，阿圭罗梅开二度反超比分，斯特林上演帽子戏法，福登被罚下。曼城3战全胜领跑，亚特兰大3战全负垫底。",
                "stitle": "[欧冠]曼城5-1亚特兰大",
                "stocks": [],
                "sub_classes": {
                    "国际足球": 0.91966817216397
                },
                "surl": "http://photo.sina.cn/album_2_730_232043.htm?cre=sptapp&mod=r&loc=3&r=9&rfunc=100&tj=none",
                "surl_https": "https://photo.sina.cn/album_2_730_232043.htm?cre=sptapp&mod=r&loc=3&r=9&rfunc=100&tj=none",
                "tags": [
                    "曼城",
                    "亚特兰大",
                    "欧冠"
                ],
                "templateid": 0,
                "thumb": "http://n.sinaimg.cn/sports/2_img/upload/aecad723/122/w1024h698/20191023/04e3-ihfpfwa7716429.jpg",
                "thumb2": "",
                "thumbs": [
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/106/w1024h682/20191023/20ee-ihfpfwa7697628.jpg",
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/106/w1024h682/20191023/3f1e-ihfpfwa7697641.jpg",
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/107/w1024h683/20191023/a66a-ihfpfwa7697739.jpg",
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/793/w1024h569/20191023/7838-ihfpfwa7697676.jpg",
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/220/w1024h796/20191023/a153-ihfpfwa7697688.jpg",
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/106/w1024h682/20191023/4e88-ihfpfwa7697708.jpg"
                ],
                "time_length": 0,
                "title": "[欧冠]曼城5-1亚特兰大",
                "title_fp": "FbgnK",
                "type": 2,
                "url": "http://slide.sports.sina.com.cn/g_pl/slide_2_730_232043.html?cre=sptapp&mod=r&loc=3&r=9&rfunc=100&tj=none",
                "url_https": "http://slide.sports.sina.com.cn/g_pl/slide_2_730_232043.html?cre=sptapp&mod=r&loc=3&r=9&rfunc=100&tj=none",
                "uuid": "c4d610055a553815a9da16b07bf0e98b",
                "vid": 0,
                "video_id": 0,
                "video_size": 0,
                "zt": "1213championsleagu",
                "ztlevel": 3
            },
            "icezzrq9671826": {
                "_id": "3445c87a95863101a0b89af322776c4a",
                "agreeDataFormat": 1,
                "appEtime": 1570136414,
                "appProduct": 140754669929990,
                "appType": 576,
                "author": "新浪体育",
                "authorId": "",
                "bpic": 0,
                "category": {
                    "体育_足球_国际足球_英超": 1
                },
                "channelid": 57308,
                "channelids": [
                    57308,
                    257,
                    56510,
                    57307,
                    72485,
                    60107,
                    72427,
                    68388,
                    63576,
                    72320,
                    258,
                    40750,
                    72318,
                    72298,
                    72264,
                    68389,
                    60100,
                    63577,
                    72486,
                    72428
                ],
                "classes": {
                    "体育": 0.53115189884208
                },
                "comment_count": 1,
                "comment_count_show": 1,
                "commentid": "ty:slidenews-album-730-229995:0",
                "ctime": 1569963614,
                "cx_pkey": "default",
                "dataid": "comos:icezzrq9671826",
                "docid": "icezzrq9671826",
                "doct": 0,
                "editLevel": 3,
                "etype": 11,
                "eventHotValue": 0,
                "eventID": "",
                "eventLevel": 99,
                "eventName": "",
                "f_docid": "slide:2-730-229995",
                "fp": "3445c87a95863101a0b89af322776c4a",
                "fpTime": 1569963614,
                "fp_iid": "FKN4U",
                "hotPoint": {
                    "subject": 1
                },
                "iid": "FKN4U",
                "img_count": 10,
                "index": "subType=9",
                "info": "3445c87a95863101a0b89af322776c4a|9|5|0|100|none|1571972744|0|9|0|0|FKN4U|0|0|||a|0|0|comos:icezzrq9671826||",
                "intro": "北京时间10月2日03:00(英国当地时间1日20:00)，2019/20赛季欧冠第2比赛日C组一场焦点战在伊蒂哈德球场展开争夺，曼城主场2比0力克萨格勒布迪纳摩，京多安打中横梁，斯特林传射，福登进球...",
                "is_3pics": 0,
                "is_update": 0,
                "keywords": [
                    "迪那摩",
                    "萨格勒布",
                    "京多安",
                    "曼城"
                ],
                "labels": {
                    "曼城": 0.43,
                    "萨格勒布": 0.57
                },
                "labels_show": [
                    "德甲",
                    "萨格勒布",
                    "曼城"
                ],
                "level": 1,
                "media": "新浪体育",
                "media_copyright": 1,
                "media_id": "1638781994",
                "media_level": 1,
                "media_show": "新浪体育:1638781994",
                "media_type": 2,
                "mtime": 1569964158,
                "muid": "1624368",
                "muid_list": [
                    {
                        "muid": "1969974",
                        "muid_type": 2,
                        "weight": 1,
                        "word": "京多安"
                    }
                ],
                "new_commentid": "ty:slidenews-album-730-229995:0",
                "new_labels_show": [
                    {
                        "id": "l:Qw2",
                        "text": "萨格勒布"
                    },
                    {
                        "id": "l:9of",
                        "text": "曼城"
                    }
                ],
                "new_subclass_show": [
                    {
                        "id": "sc:1gVq",
                        "text": "英格兰足球"
                    }
                ],
                "new_topic_show": [
                    {
                        "id": "t:3R1",
                        "text": "德甲"
                    }
                ],
                "no_bcard": 0,
                "org_imgCount": 10,
                "pcProduct": 4398650490880,
                "pid": 6,
                "pos": -1,
                "qscore": 10,
                "reason": 9,
                "short_intro": "2019/20赛季欧冠第2比赛日C组一场焦点战在伊蒂哈德球场展开争夺，曼城主场2比0力克萨格勒布迪纳摩，京多安打中横梁，斯特林传射，福登进球。曼城连胜后领跑。",
                "stitle": "[欧冠]曼城2-0萨格勒布迪那摩",
                "stocks": [],
                "sub_classes": {
                    "英格兰足球": 0.73105857863
                },
                "surl": "http://photo.sina.cn/album_2_730_229995.htm?cre=sptapp&mod=r&loc=5&r=9&rfunc=100&tj=none",
                "surl_https": "https://photo.sina.cn/album_2_730_229995.htm?cre=sptapp&mod=r&loc=5&r=9&rfunc=100&tj=none",
                "tags": [
                    "曼城",
                    "萨格勒布迪那摩",
                    "欧冠"
                ],
                "templateid": 0,
                "thumb": "http://n.sinaimg.cn/sports/2_img/upload/aecad723/50/w1024h626/20191002/3ed5-ifmectk3852995.jpg",
                "thumb2": "",
                "thumbs": [
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/107/w1024h683/20191002/5466-ifmectk3852789.jpg",
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/107/w1024h683/20191002/34db-ifmectk3852815.jpg",
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/120/w1024h696/20191002/f157-ifmectk3852790.jpg",
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/106/w1024h682/20191002/c2e3-ifmectk3852794.jpg",
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/84/w1024h660/20191002/8bfc-ifmectk3852914.jpg",
                    "http://n.sinaimg.cn/sports/2_img/upload/aecad723/111/w1024h687/20191002/a020-ifmectk3852922.jpg"
                ],
                "time_length": 0,
                "title": "[欧冠]曼城2-0萨格勒布迪那摩",
                "title_fp": "FKN4U",
                "type": 2,
                "url": "http://slide.sports.sina.com.cn/g_pl/slide_2_730_229995.html?cre=sptapp&mod=r&loc=5&r=9&rfunc=100&tj=none",
                "url_https": "http://slide.sports.sina.com.cn/g_pl/slide_2_730_229995.html?cre=sptapp&mod=r&loc=5&r=9&rfunc=100&tj=none",
                "uuid": "3445c87a95863101a0b89af322776c4a",
                "vid": 0,
                "video_id": 0,
                "video_size": 0,
                "zt": "1213championsleagu",
                "ztlevel": 3
            },
            "icezzrr1449158": {
                "_id": "b2919b765e553dbfb1780f445dc7580b",
                "agreeDataFormat": 80,
                "appEtime": 1570935007,
                "appProduct": 4503616807371800,
                "appProduct_BITNOT": 140737488355330,
                "appType": 584,
                "author": "小九",
                "authorId": "None",
                "bpic": 0,
                "category": {
                    "体育_足球_国际足球_英超": 1
                },
                "channelid": 57308,
                "channelids": [
                    57308,
                    257,
                    56510,
                    57307,
                    68265,
                    60107,
                    63576,
                    64119,
                    60863,
                    72293,
                    258,
                    40750,
                    72264,
                    70850,
                    70848,
                    64120,
                    60100,
                    60864,
                    68266,
                    63577,
                    57369,
                    62283,
                    61646,
                    72565,
                    72586,
                    72569,
                    62284,
                    61647
                ],
                "classes": {
                    "体育": 1
                },
                "comment_count": 80,
                "comment_count_show": 12,
                "commentid": "ty:comos-icezzrr1449158:0",
                "ctime": 1570762207,
                "cx_pkey": "default",
                "dataid": "comos:icezzrr1449158",
                "docid": "icezzrr1449158",
                "doct": 0,
                "editLevel": 2,
                "etype": 11,
                "eventHotValue": 0,
                "eventID": "",
                "eventLevel": 99,
                "eventName": "",
                "f_docid": "comos:icezzrr1449158",
                "forceRecmd": 1,
                "fp": "b2919b765e553dbfb1780f445dc7580b",
                "fpTime": 1570762206,
                "fp_iid": "FQwFv",
                "hotPoint": {
                    "subject": 1
                },
                "iid": "FQwFv",
                "img_count": 1,
                "img_fp": "10a02c0557623017893718e225d63ec1",
                "img_fp_iid": "FPkLh",
                "index": "subType=9",
                "info": "b2919b765e553dbfb1780f445dc7580b|9|1|0|100|none|1571972744|0|9|0|0|FQwFv|0|0|||a|0|0|comos:icezzrr1449158||",
                "intro": "拜仁今年夏天和萨内之间的肥皂剧，曾引起了极大风波。如今拜仁看起来，似乎还没有放弃挖角曼城王牌萨内。《体育图片报》透露，拜仁如今还想要挖到萨内，为此他们派出转会专家布兰基尼和萨内的经纪人进行了接触，而布兰基尼和拜仁之间有着密切的联系...",
                "is_3pics": 0,
                "is_update": 0,
                "labels": {
                    "拜仁": 0.53,
                    "曼城": 0.47
                },
                "labels_show": [
                    "欧洲足球",
                    "拜仁",
                    "曼城"
                ],
                "level": 2,
                "media": "新浪体育",
                "media_copyright": 1,
                "media_id": "1638781994",
                "media_level": 1,
                "media_show": "新浪体育:1638781994",
                "media_type": 2,
                "modifier": "penglin3",
                "mtime": 1570771672,
                "muid": "1624368",
                "muid_list": [
                    {
                        "muid": "1967639",
                        "muid_type": 2,
                        "weight": 1,
                        "word": "萨内"
                    }
                ],
                "new_commentid": "ty:comos-icezzrr1449158:0",
                "new_labels_show": [
                    {
                        "id": "l:C3X",
                        "text": "拜仁"
                    },
                    {
                        "id": "l:9of",
                        "text": "曼城"
                    }
                ],
                "new_subclass_show": [
                    {
                        "id": "sc:2S",
                        "text": "国际足球"
                    }
                ],
                "new_topic_show": [
                    {
                        "id": "t:eEv",
                        "text": "欧洲足球"
                    }
                ],
                "no_bcard": 0,
                "org_imgCount": 1,
                "pcProduct": 17601346404352,
                "pid": 6,
                "pos": -1,
                "reason": 9,
                "rep_rate": 0,
                "short_intro": "",
                "stitle": "曝拜仁还未放弃挖曼城妖王！",
                "stocks": [],
                "sub_classes": {
                    "国际足球": 0.90242721978159
                },
                "surl": "http://sports.sina.cn/premierleague/mancity/2019-10-11/detail-iicezzrr1449158.d.html?cre=sptapp&mod=r&loc=1&r=9&rfunc=100&tj=none",
                "surl_https": "https://sports.sina.cn/premierleague/mancity/2019-10-11/detail-iicezzrr1449158.d.html?cre=sptapp&mod=r&loc=1&r=9&rfunc=100&tj=none",
                "templateid": 0,
                "thumb": "http://n.sinaimg.cn/sports/transform/260/w620h440/20191011/d9e5-ifvwfti4733968.jpg",
                "thumb2": "",
                "time_length": 0,
                "title": "曝拜仁还未放弃挖曼城妖王 愿砸更高薪水邀请他",
                "title_fp": "FQwFv",
                "type": 1,
                "url": "http://sports.sina.com.cn/g/pl/2019-10-11/doc-iicezzrr1449158.shtml?cre=sptapp&mod=r&loc=1&r=9&rfunc=100&tj=none",
                "url_https": "http://sports.sina.com.cn/g/pl/2019-10-11/doc-iicezzrr1449158.shtml?cre=sptapp&mod=r&loc=1&r=9&rfunc=100&tj=none",
                "uuid": "b2919b765e553dbfb1780f445dc7580b",
                "vid": 0,
                "video_id": 0,
                "video_size": 0,
                "zt": "premierleagu",
                "ztlevel": 3
            },
            "icezzrr3666741": {
                "_id": "0ca66db4031138c7857be2504bf3a504",
                "agreeDataFormat": 143,
                "appEtime": 1571798061,
                "appProduct": 4644354295727100,
                "appType": 576,
                "author": "雷利",
                "authorId": "None",
                "bpic": 0,
                "category": {
                    "体育_足球_国际足球_英超": 1
                },
                "channelid": 57308,
                "channelids": [
                    57308,
                    257,
                    56510,
                    57307,
                    68265,
                    60107,
                    63576,
                    72429,
                    72419,
                    72293,
                    258,
                    40750,
                    72264,
                    72311,
                    72310,
                    68266,
                    60100,
                    63577,
                    72430,
                    72420
                ],
                "classes": {
                    "体育": 1
                },
                "comment_count": 143,
                "comment_count_show": 38,
                "commentid": "ty:comos-icezzrr3666741:0",
                "ctime": 1571625261,
                "cx_pkey": "default",
                "dataid": "comos:icezzrr3666741",
                "docid": "icezzrr3666741",
                "doct": 0,
                "editLevel": 2,
                "etype": 11,
                "eventHotValue": 0,
                "eventID": "",
                "eventLevel": 99,
                "eventName": "",
                "f_docid": "comos:icezzrr3666741",
                "fp": "0ca66db4031138c7857be2504bf3a504",
                "fpTime": 1571625261,
                "fp_iid": "FZtZx",
                "hotPoint": {
                    "subject": 1
                },
                "iid": "FZtZx",
                "img_count": 1,
                "img_fp": "0ca66db4031138c7857be2504bf3a504",
                "img_fp_iid": "FZtZx",
                "index": "subType=9",
                "info": "0ca66db4031138c7857be2504bf3a504|9|4|0|100|none|1571972744|0|9|0|0|FZtZx|0|0|||a|0|0|comos:icezzrr3666741||",
                "intro": "多特蒙德19岁的天才桑乔如今是全欧洲最受瞩目的红星。明年夏天他必定会成为转会市场上的香饽饽，曼联和曼城都对他有兴趣。而最新消息称，皇马也有意引进桑乔...",
                "is_3pics": 0,
                "is_update": 0,
                "labels": {
                    "曼城": 0.326,
                    "曼联": 0.367,
                    "皇马": 0.307
                },
                "labels_show": [
                    "欧洲足球",
                    "曼联",
                    "曼城",
                    "皇马"
                ],
                "level": 2,
                "media": "新浪体育",
                "media_copyright": 1,
                "media_id": "1638781994",
                "media_level": 1,
                "media_show": "新浪体育:1638781994",
                "media_type": 2,
                "mtime": 1571699202,
                "muid": "1624368",
                "muid_list": [
                    {
                        "muid": "1967489",
                        "muid_type": 2,
                        "weight": 1,
                        "word": "桑乔"
                    }
                ],
                "new_commentid": "ty:comos-icezzrr3666741:0",
                "new_labels_show": [
                    {
                        "id": "l:BJU",
                        "text": "曼联"
                    },
                    {
                        "id": "l:9of",
                        "text": "曼城"
                    },
                    {
                        "id": "l:Teg",
                        "text": "皇马"
                    }
                ],
                "new_subclass_show": [
                    {
                        "id": "sc:1gVq",
                        "text": "英格兰足球"
                    }
                ],
                "new_topic_show": [
                    {
                        "id": "t:eEv",
                        "text": "欧洲足球"
                    }
                ],
                "no_bcard": 0,
                "org_imgCount": 1,
                "pcProduct": 17592756469760,
                "pid": 6,
                "pos": -1,
                "reason": 9,
                "rep_rate": 0,
                "short_intro": "曼联和曼城都对他有兴趣。最新消息称，皇马也有意引进他",
                "stitle": "曝皇马看中1.4亿欧洲帝星",
                "stocks": [],
                "sub_classes": {
                    "英格兰足球": 0.73105857863
                },
                "surl": "http://sports.sina.cn/premierleague/mancity/2019-10-21/detail-iicezzrr3666741.d.html?cre=sptapp&mod=r&loc=4&r=9&rfunc=100&tj=none",
                "surl_https": "https://sports.sina.cn/premierleague/mancity/2019-10-21/detail-iicezzrr3666741.d.html?cre=sptapp&mod=r&loc=4&r=9&rfunc=100&tj=none",
                "templateid": 0,
                "thumb": "http://n.sinaimg.cn/sports/transform/223/w621h402/20191021/5c0b-ihfpfvz9979563.jpg",
                "thumb2": "",
                "time_length": 0,
                "title": "曝皇马看中1.4亿欧洲帝星 明夏要PK曼城曼联抢人",
                "title_fp": "FZtZx",
                "type": 1,
                "url": "http://sports.sina.com.cn/g/pl/2019-10-21/doc-iicezzrr3666741.shtml?cre=sptapp&mod=r&loc=4&r=9&rfunc=100&tj=none",
                "url_https": "http://sports.sina.com.cn/g/pl/2019-10-21/doc-iicezzrr3666741.shtml?cre=sptapp&mod=r&loc=4&r=9&rfunc=100&tj=none",
                "uuid": "0ca66db4031138c7857be2504bf3a504",
                "vid": 0,
                "video_id": 0,
                "video_size": 0,
                "zt": "premierleagu",
                "ztlevel": 3
            },
            "icezuev1972539": {
                "_id": "a96a3b105f633f9d8f9a1a9a8303500b",
                "agreeDataFormat": 417,
                "appEtime": 1571042369,
                "appProduct": 4644354295727100,
                "appType": 576,
                "author": "马舸",
                "authorId": "None",
                "bpic": 0,
                "bthumb": "",
                "category": {
                    "体育_足球_国际足球_英超": 1
                },
                "channelid": 57308,
                "channelids": [
                    57308,
                    257,
                    56510,
                    57307,
                    242405,
                    107919,
                    242400,
                    68265,
                    60107,
                    63576,
                    64119,
                    60863,
                    72293,
                    258,
                    40750,
                    72264,
                    70850,
                    70848,
                    64120,
                    60100,
                    60864,
                    68266,
                    63577,
                    252175,
                    57369,
                    62252,
                    61646,
                    72565,
                    72586,
                    72569,
                    62253,
                    61647
                ],
                "classes": {
                    "体育": 1
                },
                "comment_count": 417,
                "comment_count_show": 79,
                "commentid": "ty:comos-icezuev1972539:0",
                "ctime": 1570999169,
                "cx_pkey": "default",
                "dataid": "comos:icezuev1972539",
                "docid": "icezuev1972539",
                "doct": 0,
                "editLevel": 1,
                "etype": 5,
                "eventHotValue": 0,
                "eventID": "",
                "eventLevel": 99,
                "eventName": "",
                "f_docid": "comos:icezuev1972539",
                "fp": "a96a3b105f633f9d8f9a1a9a8303500b",
                "fpTime": 1570999449,
                "fp_iid": "FTLGf",
                "hotPoint": {
                    "important": 3,
                    "subject": 1
                },
                "iid": "FTLGf",
                "img_count": 17,
                "img_fp": "878f1b9b23ce38bf9c0502795e1260b9",
                "img_fp_iid": "FTLDf",
                "index": "subType=9",
                "info": "a96a3b105f633f9d8f9a1a9a8303500b|9|2|0|100|none|1571972744|0|9|0|0|FTLGf|0|0|||a|0|0|comos:icezuev1972539||",
                "intro": "北京时间10月14日2时45分（爱沙尼亚当地时间13日21时45分），欧洲杯预选赛C组在塔林开始1场较量，德国客场3比0胜爱沙尼亚，与荷兰同积15分...",
                "is_3pics": 1,
                "is_update": 0,
                "labels": {
                    "德国": 0.452,
                    "曼城": 0.548
                },
                "labels_show": [
                    "德甲",
                    "曼城",
                    "德国"
                ],
                "level": 1,
                "ltitle": "欧预赛-10人逆境曼城大将2射1传 德国客场3-0胜",
                "media": "新浪体育",
                "media_copyright": 1,
                "media_id": "1638781994",
                "media_level": 1,
                "media_show": "新浪体育:1638781994",
                "media_type": 2,
                "mintro": "欧预赛-10人逆境曼城大将2射1传 德国客场3-0胜",
                "mtime": 1571085432,
                "mtitle": "欧预赛-10人逆境曼城大将2射1传 德国客场3-0胜",
                "muid": "1624368",
                "muid_list": [
                    {
                        "muid": "2171678",
                        "muid_type": 598,
                        "weight": 0.58695652173913,
                        "word": "德国"
                    },
                    {
                        "muid": "1969974",
                        "muid_type": 2,
                        "weight": 0.41304347826087,
                        "word": "京多安"
                    }
                ],
                "new_commentid": "ty:comos-icezuev1972539:0",
                "new_labels_show": [
                    {
                        "id": "l:9of",
                        "text": "曼城"
                    },
                    {
                        "id": "l:2WA",
                        "text": "德国"
                    }
                ],
                "new_subclass_show": [
                    {
                        "id": "sc:1gVq",
                        "text": "英格兰足球"
                    }
                ],
                "new_topic_show": [
                    {
                        "id": "t:3R1",
                        "text": "德甲"
                    }
                ],
                "no_bcard": 0,
                "org_imgCount": 17,
                "pcProduct": 17601346404352,
                "pid": 6,
                "pos": -1,
                "reason": 9,
                "rep_rate": 0,
                "short_intro": "埃姆雷-詹开场被罚下，京多安梅开二度并助攻韦尔纳破门",
                "stitle": "欧预-德国客场10人逆境3-0胜",
                "stocks": [],
                "sub_classes": {
                    "英格兰足球": 0.73105857863
                },
                "surl": "http://sports.sina.cn/premierleague/mancity/2019-10-14/detail-iicezuev1972539.d.html?cre=sptapp&mod=r&loc=2&r=9&rfunc=100&tj=none",
                "surl_https": "https://sports.sina.cn/premierleague/mancity/2019-10-14/detail-iicezuev1972539.d.html?cre=sptapp&mod=r&loc=2&r=9&rfunc=100&tj=none",
                "templateid": 0,
                "thumb": "http://n.sinaimg.cn/sports/transform/263/w650h413/20191014/f176-ifvwftk5338671.jpg",
                "thumb2": "",
                "thumbs": [
                    "http://n.sinaimg.cn/sports/transform/263/w650h413/20191014/f176-ifvwftk5338671.jpg"
                ],
                "time_length": 0,
                "title": "欧预赛-10人逆境曼城大将2射1传 德国客场3-0胜",
                "title_fp": "FTLGf",
                "type": 1,
                "url": "http://sports.sina.com.cn/g/pl/2019-10-14/doc-iicezuev1972539.shtml?cre=sptapp&mod=r&loc=2&r=9&rfunc=100&tj=none",
                "url_https": "http://sports.sina.com.cn/g/pl/2019-10-14/doc-iicezuev1972539.shtml?cre=sptapp&mod=r&loc=2&r=9&rfunc=100&tj=none",
                "uuid": "a96a3b105f633f9d8f9a1a9a8303500b",
                "vid": 0,
                "video_id": 0,
                "video_size": 0,
                "zt": "euro2020",
                "ztlevel": 2
            },
        },
        tipText: '上划或点击查看更多',
        isLoad: false,
        isFirstVisit: true,
        page: 0,
        page_size: 10,
        params: {
            length: 10, // 请求的推荐列表长度,取非负整数，默认值为20，最大值为100,规则：offset+length<=100
            pageurl: 'http://sports.sina.com.cn/g/pl/2018-10-18/doc-ifxeuwws5616671.shtml',
            cateid: '2L', // 栏目列表
            cre: 'sptapp', // 这两个参数主要用于描述产品位，需要statics=1激活这两个参数
            mod: 'r',
            merge: 3, // 显示推荐原因
            statics: 1,
            this_page: 1, // 是否过滤当前页
            rfunc: 105, // 应用场景参数
            dedup: 1, // 去重标志
            app_type: 112, // 客户端类型: 110-新闻app，111-财经app，112-体育app
        },
    },
    onLoad() {
        // 监听页面加载的生命周期函数
        swan.setPageInfo({
            title: '小猪新闻看点',
            keywords: '小猪新闻看点,体育新闻',
            description: '小猪新闻看点为用户提供热点新闻、图集和视频等体育相关新闻、图集、视频资讯。',
            articleTitle: '看深度的原创体育资讯；追炫酷的体育潮流。',
            releaseDate: '2019-10-17 17:31:30',
            image: [
                'http://n.sinaimg.cn/sports/imgStore/download/phone.png',
                'http://n.sinaimg.cn/sports/imgStore/750x1334.png'
            ],
            success: res => {
                console.log('setPageInfo success');
            },
            fail: err => {
                console.log('setPageInfo fail', err);
            }
        })
        this.getNews();
        this.setData({
            isFirstVisit: false,
        });
    },
    onReady() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onReachBottom() {
        // 页面上拉触底事件的处理函数
        this.getMoreNews();
    },
    onClickBottom() {
        // 底部查看更多点击事件的处理函数
        this.getMoreNews();
    },
    onPullDownRefresh() {
        // 监听用户下拉动作
        swan.showToast('数据加载中。。。');
    },
    getMoreNews() {
        this.setData({
            page: this.data.page + 1,
        });
        this.getNews();
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
        return {
            title: '小猪新闻看点',
            content: '看深度的原创体育资讯；追炫酷的体育潮流。',
            path: 'pages/sports/index'
        };
    },
    onURLQueryChange: function () {
        // 监听页面 URL query 改变
    },
    getNews: function () {
        if (this.data.isLoad) return;
        this.setData({
            isLoad: true,
        });
        /*
         type	指定item返回类型
         1新闻,2高清图,3视频,4博文,5悦读,6长微博,
         7抓站文章,8产品库页面,9看点文章,10秒拍,11微信公众号,12 精读, 13 专栏
         14 专题
         15 直播
         16 H5页面
         注：type=2的新闻页在百度小程序中打不开
         app_type	客户端类型	110-新闻app，111-财经app，112-体育app
        */
        swan.request({
            url: 'https://cre.dp.sina.cn/api/v3/get?offset=' + this.data.page * this.data.page_size + '&timstamp=' + new Date().getTime(),
            header: {
                'content-type': 'application/json'
            },
            data: this.data.params,
            success: res => {
                var newsDataList = [], dataList = res.data.data || [];
                var newdocidList = [];
                for (var ind = 0, size = dataList.length; ind < size; ind++) {
                    var item = dataList[ind];
                    if (this.data.docidList.toString().indexOf(item.docid) < 0) {
                        item.agreeDataFormat = this.agreeDataFormat(item.comment_count);
                        newsDataList.push(item);
                        newdocidList.push(item.docid);
                        this.data.newsListObj[item.docid] = item;
                    }
                }
                if (newsDataList.length !== 0) {
                    newsDataList = this.data.newsList.concat(newsDataList);
                    newdocidList = this.data.docidList.concat(newdocidList);
                    this.setData({
                        newsList: newsDataList,
                    });
                    this.setData({
                        docidList: newdocidList,
                    });
                    this.setData({
                        newsListObj: this.data.newsListObj,
                    });
                    this.setData({
                        isLoad: false,
                    });
                } else {
                    this.setData({
                        isLoad: false,
                    });
                    this.setData({
                        tipText: '没有更多了哟',
                    });
                }
            },
            fail: err => {
                this.setData({
                    isLoad: false,
                });
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    jumpPage: function (e) {
        var eventData = e.currentTarget.dataset;
        var currentNewsItem = this.data.newsListObj[eventData.docid];
        swan.navigateTo({
            url: '/pages/detail/index?docid=' + currentNewsItem.docid + '&slideid='
                + currentNewsItem.f_docid + '&type=' + currentNewsItem.type + '&src=' + encodeURI(currentNewsItem.url),
        });
    },
    agreeDataFormat: function (agreeData) {
        if (agreeData && agreeData <= 9999) {
            return agreeData;
        } else if (agreeData && agreeData > 9999) {
            return Math.floor(agreeData / 1000) / 10 + 'w';
        }
    }
})
