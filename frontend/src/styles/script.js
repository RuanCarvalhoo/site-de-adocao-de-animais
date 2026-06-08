$(document).ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    $('#mobile_nav_list .nav-item a').on('click', function() {
        $('#mobile_menu').removeClass('active');
        $('#mobile_btn').find('i').removeClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function(){
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSecctionIndex = 0;

        if (scrollPosition <= 0){
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '0px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        sections.each(function(i){
            const section = $(this)
            const sectionTop = section.offset().top - 96
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom){
                activeSecctionIndex = i;
                return false;
            }
        })
        navItems.removeClass('active');
        $(navItems[activeSecctionIndex]).addClass('active');
    });

    $(document).on('click', '.pet-heart', function() {
        $(this).toggleClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    })

    ScrollReveal().reveal('.animal', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    })

    ScrollReveal().reveal('#testimonial_man', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 2000,
        distance: '20%'
    })
});