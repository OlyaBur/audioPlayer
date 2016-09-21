(function ($) {
    var defaults = {
        volume: 1,
        backImg: 'img/background.jpg'

    },
        options, player, currentLI, image;

    var methods = {
        init: function (params) {
            options = $.extend({}, defaults, params);
            return this.each(function () {



                player = document.createElement("audio");
                $(player)
                    .on('ended', methods.next);
                image = $('<img>');

                var btnPrev = $('<a>').addClass('opl-prev').click(methods.prev);
                var btnNext = $('<a>').addClass('opl-next').click(methods.next);
                var btnPlay = $('<a>').addClass('opl-play').click(methods.play);
                var wrapper = $('<div></div>').addClass('opl-box');
                var panel_header = $('<div></div>').addClass('opl-header');
                var panel_controls = $('<div></div>').addClass('opl-controls');
                var panel_playlist = $('<div></div>').addClass('opl-playlist');

                panel_header.append(image);
                panel_controls.append(player).append(btnPrev).append(btnPlay).append(btnNext);
                $(this).wrap(wrapper).wrap(panel_playlist);
                wrapper = $(this).parent().parent(); // DOM changed, refresh wrapper reference
                wrapper.prepend(panel_controls);
                wrapper.prepend(panel_header);


                currentLI = $(this).find('li.active');

                $(this).find('li a').click(function (e) {
                    e.preventDefault();
                    methods.play($(this).parent());
                });

                methods.setVolume(options.volume);
                methods.setBackground(options.backImg);
                methods.play(currentLI);
            });
        },
        next: function () {
            var nextLI = currentLI.next('li');
            if (!nextLI.length) {
                nextLI = currentLI.parent().children('li').first();
            }
            methods.play(nextLI);

        },
        prev: function () {
            var prevLI = currentLI.prev('li');
            if (!prevLI.length) {
                prevLI = currentLI.parent().children('li').last();
            }
            methods.play(prevLI);
        },
        play: function (li) {

            if (player.paused) {
                player.play();
                $('.opl-play').addClass('visible');
                $('.opl-play').removeClass('unvisible');
                currentLI.removeClass('active');
                currentLI = li;
                currentLI.addClass('active');
                player.src = currentLI.children('a').attr('href');

            } else {
                player.pause();
                $('.opl-play').addClass('unvisible');
                //currentLI.removeClass('active');

                currentLI = li;
                currentLI.addClass('active');
                player.src = currentLI.children('a').attr('href');

            }
            currentLI.removeClass('active');
            currentLI = li;
            currentLI.addClass('active');
            player.src = currentLI.children('a').attr('href');



        },
        setVolume: function (volume) {
            player.volume = volume;
        },
        getVolume: function () {
            return player.volume;
        },
        setBackground: function (backImg) {
            image.attr('src', backImg);
        }
    }

    $.fn.opl = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' not exists for jQuery.opl');
        }
    }
})(jQuery);