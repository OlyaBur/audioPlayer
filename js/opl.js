(function ($) {
    var defaults = {
        volume: 1,
        backImg: 'img/background.jpg'
    },
        options, aplayer, currentLI, image;

    var methods = {
        init: function (params) {
            options = $.extend({}, defaults, params);
            return this.each(function () {

                aplayer = document.createElement("audio");
                $(aplayer)
                    .attr('controls', 'controls')
                    .on('ended', methods.next);
                image = $('<img>');

                var btnPrev = $('<a>').addClass('opl-prev').click(methods.prev);
                var btnNext = $('<a>').addClass('opl-next').click(methods.next);
                var wrapper = $('<div></div>').addClass('opl-box');
                var panel_header = $('<div></div>').addClass('opl-header');
                var panel_controls = $('<div></div>').addClass('opl-controls');
                var panel_playlist = $('<div></div>').addClass('opl-playlist');

                panel_header.append(image);
                panel_controls.append(aplayer).append(btnPrev).append(btnNext);
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
            currentLI.removeClass('active');
            currentLI = li;
            currentLI.addClass('active');
            aplayer.src = currentLI.children('a').attr('href');
            aplayer.play();

        },
        setVolume: function (volume) {
            aplayer.volume = volume;
        },
        getVolume: function () {
            return aplayer.volume;
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