ready(function () {
    var curid = 1;
    var mess = [{
        ID: 1567109497350,
        UI: 2,
        CH: 1,
        ME: 'اندازه گیری توسط کارگاه ام دی ا',
        SI: '',
    }, {
        ID: 1567109497350,
        UI: 2,
        CH: 1,
        ME: 'اندازه گیری توسط کارگاه ام دی ا',
        SI: '',
    }, {
        ID: 1567109497350,
        UI: 2,
        CH: 1,
        ME: 'اندازه گیری توسط کارگاه ام دی ا',
        SI: '',
    }, {
        ID: 1577109497350,
        UI: 2,
        CH: 1,
        ME: 'اندازه گیری توسط کارگاه ام دی ا',
        SI: '',
    }, {
        ID: 1557109497350,
        UI: 2,
        CH: 1,
        ME: 'اندازه گیری توسط کارگاه ام دی ا',
        SI: '20 KB',
    }, {
        ID: 1557109497350,
        UI: 2,
        CH: 1,
        ME: 'اندازه گیری توسط کارگاه ام دی ا',
        SI: '30 KB',
    }, ]
    for (var i in mess) {
        addmess(mess[i], (i == 0 ? undefined : mess[i - 1].ID))
    }

    function addmess(i, ld) {
        if (typeof ld != 'undefined') {
            console.log(ld, i.ID)
            adddate(ld, i.ID)
        }
        var time = new Date(i.ID);
        time = time.getHours() + ':' + time.getMinutes()
        if (i.SI == '') {
            $('.chatpage').append('end', '<div><div class="mess"><div>' + i.ME + '</div><div class="time">' + time + '</div></div></div>')
        } else {
            $('.chatpage').append('end', '<div><div class="mefi"><div class="fillf"><div class="filetit">' + i.ME + '</div><div class="filesize">' + i.SI + '</div><div class="time">' + time + '</div></div><div class="mefiimg"></div></div></div>')
        }
    }

    function adddate(ld, cd) {
        var cdh = new Date(cd);
        var ldh = new Date(ld);
        var date = cdh.toLocaleDateString('fa')
        cdh = (cdh.getHours() * 3600) + (cdh.getMinutes() * 60) + cdh.getSeconds();
        ldh = (ldh.getHours() * 3600) + (ldh.getMinutes() * 60) + ldh.getSeconds();
        if ((cd - ld >= 86400000) || cdh < ldh)
            $('.chatpage').append('end', '<div class="alignc"><div class="date">' + date + '</div></div>')
    }
    new Date().toLocaleDateString('fa')
    var st = [
        'ثبت مشخصات',
        'اندازه گیری توسط کارگاه ام دی اف',
        'ارجاع عکس و فیلم به محل طراحی',
        'پایان طراحی',
        'محاسبه توسط طراح',
        'تایید فاکتور در کارگاه',
        'تایید نهایی فاکتور',
        'عقد قرارداد',
        'تسویه حساب',
        'شروع کار کارگاه',
        'تهیه متریال',
        'شروع محاسبات و برش',
        'مونتاژ',
        'ارسال به محل',
        'درحال نصب',
        'تایید مشتری',
        'تسویه نهایی'
    ]

    window.ratingc = function (rate) {
        if (rate < 20)
            color = "ra1"
        else if (rate < 40)
            color = "ra2"
        else if (rate < 50)
            color = "ra3"
        else if (rate < 60)
            color = "ra4"
        else if (rate < 70)
            color = "ra5"
        else if (rate < 80)
            color = "ra6"
        else if (rate <= 100)
            color = "ra7"
        return [color, ((138.23 * (100 - rate)) / 100)]

    }

    setTimeout(function () {
        //$(".mlpscir").style.strokeDashoffset = rate[1]
    }, 40)
    var s = [{
        NM: 'محمدی',
        ST: 11,
        PR: 50,
        TI: '1392/1/2',
        LU: '1390/1/3',
    }, {
        NM: 'محمدی',
        ST: 5,
        PR: 90,
        TI: '1392/1/2',
        LU: '1390/1/3',
    }, {
        NM: 'محمدی',
        ST: 1,
        PR: 20,
        TI: '1392/1/2',
        LU: '1390/1/3',
    }]
    var out = '<tr><th>اخرین بروزرسانی</th><th>ثبت تاریخ</th><th>پیشرفت</th><th>وضعیت</th><th>نام</th></tr>'
    for (var i of s) {
        var prg = Math.round(i.ST / 17 * 100)
        var rt = ratingc(prg)
        out += '<tr><td>' + i.LU + '</td><td>' + i.TI + '</td><td><div class="ratingbox ' + rt[0] + '"><div class="ratint">' + prg + '%</div><svg width="48" height="48"><circle class="_circle" r="22" cx="24" cy="24" style="stroke-dashoffset:' + rt[1] + '"></circle></svg></div></td><td>' + st[i.ST] + '</td><td>' + i.NM + '</td></tr>'
    }
    document.querySelector('.table').innerHTML = out

    out = ''
    // document.querySelector('.tabledit').innerHTML = out
});