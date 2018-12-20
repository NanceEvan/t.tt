/* 工具函数 start */
// 通过id获取元素
function byId(id){return typeof(id)==="string"?document.getElementById(id):id;}
// 通过class获取元素数组
function byClassName(className){return typeof(className)==="string"?document.getElementsByClassName(className):id;}
// 获取指定元素指定当前样式（包括行内 头部 外部）
var getStyle = function(elem, style){return window.getComputedStyle(elem)[style];};
// 生成指定节点
var creatElementNode = function (elementNodeName) {
    var ce = document.createElement(elementNodeName);
};
// 判断元素是否有指定类名
function hasClass( elements,cName ){
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
}
// 给元素添加class，首先使用hasClass方法进行了判断
function addClass( elements,cName ){
    if( !hasClass( elements,cName ) ){
        elements.className += " " + cName;
    }
}
// 删除元素的一个class
function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换
    }
}

// 通过标签名创建元素
function createElementByTagName(tagName){
    return document.createElement(tagName);
}

/**
 * 指定元素移动函数，要求移动的元素使用定位
 * @param tarId 移动目标id
 * @param an_speed 动画速度(px)
 * @param an_dis 移动距离(px)
 * @param m_dir 要改动的方向值(left | top | right | bottom)
 * @param hz    执行周期（可以影响动画的平滑程度和速度）
 */
var pop_move = function(tarId, an_speed, an_dis, m_dir, hz){
    var tarElem = byId(tarId), timer = null;
    var now_pos = parseInt(getStyle(tarElem, m_dir));
    tarElem.style[m_dir] = now_pos + "px";
    timer = setInterval(function () {
        var speed = an_dis > 0 ? an_speed : -an_speed;
        if(Math.abs(now_pos - an_dis) < Math.abs(an_speed)){
            // 由于精度或者速度不能被移动距离整除，需要在最后一次性移动到指定位置
            tarElem.style[m_dir] = an_dis + "px";
            clearInterval(timer);
        }else{
            now_pos += speed;
            tarElem.style[m_dir] = now_pos + "px";
        }
    }, hz);
};

/* 工具函数 end */

/* banner start */
var banner_function = function () {
    var timer = null,
        index = 0,
        pics = byId("banner").getElementsByTagName("div"),
        dots = byId("dots").getElementsByTagName("a"),
        size = pics.length;

    // 清除定时器,停止自动播放
    function stopAutoPlay(){
        if(timer){
            clearInterval(timer);
        }
    }
    // 图片自动轮播
    function startAutoPlay(){
        timer = setInterval(function(){
            index++;
            if(index >= size){
                index = 0;
            }
            changeImg();
        },3000)
    }
    // 图片切换
    function changeImg(){
        for(var i=0,len=dots.length;i<len;i++){
            dots[i].className = " ";
            pics[i].className = "banner-item";
        }
        dots[index].className = "active";
        pics[index].className = "banner-item active";
    }
    function slideImg(){
        var banner = byId("banner");
        banner.onmouseover = function(){
            stopAutoPlay();
        };
        banner.onmouseout = function(){
            startAutoPlay();
        };
        banner.onmouseout();

        // 点击导航切换
        for(var i=0,len=dots.length;i<len;i++){
            dots[i].id = i;
            dots[i].onclick = function(){
                index = this.id;
                changeImg();
            }
        }
    }
    slideImg();
};
banner_function();
/* banner end */

/* 热门单品页面切换 start*/
var page_change = function () {
    var b_pre = byId("pop-pre"),
        b_sub = byId("pop-sub");
// 点击向前按钮
    b_pre.onclick = function(){
        // 如果该按钮不处于禁用状态
        if(b_sub.className.indexOf("disabled") !== -1){
            // console.info("向左");
            pop_move("pop-list", 120, 0, "right", 20);
            b_sub.className = "iconfont icon-right-circle sub";
            this.className += " disabled";
        }
    };
// 点击向后按钮
    b_sub.onclick = function(){
        if(b_pre.className.indexOf("disabled") !== -1){
            // console.info("向右");
            pop_move("pop-list", 100, 1220, "right", 20);
            b_pre.className = "iconfont icon-left-circle pre mr10";
            this.className += " disabled";
        }
    };
};
page_change();
/* 热门单品页面切换 end*/

