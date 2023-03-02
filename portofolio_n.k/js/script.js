// 横スクロールをマウスホイールでできる設定
$(function () {
    var scrollElm = $('.scrollPanel'),
        wheelLength = 600;

    scrollElm.each(function () {
        var self = $(this),
            areaWidth = self.width();

        if (areaWidth > $('body').width()) {
            $('body').css({ width: areaWidth });
        }

        $(window).on('load resize', function () {
            $('body').css({ height: window.innerHeight });
            self.css({ height: window.innerHeight });
        }).on('scroll', function () {
            var scrX = $(window).scrollLeft(),
                posLeft = Math.floor((self.width() - window.innerWidth) * (scrX / ($('body').width() - window.innerWidth)) * -1);
            self.css({ left: posLeft });
        });

        // MouseWheelEvent
        var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        $(document).on(mousewheelevent, function (e) {

            if (e.originalEvent.deltaY > 0) {
                scrLeft = $(window).scrollLeft() + wheelLength;
            } else {
                scrLeft = $(window).scrollLeft() - wheelLength;
            }

            $(window).scrollLeft(scrLeft);
        });
    });
    //ナビゲーションをクリックした際のスムーススクロール
    $('#g_nav a').click(function () {
        var elmHash = $(this).attr('href'); //hrefの内容を取得
        var headerH = $("#header").outerHeight(true);//追従するheader分の高さ（70px）を引く
        var pos = Math.round($(elmHash).offset().left - headerH); //headerの高さを引き小数点を四捨五入
        $('body,html').animate({ scrollLeft: pos }, 500);//取得した位置にスクロール※数値が大きいほどゆっくりスクロール
        return false;//リンクの無効化
    });

    // 画面をスクロールをしたら動かしたい場合の記述
    $(window).scroll(function () {
        PositionCheck();/* 現在地を取得する関数を呼ぶ*/
        ScrollAnime();/* ナビゲーションに現在地のクラスをつけるための関数を呼ぶ*/
    });

    // ページが読み込まれたらすぐに動かしたい場合の記述
    $(window).on('load', function () {
        PositionCheck();/* 現在地を取得する関数を呼ぶ*/
        ScrollAnime();/* ナビゲーションに現在地のクラスをつけるための関数を呼ぶ*/
    });

    $(window).resize(function () {
        //リサイズされたときの処理
        PositionCheck()
    });


    // ハンバーガーメニュー
    $('.mask2,.mask2 span').on('click', function () {
        $('.mask2').toggleClass('open');
    });
    $(document).ready(function () {
        var active1 = false;
        var active2 = false;
        var active3 = false;
        var active4 = false;
        $('.parent2').on('mousedown touchstart', function () {
            if (!active1) $(this).find('.test1').css({ 'transform': 'translate(0px,-125px)', 'opacity': '1' });
            else $(this).find('.test1').css({ 'transform': 'none', 'opacity': '0' });
            if (!active2) $(this).find('.test2').css({ 'transform': 'translate(60px,-105px)', 'opacity': '1' });
            else $(this).find('.test2').css({ 'background-color': '', 'transform': 'none', 'opacity': '0' });
            if (!active3) $(this).find('.test3').css({ 'transform': 'translate(105px,-60px)', 'opacity': '1' });
            else $(this).find('.test3').css({ 'transform': 'none', 'opacity': '0' });
            if (!active4) $(this).find('.test4').css({ 'transform': 'translate(125px,0px)', 'opacity': '1' });
            else $(this).find('.test4').css({ 'transform': 'none', 'opacity': '0' });
            active1 = !active1;
            active2 = !active2;
            active3 = !active3;
            active4 = !active4;
        });
    });

    // カーソルの先端丸
    $(function () {
        //カーソル要素の指定
        var cursor = $("#cursor");
        //mousemoveイベントでカーソル要素を移動させる
        $(document).on("mousemove", function (e) {
            //カーソルの座標位置を取得
            var x = e.clientX;
            var y = e.clientY;
            //カーソル要素のcssを書き換える用
            cursor.css({
                "opacity": "1",
                "top": y + "px",
                "left": x + "px"
            });
        });
        //aタグホバー
        $("a").on({
            "mouseenter": function () {
                //activeクラス付与
                cursor.addClass("active");
                stalker.addClass("active");
            },
            "mouseleave": function () {
                cursor.removeClass("active");
                stalker.removeClass("active");
            }
        });

        // 目標回転
        const before = $('.text');
        const text = before.text();
        const textArray = text.split('');

        let after = '';
        $.each(textArray, function (index, val) {
            after += "<span>" + val + "</span>";
        });
        before.html(after);

        const textcnt = textArray.length;
        const circleR = ($('.circle').height()) / 2;
        const fontH = ($('.inner').height());
        const dist = circleR - fontH;

        $('.text span').each(function (index) {
            const num = index + 1;
            const radX = Math.sin(360 / textcnt * num * (Math.PI / 180));
            const radY = Math.sin((90 - (360 / textcnt * num)) * (Math.PI / 180));
            $(this).css('transform', 'translate(' + dist * radX + 'px, ' + -(dist * radY) + 'px) rotate(' + 360 / textcnt * num + 'deg)');
        });
    });
});