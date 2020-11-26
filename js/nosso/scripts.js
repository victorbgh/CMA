(function($) {

    $('#sub-menu').on('change', function () {
        var url = $(this).val();
        if (url) {
            window.location = url;
        }
        return false;
    });

	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});

	
	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 20) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });

    /* Counter - CountTo */
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					//alert('finished');
					}
				});
			});
			a = 1;
			}
		}
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });

    $(".cmEnviarEmail").on("click", function(event) {
        var nome = $("#nome").val();
        var email = $("#email").val();
        var mensagem = $("#mensagem").val();
        if(verificarCamposEmail(nome, email, mensagem)){
            $.ajax({
                method: "POST",
                url: '../php/form-contato',
                data : {
                    nome: nome,
                    email: email,
                    mensagem: mensagem
                },
                beforeSend: function(){
                    $('.spinner-wrapper-custom').removeClass('display-none');
                    $('.spinner-wrapper-custom').addClass('display-block');
                },
                complete: function(){
                    $('.spinner-wrapper-custom').removeClass('display-block');
                    $('.spinner-wrapper-custom').addClass('display-none');

                    // setTimeout(function(){ 
                         
                    // }, 3000);
                },
                success: function(text) {
                    if (text == "success") {
                        cformSuccessAtuacoes();
                    } else {
                        cformErrorAtuacoes();
                        csubmitMSGatuacoes(false, text);
                    }
                }
            });
        }
    });



    /* Contact Form */
    $("#contactForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            cformError();
            csubmitMSG(false, "Por favor, preencha todos os campos!");
        } else {
            // everything looks good!
            event.preventDefault();
            csubmitForm();
        }
    });

    function csubmitForm() {
		var nome = $("#nome").val();
		var email = $("#email").val();
        var mensagem = $("#mensagem").val();

        $.ajax({
            method: "POST",
            url: 'php/form-contato',
            data : {
                nome: nome,
                email: email,
                mensagem: mensagem
            },
            success: function(text) {
                if (text == "success") {
                    cformSuccess();
                } else {
                    cformError();
                    csubmitMSG(false, text);
                }
            },
            beforeSend: function(){
                $('.spinner-wrapper-custom').removeClass('display-none');
                $('.spinner-wrapper-custom').addClass('display-block');
            },
            complete: function(){
                $('.spinner-wrapper-custom').removeClass('display-block');
                $('.spinner-wrapper-custom').addClass('display-none');

                // setTimeout(function(){ 
                     
                // }, 3000);
            },
        });
	}

    function cformSuccess() {
        $("#contactForm")[0].reset();
        csubmitMSG(true, "Mensagem enviada com sucesso!");
        $("input").removeClass('notEmpty');
        $("textarea").removeClass('notEmpty'); 
    }


    function cformError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function csubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated greenColor";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Privacy Form */
    $("#privacyForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            pformError();
            psubmitMSG(false, "Por favor, preencha todos os campos!");
        } else {
            // everything looks good!
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        // initiate variables with form content
		var name = $("#name").val();
		var email = $("#email").val();
        var select = $("#message").val();

        
        $.ajax({
            type: "POST",
            url: "php/email.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
	}

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty');
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Voltar para o topo</a>');
    var amountScrolled = 500;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);

function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('fas fa-plus fas fa-minus');
}



$(document).ready(function(){

    var hash = window.location.href;

    if (window.location.hash.indexOf('openCollapse') != -1) {
        var urlCollapse = window.location.hash.split('#');
        var urlSplit = urlCollapse[2].split('?');

        $('html, body').animate({
            scrollTop: $(`#${urlCollapse[1]}`).offset().top
        }, 600);

        $(`#${urlSplit[0]}`).collapse('toggle');

    }

    if(window.location.hash) {
        history.replaceState(null, null, ' ');
      }
    

    $(".owl-carousel").owlCarousel({
        items:1,
        autoplay:true,
        margin:30,
        loop:true,
        center: true,
        dots:true,
        nav:false,
        autoplayTimeout: 15500,
        // autoHeight:true
      //  navText:["<i class='fas fa-long-arrow-alt-left'></i>","<i class='fas fa-long-arrow-alt-right'></i>" ]
    });

    $('#download').click(function(){
        $.ajax({
          url: 'ajaxfile.php',
          type: 'post',
          success: function(response){
            window.location = response;
          }
        });
      });


});

function openPage(pageName) {
    if (pageName === "artigos") {
        window.location.assign("artigos.php");
    }else if (pageName === 'contato'){
        window.location.assign("contato.html");
    }
}

function openCollapse(idCollapse, headind) {
    window.location.assign(`areas-de-atuacao.html#${headind}#${idCollapse}?openCollapse`);
}

function verificarCamposEmail(nome, email, assunto){
    if(nome == "" || nome == undefined){
        cformErrorAtuacoes();
        csubmitMSGatuacoes(false, "Por favor, preencha todos os campos!");
        return false;
    }else if(email == "" || email == undefined){
        cformErrorAtuacoes();
        csubmitMSGatuacoes(false, "Por favor, preencha todos os campos!");
        return false;
    }else if(assunto == "" || assunto == undefined){
        cformErrorAtuacoes();
        csubmitMSGatuacoes(false, "Por favor, preencha todos os campos!");
        return false;
    }
    return true;
}

function cformSuccessAtuacoes() {
    $("#contactForm-atuacao")[0].reset();
    csubmitMSGatuacoes(true, "Mensagem enviada com sucesso!");
    $("input").removeClass('notEmpty');
    $("textarea").removeClass('notEmpty'); 
}


function cformErrorAtuacoes() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass();
    });
}

function csubmitMSGatuacoes(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated greenColor";
    } else {
        var msgClasses = "h3 text-center";
    }
    $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
}