/* 商品展示item start */
var hot_items_info = [
    {
        "imgs": [
            "https://resource.smartisan.com/resource/b07b9765e272f866da6acda4ee107d88.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/25cc6e783a664fbdf83c3c34774a9826.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/2f2afca6f88e3aef5b1f332ea0c1d65a.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/6668df0e297bf04702df6d166091ac51.png?x-oss-process=image/resize,w_216/format,webp"
        ],
        "title": "坚果 Pro 2S",
        "intro": "双系统，无限屏",
        "pro": "增软胶透明保护套（数量有限送完即止）",
        "color": ["black", "blue", "red", "gray"],
        "price": "2,298.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/06c2253354096f5e9ebf0616f1af2086.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/efb9aacaab54e8a7fe5bbfbe8979adcd.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/17f254e6f809355d8fe66260ccb48fb0.png?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "坚果 R1",
        "intro": "次世代旗舰手机，内藏来自未来的\"电脑\"",
        "pro" : "",
        "color": ["black", "gray", "green"],
        "price": "3,299.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/6ff92d05a3bfab4fad489ca04d3eea5a.png?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "畅呼吸智能空气净化器 · 标准版",
        "intro": "超强净化能力、超低噪音、超长寿命",
        "pro" : "",
        "color": ["gray"],
        "price": "3,499.00",
        "btn-type": 1,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/fc092e830c0420b5d8db2871fec82b35.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/db4895e45ee6f3339037dbf7200e63f2.png?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "地平线 8 号旅行箱",
        "intro": "为了野心和远方",
        "pro" : "",
        "color": ["gray", "black"],
        "price": "299.00",
        "btn-type": 2,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/1f35153a250a2898bf8846a031e0f0ab.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/fa25116df765cdbe469d31cb1a5d8c13.jpg?x-oss-process=image/resize,w_216/format,webp"
        ],
        "title": "Smartisan 卫衣 圆领 老友记",
        "intro": "风格简洁、舒适服帖",
        "pro" : "",
        "color": ["purple", "black"],
        "price": "199.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/afcec520933673b8e03a867e6502f6e0.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/70d345eb737b8118823e50cfa08658c5.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/f5a36dfc37d52a643683f4a21247f3ff.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/8d8f9a1e239f8fcd2308776f49ba09f6.jpg?x-oss-process=image/resize,w_216/format,webp"
        ],
        "title": "坚果 “电池形电池”移动电源",
        "intro": "别具一格的“全能型”移动电源",
        "pro" : "",
        "color": ["red", "gray", "orange", "green"],
        "price": "69.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/84366aa98fd0659d7809e1b9eed62cb4.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/574abf59d5cfd440d8370eb99118c44a.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/cb762c4e848239e3173f2d1eb94c9628.png?x-oss-process=image/resize,w_216/format,webp"
        ],
        "title": "坚果 Pro 2 特别版",
        "intro": "漂亮得不像实力派",
        "pro" : "",
        "color": ["black", "red", "gray"],
        "price": "1,899.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/fac4130efc39ed4db697cc8d137890e9.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/91dc3f577960e30ca11b632e7b6ebd0f.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/13e91511f6ba3227ca5378fd2e93c54b.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/61586b59793ac16bd973010aecad2ca9.png?x-oss-process=image/resize,w_216/format,webp"
        ],
        "title": "坚果 3",
        "intro": "漂亮得不像实力派",
        "pro" : "",
        "color": ["red", "gray", "black", "red"],
        "price": "1,999.00",
        "btn-type": 0,
    },
];

var create_more_button = function () {
    var more_btn = createElementByTagName("button");
    more_btn.setAttribute("class", "more-button");
    more_btn.textContent = "查看详情";
    return more_btn;
};
var create_cart_button = function () {
    var cart_btn = createElementByTagName("button");
    cart_btn.setAttribute("class", "cart-button");
    cart_btn.textContent = "加入购物车";
    return cart_btn;
};
var create_disable_button = function () {
    var dis_btn = createElementByTagName("button");
    dis_btn.setAttribute("class", "disable-button");
    dis_btn.textContent = "已售罄";
    return dis_btn;
};


