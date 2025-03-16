// Al cargar el DOM
$(document).ready(function(){
  // Inicializa Owl Carousel para testimonios
  $('.testimonials-carousel').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    dots: true,
    nav: false
  });

  // Inicializa Owl Carousel para team
  $('.team-carousel').owlCarousel({
    items: 3,
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    dots: true,
    nav: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 }
    }
  });

  // Portfolio filter
  $('.portfolio-filter li a').on('click', function(e){
    e.preventDefault();
    let filter = $(this).attr('data-filter');

    // Cambia la clase 'active'
    $('.portfolio-filter li').removeClass('active');
    $(this).parent().addClass('active');

    if(filter === 'all'){
      $('.portfolio-item').show('300');
    } else {
      $('.portfolio-item').not('[data-category="'+filter+'"]').hide('300');
      $('.portfolio-item').filter('[data-category="'+filter+'"]').show('300');
    }
  });
});
