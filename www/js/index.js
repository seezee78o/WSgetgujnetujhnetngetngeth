! function () {
	// =================================== pages
	var onurls = [];
	var onblank = [];
	var balnkurl = [];

	window.onurl = function (f) {
		onurls.push(f);
	};
	var val;
	var canex = 0;

	function firstpage() {
		var val = window.location.pathname;
		val = val.replace(/\/$/g, "");
		val = val.split("/");
		val.splice(0, 1);
		var page = val.splice(0, 1)[0];
		if (val[0] == "")
			val[0] = undefined

		changepage(page);
		for (i in onurls) {
			onurls[i](page, val);
		}
	}
	window.on("popstate", function (e) {
		if (onblank.length != 0) {
			history.pushState("", "", balnkurl[balnkurl.length - 1]);
			onblank[onblank.length - 1](0);
			return;
		}
		val = window.location.pathname;
		val = val.replace(/\/$/g, "");
		val = val.split("/");
		val.splice(0, 1);
		var page = val.splice(0, 1)[0];
		if (val[0] == "")
			val[0] = undefined
		changepage(page, val)
		for (i in onurls) {
			onurls[i](page, val);
		}
	});

	function changepage(page = "mall") {
		$(".page").class("block", "")
		$("." + page).class("block")
		$(".menus > div").class("active", "")
		$(".icon_" + page).class("active")
	}
	window.navigation = function (page, value = "") {
		if (onblank.length != 0) {
			onblank[onblank.length - 1](1);
			onblank.splice(onblank.length - 1, 1);
			balnkurl.splice(balnkurl.length - 1, 1);
		}
		v = [];
		if (value != "") {
			v = value.split("/");
			value = "/" + value
		}
		history.pushState("", "", page + value);
		changepage(page)
		for (i in onurls) {
			onurls[i](page, v);
		}
	}
	window.blank = function (f) {
		onblank.push(f);
		balnkurl.push(window.location.pathname);
	}
	window.closeBlank = function () {
		if (onblank.length != 0) {
			onblank.splice(onblank.length - 1, 1);
			balnkurl.splice(balnkurl.length - 1, 1);
		}
	}
	window.back = function () {
		window.history.back();
	}

	// ===================================  messeage and dialog script
	var df;
	var isopen = false;
	var o, am, ad;
	var mestime;
	window.mess = function (e, icon = "info") {
		clearTimeout(mestime);
		o.class("offscreenm");
		am.innerHTML = ""
		am.append('<span class="alignh">' + e + '</span>');
		am.append('<div style="-webkit-mask-image:url(img/' + icon + '.svg);"></div>');
		am.class("flex");
		am.style.bottom = "0px";
		mestime = setTimeout(messClose, 1500 + (e.length * 60));
	}

	function messClose() {
		mestime = undefined;
		am.style.bottom = "-" + am.offsetHeight + "px";
		setTimeout(function () {
			am.innerHTML = ""
			am.class("flex", "");
			o.class("offscreenm", "");
		}, 400);
	}
	window.dialog = function (e, f, d = true) {
		if (isopen) {
			setTimeout(function () {
				dialog(e, f, d);
			}, 200);
			return;
		}
		if (typeof mestime != "undefined") {
			clearTimeout(mestime);
			messClose();
		}
		df = f;
		isopen = true;
		o.class("offscreend");
		ad.style.bottom = "-" + o.offsetHeight + "px";
		ad.innerHTML = e
		setTimeout(function () {
			ad.style.bottom = "0px";
			o.style.backgroundColor = "#4445";
		}, 10);
		if (d) {
			o.onclick = function (e) {
				if (o.isEqualNode(e.target)) {
					dic()
					closeBlank();
				}
			}
			blank(function (s) {
				if (!s) {
					dic()
					closeBlank();
				}
			});
		}
	}
	window.dialogClose = function (...ag) {
		if (typeof df != "undefined") {
			var canclose = df(...ag);
			if (typeof canclose == 'undefined')
				canclose = true;
		} else
			canclose = true;
		if (canclose) {
			history.back();
		}
	}

	function dic() {
		ad.class("cdialoga", "");
		o.style.backgroundColor = "#0000"
		ad.style.bottom = "-" + ad.offsetHeight + "px";
		setTimeout(function () {
			if (isopen) {
				o.class("offscreend", "");
				ad.innerHTML = "";
				isopen = false;
			}
		}, 160);
	}

	// =================================== virtual key board
	var winh;
	var winw;
	var vkio;
	window.keyboardsize = cookie("keyboardsize");
	if (keyboardsize == undefined) {
		keyboardsize = "50vh";
	}
	onvirtuals = [];
	window.onvirtual = function (f) {
		onvirtuals.push(f);
	}
	window.on("resize", function () {
		if (winh > window.innerHeight) {
			if (!vkio) {
				if ((document.activeElement.tagName == "INPUT" ||
						(document.activeElement.tagName == "DIV" && document.activeElement.contentEditable == "true")) &&
					winw == window.innerWidth) {
					vkio = true;
					$("body").class("vkactive");
					$("body").class("vkdeactive", "");
					if (keyboardsize != window.innerHeight && keyboardsize != (winh - window.innerHeight)) {
						keyboardsize = (winh - window.innerHeight) + "px";
						cookie("keyboardsize", keyboardsize);
					}
					for (i in onvirtuals)
						onvirtuals[i](vkio, keyboardsize);
				}
			}
		} else if (vkio) {
			vkio = false;
			$("body").class("vkdeactive");
			$("body").class("vkactive", "");
			for (i in onvirtuals)
				onvirtuals[i](vkio, keyboardsize);
		}
	});



	// =================================== log


	var onlogs = [];
	window.onlog = function (f) {
		onlogs.push(f);
	};
	window.trylog = function (e, f) {
		wss(e, function (r) {
			if ((e.q == 1 && r.o == 1) || (e.q == 2 && r.o == 1)) {
				cookie("AGSE", r["s"]);
				cookie("AGUI", r["e"]);
				calllog(r)
			} else if (e.q == 4 && r.o == 2) {
				cookie("AGSE", "");
				cookie("AGUI", "");
				calllog(r)
			}
			f(r);
		});
	};

	function calllog(...a) {
		for (var i in onlogs)
			onlogs[i](...a);
	}

	// =================================== websocket
	var isfirest = false;
	var reqid = 1;
	var reqs = {};
	var resw = [];
	var rqh = [];
	var websocket;
	var isload = false;
	wsreconnect();

	function readreq() {
		var reqid = 1
		for (i in rqh) {
			window.wss(rqh[i][0], rqh[i][1], false);
		}
		rqh = [];
	}

	function wsreconnect() {
		isfirest = true
		websocket = new WebSocket('ws' + location.protocol.substr(4) + '//' + window.location.host);
		websocket.onopen = function (ev) {
			isfirest = false
			if (isload) {
				var ss = cookie("AGSE");
				var ui = cookie("AGUI");
				if (ss != undefined && ui != undefined) {
					wss({
						q: 3,
						s: ss,
						e: ui
					}, function (res) {
						if (res["o"] == 3)
							cookie("AGSE", res["s"]);
						readreq()
					});
				} else
					readreq()
			} else
				readreq()
		};
		websocket.onclose = function (ev) {
			if (navigator.onLine) {
				setTimeout(function () {
					isload = true
					wsreconnect();
				}, isfirest ? 25000 : 5000);
			}
		};
		websocket.onmessage = function (ev) {
			e = JSON.parse(esht(ev.data));
			if ("rq" in e) {
				id = e.rq
				delete e["rq"];
				reqs[id](e);
				delete reqs[id];
			} else {
				for (var i in resw) {
					resw[i](e);
				}
			}
		};
		websocket.addEventListener('onerror', function (e) {
			e.preventDefault();
			console.error(e);
		})
	}
	window.on('online', function () {
		var rds = websocket.readyState;
		if (rds != 1 && rds != 0) {
			wsreconnect();
		}
	});
	window.wsr = function (f) {
		resw.push(f);
	}
	window.wss = function (e, f, r = true) {
		var rds = websocket.readyState;
		if (rds == 1) {
			e.rq = reqid
			reqs[reqid] = f;
			websocket.send(JSON.stringify(e));
			++reqid;
		} else if (navigator.onLine && rds != 0) {
			wsreconnect();
			rqh.push([e, f]);
		} else {
			if (r) {
				mess(language.notnet, "sad");
			} else {
				rqh.push([e, f]);
			}
		}
	}
	// =================================== map
	window.mapload = function (f, a) {
		if (typeof mapboxgl == "undefined") {
			var imported = document.createElement('script');
			imported.src = 'js/map.js';
			imported.onload = function () {
				mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';
				f(a);
			};
			document.head.appendChild(imported);
		} else {
			f(a);
		}
	}

	// =================================== tabs

	window.tabchange = function () {
		if (event.target.cls("tabi")) {
			tabs(event.target)
		}
	}
	window.tabs = function (s) {
		var e = s.index()
		var ciot = s.parentNode;
		var last = ciot.child(".taba")
		var le = last.index()
		last.class("taba", "")
		var tbls = ciot.nextElementSibling.nextElementSibling;
		var tab = tbls.children[le];
		ciot.nextElementSibling.children[0].style.left = (e * 100 / ciot.children.length) + "%";
		tab.style.display = "none"
		tab = tbls.children[e];
		tab.style.transition = "none"
		if (le > e)
			tab.style.left = "-100%";
		else
			tab.style.left = "100%";
		tab.style.display = "block"
		tab.style.transition = "all 200ms";
		setTimeout(function () {
			tab.style.left = "0%";
			s.class("taba");
		}, 50);
	}
	// =================================== catorys
	var maincel
	var maincat
	var selectcat
	var haveb = false;
	var rp = [];
	window.createcat = function (id, sf) {
		maincel = $(id);
		maincel.innerHTML = '<div class="row pw"><div class="icon catbackbtn" onclick="back()"></div><div class="fillf"><input class="search isicsearch fillw" placeholder="' + language.catorisic + '" required="required"><span class="sclear"></span></div></div><div id="catmain"></div>'
		maincat = maincel.child("#catmain");
		selectcat = sf
		ocat("");
		maincel.child(".sclear").on("click", function () {
			this.previousElementSibling.value = "";
			ocat(rp.join(","), false);
		})
		maincel.child(".isicsearch").on("input", function () {
			that = this.value
			nam = isNaN(Number(that[0]))
			if (that == "") {
				ocat(rp.join(","), false);
			} else if (nam) {
				if (rp.length != 0) {
					var ido = eval("catjson[" + rp.join("]['c'][") + "]");
					var idmin = ido["c"][0].i
					var idmax = ido["c"][ido["c"].length - 1].i
				} else {
					var idmin = 0
					var idmax = catjson[catjson.length - 1].i
				}
				var all = "";
				for (var i in catname) {
					if (catname[i].includes(that) && i >= idmin && i <= idmax && typeof catisic[i] != "undefined") {
						all += '<div class="item' + "" + '" onclick="chosecat(' + i + ')"><div class="c_con ct_' + i +
							'"></div><div>' + catname[i] + '</div></div>'
					}
				}
				maincat.innerHTML = all;
			} else {
				var all = "";
				for (var i in catisic) {
					if (catisic[i].includes(that)) {
						all += '<div class="item' + "" + '" onclick="chosecat(' + i + ')"><div class="c_con ct_' + i +
							'"></div><div>' + catname[i] + '</div></div>'
					}
				}
				maincat.innerHTML = all;
			}
		})
	}
	window.chosecat = function (catn) {
		if (typeof catn != "number") {
			var rps = catn.split(",");
			catn = eval("catjson[" + rps.join("]['c'][") + "]")["i"];
		}
		if (selectcat(catn)) {
			rp = []
			if (haveb) {
				haveb = false;
				closeBlank()
				back()
			}
		}
	}
	window.ocat = function (id, isb = true) {
		if (id != "") {
			rp = id.split(",");
			catn = eval("catjson[" + rp.join("]['c'][") + "]");
			cat = catn.c
			if (isb && rp.length == 1) {
				haveb = true
				blank(function (e) {
					if (maincel.child(".isicsearch").value != "") {
						maincel.child(".isicsearch").value = ""
					}
					if (!e) {
						rp.splice(-1, 1)
						ocat(rp.join(","), false);
					} else {
						ocat("");
					}
				});
			}
			id = id + ','
		} else {
			cat = catjson;
			if (haveb) {
				rp = []
				haveb = false
				closeBlank()
			}
		}
		maincat.innerHTML = ""
		single = ""
		all = ""
		for (var i = 0; i < cat.length; i++) {
			if (cat[i].c.length > 0)
				single = ' scat" onclick="ocat(\'' + id + i + '\')'
			else
				single = '"  onclick="chosecat(\'' + id + i + '\')'

			all += '<div class="item' + single + '"><div class="c_con ct_' + cat[i].i +
				'"></div><div>' + catname[cat[i].i] + '</div></div>'
		}
		maincat.innerHTML = all;
	}

	window.tabload = function (tabs) {
		if (tabs instanceof HTMLElement)
			tabs.nextElementSibling.children[0].style.width = (100 / tabs.children.length) + "%";
		else {
			for (let i = 0; i < tabs.length; i++) {
				tabs[i].nextElementSibling.children[0].style.width = (100 / tabs[i].children.length) + "%";
			}
		}
	}
	window.maxlenght = function (e, m) {
		e.on("keypress", function () {
			if (this.innerText.length >= m)
				e.preventDefault();
		}).on("input", function () {
			if (this.innerText.length > m) {
				this.innerText = this.innerText.substring(0, m);
			}
		});
	}
	window.ratingc = function (rate) {
		rate = +rate
		if (rate < 2)
			color = "ra1"
		else if (rate < 4)
			color = "ra2"
		else if (rate < 5)
			color = "ra3"
		else if (rate < 6)
			color = "ra4"
		else if (rate < 7)
			color = "ra5"
		else if (rate < 8)
			color = "ra6"
		else if (rate <= 10)
			color = "ra7"
		return [color, ((138.23 * (10 - rate)) / 10)]

	}
	window.numfix = function (e) {
		var s = ""
		var n = 0
		if (e > 1e9) {
			s = "G"
			n = 1e9
		} else if (e > 1e6) {
			s = "M"
			n = 1e6
		} else if (e > 1e3) {
			s = "K"
			n = 1e3
		} else
			return e
		e /= n
		if (e < 10)
			return (+e.toFixed(1)) + s
		else
			return Math.round(e) + s
	}
	window.morestr = function (s, l) {
		if (s.length > l)
			return s.substr(0, l) + "..."
		else
			return s.substr(0, l)
	}
	window.dialogMess = function (t, f) {
		dialog('<div class="dir"><div class="fl">' + t + '</div><div class="fb" onclick="dialogClose(1);">' + language.accept + '</div><div class="fb" onclick="back()">' + language.cancel + '</div></div>', f)
	}
	window.dialogIcon = function (s, f) {
		var o = ""
		for (var i in s)
			o += '<div class="item" onclick="dialogClose(\'' + i + '\')"><div class="icon"  style="-webkit-mask-image:url(img/' + s[i][0] + '.svg);"></div><div>' + s[i][1] + '</div></div>'
		dialog('<div class="dir">' + o + '</div>', f)
	}
	window.untilscrool = function (main, call) {
		var hold = 0
		var el;
		var height
		var size
		var gets
		main.on("scroll", function () {
			height = this.offsetHeight;
			gets = Math.ceil((height + this.scrollTop) / size)
			gets = gets * Math.round(main.offsetWidth / main.children[0].offsetWidth) - 1
			if (hold < gets) {
				var len = main.children.length - 1
				gets = Math.min(gets, len)
				if (hold < gets) {
					if (hold + 1 == gets) {
						el = main.children[gets].children[0]
						el.style.backgroundImage = "url(" + el.attributes.url.value + ")"
						delete el.attributes.url
					} else {
						for (let i = hold; i <= gets; i++) {
							el = main.children[i].children[0]
							el.style.backgroundImage = "url(" + el.attributes.url.value + ")"
							delete el.attributes.url
						}
					}
					if (len == gets) {
						call()
					}
					hold = gets
				}
			}
		});

		function ref() {
			height = main.offsetHeight;
			size = main.children[0].offsetHeight;
			gets = Math.ceil(height / size)
			gets *= Math.round(main.offsetWidth / main.children[0].offsetWidth)
			gets = Math.min(gets, main.children.length)
			hold = gets - 1
			for (let i = 0; i < gets; i++) {
				el = main.children[i].children[0]
				if (typeof el.attributes.url != "undefined") {
					el.style.backgroundImage = "url(" + el.attributes.url.value + ")"
					delete el.attributes.url
				}
			}
		}
		return ref;
	}
	// =================================== notif
	window.notif = function (t, b, i, f) {
		if ("Notification" in window) {
			if (Notification.permission == "granted") {
				new Notification(t, {
					body: b,
					icon: i
				}).onclick = f;
			}
		}
	}
	window.notifAccess = function () {
		if ("Notification" in window && Notification.permission != "denied")
			Notification.requestPermission();
	}
	window.imageshower = function (imgs, option, call, ind) {
		blank(function () {
			ShowimgClose();
		})
		Showimg({
			imgs: imgs,
			onclose: closeBlank,
			option: option,
			onoption: call,
			index: ind
		});
	}
	window.downloadimg = function (url) {
		var a = document.createElement('a');
		a.href = url;
		a.download = url.replace(/^.*[\\\/]/, '');
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	// =================================== escape HTML
	function esht(html) {
		return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function unesht(html) {
		return html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
	}

	function split(s, m) {
		if (s == '')
			return [];
		return s.split(m)
	}
	//=================================================== pagees ======================================================
	ready(function () {
		// =================================== window load
		o = $(".offscreen");
		am = $(".cmess");
		ad = $(".cdialog");
		// login
		var ss = cookie("AGSE");
		var ui = cookie("AGUI");
		if (ss != undefined && ui != undefined) {
			var sended = setTimeout(function () {
				calllog({
					"o": 0
				});
				firstpage()
			}, 5000);
			wss({
				q: 3,
				s: ss,
				e: ui
			}, function (res) {
				clearTimeout(sended);
				if (res["o"] == 3)
					cookie("AGSE", res["s"]);
				else
					mess(language.logproblem, "sad");
				calllog(res);
				firstpage()
			}, false);
		} else {
			calllog({
				"o": 0
			})
			firstpage()
		}
		// pageing

		o = $(".offscreen");
		am = $(".cmess");
		ad = $(".cdialog");

		winh = window.innerHeight;
		winw = window.innerWidth;
		// tablines
		tabload($(".tabs"))
		// search clear 

		$(".sclear").on("click", function () {
			this.previousElementSibling.value = "";
		})
		if (!performance.navigation.type)
			history.pushState(0, "", window.location.pathname);

		if (window.matchMedia("(pointer: coarse)").matches) {
			$("body").class("vkdeactive");
		}
	});
}();