var create_showcase_item = function (parent, item, idx) {
    var item_info = createElementByTagName("li");
    item_info.setAttribute("class", "goods-item");
    item_info.setAttribute("idx", idx);
    // 商品img
    var item_img = createElementByTagName("img");
    item_img.setAttribute("src", item["imgs"][0]);
    item_info.appendChild(item_img);
    // 商品title
    var item_title = createElementByTagName("h4");
    item_title.textContent = item["title"];
    item_title.setAttribute("class", "item-title");
    item_info.appendChild(item_title);
    // 商品简介
    var item_details = createElementByTagName("h6");
    item_details.textContent = item["intro"];
    item_details.setAttribute("pro", item["pro"]);
    item_details.setAttribute("class", "item-details");
    item_info.appendChild(item_details);
    // dots-wrap
    var item_dots_wrap = createElementByTagName("div");
    item_dots_wrap.setAttribute("class", "item-dots-wrap");
    // dots
    for(let i = 0; i < item["color"].length; i ++){
        var item_dot = createElementByTagName("a");
        // 默认激活第一个小球
        i === 0 ? item_dot.setAttribute("class", "item-dots active")
                : item_dot.setAttribute("class", "item-dots");
        item_dot.setAttribute("href", "javascript:void(0)");
        item_dot.setAttribute("idx", i);
        item_dot.style = "background-color: " + item["color"][i];
        item_dots_wrap.appendChild(item_dot);
    }
    item_dots_wrap.appendChild(item_dot);
    item_info.appendChild(item_dots_wrap);
    // 设置dots-wrap位置
    var dots_wrap_width = item["color"].length * 21 - 10;
    // 父级的宽度
    var item_info_width = 305;
    var dots_wrap_pos = parseInt((item_info_width - dots_wrap_width) / 2);
    item_dots_wrap.style.left = dots_wrap_pos + "px";
    // 遮罩层
    var item_masked = createElementByTagName("a");
    item_masked.setAttribute("class", "item-masked");
    item_masked.setAttribute("idx", idx);
    item_info.append(item_masked);
    // item-price
    var item_price = document.createElement("span");
    item_price.textContent = item["price"];
    item_price.setAttribute("class", "item-price");
    item_price.setAttribute("btntype", item["btn-type"]);
    item_info.append(item_price);
    parent.append(item_info);

    parent.appendChild(item_info);
};
var showcase_item_js = function (parent, items) {
    var item_masked = parent.getElementsByClassName("item-masked");
    var item_details = parent.getElementsByClassName("item-details");
    var item_id = null,
        img_id = null,
        item_intro = null,
        item_price = null;

    var moreElem = null;


    parent.addEventListener("mouseover", (ev) => {
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;

        if(target.className.toLowerCase() === "item-masked"){
            item_id = target.getAttribute("idx");
        }
        item_masked[item_id].style = "box-shadow: inset 0 0 38px rgba(0,0,0, .3);transition: all .15s ease;";

        if(item_details[item_id].getAttribute("pro") !== ""){
            item_intro = item_details[item_id].textContent;
            item_details[item_id].textContent = item_details[item_id].getAttribute("pro");
            item_details[item_id].style = "color: red";
        }

        // 移除价格，显示按钮
        // 因为list清除浮动了，before id为0 所以所有itemid + 1
        var now_item = parent.childNodes[parseInt(item_id)+1];
        item_price = now_item.lastChild;
        now_item.removeChild(item_price);

        moreElem = createElementByTagName("div");
        moreElem.setAttribute("class", "more");
        moreElem.appendChild(create_more_button());
        item_price.getAttribute("btntype") !== "1" || moreElem.appendChild(create_cart_button());
        item_price.getAttribute("btntype") !== "2" || moreElem.appendChild(create_disable_button());

        now_item.appendChild(moreElem);

        // 悬浮在对应的小球上
        if(target.className.toLowerCase().indexOf("item-dots") !== -1
            && target.className.toLowerCase().indexOf("wrap") === -1){
            img_id = target.getAttribute("idx");
            target.parentElement.parentElement.firstChild.src = items[item_id].imgs[img_id];
            var l_dots = target.parentElement.childNodes;
            for(let l = 0; l < l_dots.length; l ++){
                l_dots[l].setAttribute("class", "item-dots");
            }
            target.setAttribute("class", "item-dots active");
        }
    }, false);

    parent.addEventListener("mouseout", (ev) =>{
        ev = ev || window.event;
        target = ev.target || ev.srcElement;

        if(target.className.toLowerCase() === "item-masked"){
            item_id = target.getAttribute("idx");
        }
        item_masked[item_id].style = " ";

        // // 如果pro不为空，则悬浮结束显示intro
        if(item_details[item_id].getAttribute("pro") !== ""){
            item_details[item_id].textContent = item_intro;
            item_details[item_id].style = " ";
        }

        // 移除按钮，显示价格
        var now_item = parent.childNodes[parseInt(item_id) + 1];
        now_item.removeChild(moreElem);
        now_item.append(item_price);
    }, false);
};
var create_showcase = function (parent, items) {
    for(let i = 0; i < items.length; i ++){
        create_showcase_item(parent, items[i], i);
    }
    showcase_item_js(parent, items);

};

create_showcase(byId("pop-list"), hot_items_info);

// create_showcase(byId("acc-list"), acc_items_info);
/* 商品展示item end */

// 坚果手机及配件部分
var acc_items_info = [
    {
        "imgs": [
            "https://resource.smartisan.com/resource/b07b9765e272f866da6acda4ee107d88.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/25cc6e783a664fbdf83c3c34774a9826.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/2f2afca6f88e3aef5b1f332ea0c1d65a.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/6668df0e297bf04702df6d166091ac51.png?x-oss-process=image/resize,w_216/format,webp"
        ],
        "title": "坚果 Pro 2S",
        "intro": "双系统，无限屏",
        "pro": "增软胶透明保护套（数量有限送完即止）",
        "color": ["black", "blue", "red", "gray"],
        "price": "2,298.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/06c2253354096f5e9ebf0616f1af2086.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/efb9aacaab54e8a7fe5bbfbe8979adcd.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/17f254e6f809355d8fe66260ccb48fb0.png?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "坚果 R1",
        "intro": "次世代旗舰手机，内藏来自未来的\"电脑\"",
        "pro" : "",
        "color": ["black", "gray", "green"],
        "price": "3,299.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/e03e957c19f121a9a8e453e6e27b08a8.jpg?x-oss-process=image/resize,w_216/format,webp",
            ],
        "title": "坚果 R1“足迹”系列保护套 滑翔机之父李林塔尔出生",
        "intro": "1848 年 5 月 23 日",
        "pro" : "",
        "color": ["blue"],
        "price": "99.00",
        "btn-type": 1,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/f988f7b388f9c49cfec31d666b38a3ee.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "坚果 R1 TPU 软胶半透明保护套",
        "intro": "半透明设计，质感精良",
        "pro" : "",
        "color": ["gray"],
        "price": "49.00",
        "btn-type": 1,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/728cc8200d099ee231927a9ccfb08fd1.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "坚果 Pro 2S“足迹”系列保护套 薛定谔诞生",
        "intro": "1887 年 8 月 12 日",
        "pro" : "",
        "color": ["skyblue"],
        "price": "79.00",
        "btn-type": 1,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/e03e957c19f121a9a8e453e6e27b08a8.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "坚果 R1“足迹”系列保护套 滑翔机之父李林塔尔出生",
        "intro": "1848 年 5 月 23 日",
        "pro" : "",
        "color": ["blue"],
        "price": "99.00",
        "btn-type": 1,
    },
];
create_showcase(byId("acc-list"), acc_items_info);

// 官方精选配件
var fea_items_info = [
    {
        "imgs": [
            "https://resource.smartisan.com/resource/6e96ccea3bd56bdd2243eb20330cec30.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/c44f0ab4da5591fc3d0f82b7ac0f4f65.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "坚果砖式蓝牙小音箱",
        "intro": "一款设计出色、音质出众的随身音箱",
        "pro": "",
        "color": ["gray", "blue"],
        "price": "149.00",
        "btn-type": 2,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/f319b26eb69e8ba351423abfad347eae.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/b7105b0d819e610a9c38d7ca2a813e58.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "坚果砖式蓝牙小音箱",
        "intro": "一款设计出色、音质出众的随身音箱",
        "pro": "",
        "color": ["blue", "gray"],
        "price": "199.00",
        "btn-type": 2,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/a668d1a5f41b04ece82d76ded1e94d3a.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "坚果 QuickCharge 4+ 快速充电器",
        "intro": "全面兼容的 18W 快速充电",
        "pro": "",
        "color": ["gray"],
        "price": "59.00",
        "btn-type": 1,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/afcec520933673b8e03a867e6502f6e0.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/70d345eb737b8118823e50cfa08658c5.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/f5a36dfc37d52a643683f4a21247f3ff.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/8d8f9a1e239f8fcd2308776f49ba09f6.jpg?x-oss-process=image/resize,w_216/format,webp"
        ],
        "title": "坚果 “电池形电池”移动电源",
        "intro": "别具一格的“全能型”移动电源",
        "pro" : "",
        "color": ["red", "gray", "orange", "green"],
        "price": "69.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/110ef73bbe87d01d0e958f9c85d1c566.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/a02b263d84911cb7316eeb1102584f4b.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "坚果蓝牙小黑（小白）耳机",
        "intro": "一副干净的蓝牙耳机",
        "pro": "",
        "color": ["black", "gray"],
        "price": "99.00",
        "btn-type": 2,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/f55641e23f35f6dd82226b6c4a043f00.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "坚果三脚架自拍杆",
        "intro": "两种模式，随时随地都能拍得开心",
        "pro": "",
        "color": ["black"],
        "price": "99.00",
        "btn-type": 1,
    },
];
create_showcase(byId("fea-list"), fea_items_info);

// 净化器及配件
var fil_items_info = [
    {
        "imgs": [
            "https://resource.smartisan.com/resource/6ff92d05a3bfab4fad489ca04d3eea5a.png?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "畅呼吸智能空气净化器 · 标准版",
        "intro": "超强净化能力、超低噪音、超长寿命",
        "pro": "",
        "color": ["white"],
        "price": "3,499.00",
        "btn-type": 1,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/71432ad30288fb860a4389881069b874.png?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "畅呼吸智能空气净化器超级除甲醛版",
        "intro": "超强除甲醛能力，超低噪音，智能操控",
        "pro": "",
        "color": ["white"],
        "price": "3,499.00",
        "btn-type": 2,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/2dc9a41577bee7f9d6c54365f542509e.png?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "畅呼吸智能落地式加湿器",
        "intro": "健康无雾、高效加湿、超低噪音",
        "pro": "",
        "color": ["white"],
        "price": "1,999.00",
        "btn-type": 2,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/fed059c1692cf906f60fdb76818e428d.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/787556c85c703474b3f90c68f11fd896.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/b9c502d4f1a410e2eca1dff3f2b1e47e.jpg?x-oss-process=image/resize,w_216/format,webp"
        ],
        "title": "畅呼吸智能空气净化器超级除甲醛版",
        "intro": "超强除甲醛能力，超低噪音，智能操控",
        "pro": "",
        "color": ["black", "white", "blue"],
        "price": "99.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/00eee903962f17d75950397843117e6e.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "除霾除甲醛高效复合滤芯",
        "intro": "精选双层防护材质、过滤更精细、去味更有效",
        "pro": "",
        "color": ["white"],
        "price": "799.00",
        "btn-type": 2,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/4d83d72c5ecc288e8d5ddd9d06b80f99.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "除甲醛超级活性炭滤芯",
        "intro": "家装等场景适用的专业除甲醛超级活性炭滤芯",
        "pro": "",
        "color": ["black"],
        "price": "699.00",
        "btn-type": 2,
    },
];
create_showcase(byId("fil-list"), fil_items_info);

// 品牌周边
var bp_items_info = [
    {
        "imgs": [
            "https://resource.smartisan.com/resource/e40d7713a4c10f6aebe4c9810d4ed7ff.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/e328d72af122d62b1f46e348f4284e63.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/0dc3f01ffd04748a99de8b2c69d4df83.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/58ebc5115b53dc9835bfe3374fd43603.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/87728718e6ac168b529429b33ad45762.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/c267357fa9229440df3e5c702683d603.jpg?x-oss-process=image/resize,w_216/format,webp"
        ],
        "title": "Smartisan 卫衣 经典款",
        "intro": "风格简洁、舒适服帖",
        "pro": "",
        "color": ["yellow", "purple", "brown", "white", "gray", "black"],
        "price": "249.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/33de3e2c8b19b3a9d58fc55b59d2dbce.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/31ea9a5a622a7f2cc666bf5d5ee676bc.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/4e7eeaaf9deecad63c0c170e596fc64e.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/4a3af52ae7f6e93292668002767b6234.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "Smartisan 牛津纺衬衫",
        "intro": "一件无拘无束的舒适衬衫",
        "pro": "",
        "color": ["purple", "white", "black", "gray"],
        "price": "199.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/5aa0d402c12d2f588fe30044c9c13e36.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/83031b149346a9a14f4a9588cafc2b54.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/17d8b67007f042fa144417bc42f5fc24.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "Smartisan 卫衣 阿加莎·克里斯蒂出生",
        "intro": "风格简洁、舒适服帖",
        "pro": "",
        "color": ["purple", "white", "black"],
        "price": "249.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/a48e7a222934ae64e51fcaeddded049a.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/378bc572fe4e5384698c70028efe81ef.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/90c53a9b417a0cabb40aebd23f147784.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "Smartisan 卫衣 本初子午线",
        "intro": "风格简洁、舒适服帖",
        "pro": "",
        "color": ["purple", "white", "black"],
        "price": "249.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/448a7daa2ea1fbf3cdb4bafe0c557dfa.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/48f3427316b85aa1f5b6d23641297e8b.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/03b767018413d22c5146303a18944687.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/e4ba37775b6a10b6f8461104efa64fcd.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/0e56c4e1b005ded76cbab87b628b8d70.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/1e550761e8ee87cb248f8f85f82c5453.jpg?x-oss-process=image/resize,w_216/format,webp"
        ],
        "title": "Smartisan 卫衣 圆领 经典款",
        "intro": "风格简洁、舒适服帖",
        "pro": "",
        "color": ["yellow", "purple", "brown", "white", "gray", "black"],
        "price": "199.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/1f35153a250a2898bf8846a031e0f0ab.jpg?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/fa25116df765cdbe469d31cb1a5d8c13.jpg?x-oss-process=image/resize,w_216/format,webp"
        ],
        "title": "Smartisan 卫衣 圆领 老友记",
        "intro": "风格简洁、舒适服帖",
        "pro" : "",
        "color": ["purple", "black"],
        "price": "199.00",
        "btn-type": 0,
    },
];
create_showcase(byId("bp-list"), bp_items_info);

// 品牌精选
var bs_items_info = [
    {
        "imgs": [
            "https://resource.smartisan.com/resource/d1dcca9144e8d13ffb33026148599d0a.png?x-oss-process=image/resize,w_216/format,webp",
            "https://resource.smartisan.com/resource/190a2b0f96274c85973e1dd6ba3b511b.png?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "地平线 8 号商务旅行箱",
        "intro": "为了野心和远方",
        "pro": "",
        "color": ["gray", "black"],
        "price": "1,199.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/f7bd84cc009b0487b3e5cb3135bf0483.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "《博朗设计》",
        "intro": "“二十世纪工业设计系列”第三部作品",
        "pro": "",
        "color": ["white"],
        "price": "259.00",
        "btn-type": 2,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/5e4e40120d09fb6791f9430f914c6f68.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "《深泽直人》",
        "intro": "首次面向中国读者介绍其作品",
        "pro": "",
        "color": ["white"],
        "price": "199.00",
        "btn-type": 2,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/f950d9c27ef21e17374fa212b40d66a9.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "《索尼设计，塑造现代》",
        "intro": "索尼全盛时期工业设计作品首次集结成书并引进中国",
        "pro": "",
        "color": ["white"],
        "price": "259.00",
        "btn-type": 2,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/d583540b05d746bb9f74e9892db0725e.png?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "Ta Da Roll 大大卷身高尺",
        "intro": "留下孩子成长每一步",
        "pro": "",
        "color": ["gray", "black"],
        "price": "139.00",
        "btn-type": 0,
    },
    {
        "imgs": [
            "https://resource.smartisan.com/resource/16bcd1754386f76570dd68c78c6e2356.jpg?x-oss-process=image/resize,w_216/format,webp",
        ],
        "title": "小笨钟 Little Ben",
        "intro": "蹲下来，和孩子一起慢慢认时间",
        "pro": "",
        "color": ["white"],
        "price": "399.00",
        "btn-type": 2,
    },
];
create_showcase(byId("bs-list"), bs_items_info);

