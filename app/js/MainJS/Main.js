"use strict"
//slider
new Swiper('.swiper-container', {
      loop: true,
      grabCursor:true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination:{
      	el:'.swiper-pagination',
      	clickable:true,
      },
      keyboard:{
        enabled:true,
        onlyInViewport:true,
        pageUpdown:true,
      },
      mousewheel:{
        sensitivity:1,
      }
    });
//scroll anim
      let isScrolling = false;
 
    window.addEventListener("scroll", throttleScroll, false);
 
    function throttleScroll(e) {
      if (isScrolling == false) {
        window.requestAnimationFrame(function() {
          scrolling(e);
          isScrolling = false;
        });
      }
      isScrolling = true;
    };
    document.addEventListener("DOMContentLoaded", scrolling, false);

//anim_item
    //isPartiallyVisible
    let sliderActive = document.querySelector(".wrapper_slider")
    	 ,block_info = document.querySelector(".info")
   	 ,begin_Ti = document.querySelector(".begin .title")
    	 ,begin_Te = document.querySelector(".begin .text")
    	 ,begin_B = document.querySelector(".begin .box_button")
    	 ,causes_text = document.querySelectorAll(".text_causes")
    	 ,causes_pic = document.querySelectorAll(".photo_causes")
    	 ,support = document.querySelector(".support");
    //isFullyVisible
    let Sleft = document.querySelectorAll(".stick_left");
    let Sright = document.querySelectorAll(".stick_right");
//anim active
    const LET_one_PV = [begin_Ti,begin_Te,begin_B,block_info,sliderActive,];
    function scrolling(e) {
       if (isFullyVisible(block_info)) {
          for(let i = 0; i < Sleft.length; i++){
            Sleft[i].classList.add("active")
            Sright[i].classList.add("active")
          }
      }else{
        for(let i = 0; i < Sleft.length; i++){
            Sleft[i].classList.remove("active")
            Sright[i].classList.remove("active")
        }
      };
      if(isPartiallyVisible(support)){
      	support.classList.add("active")
      };
      //add class all let
      for(let i = 0; i < LET_one_PV.length;i++){
        if(isPartiallyVisible(LET_one_PV[i])){
          LET_one_PV[i].classList.add("active")
        }
      };
      for(let i = 0; i < causes_pic.length;i++){
        let item_causes_pic = causes_pic[i];
        if(isPartiallyVisible(item_causes_pic)){
          item_causes_pic.classList.add("active")
        }
      };
      for(let i = 0; i < causes_text.length;i++){
        let item_causes_text = causes_text[i];
        if(isPartiallyVisible(item_causes_text)){
          item_causes_text.classList.add("active")
        }
      };
    };
//method
    function isPartiallyVisible(el) {
      let elementBoundary = el.getBoundingClientRect();
 
      let top = elementBoundary.top;
      let bottom = elementBoundary.bottom;
      let height = elementBoundary.height;
 
      return ((top + height >= 0) && (height + window.innerHeight >= bottom));
    };
 
    function isFullyVisible(el) {
      let elementBoundary = el.getBoundingClientRect();
 
      let top = elementBoundary.top;
      let bottom = elementBoundary.bottom;
 
      return ((top >= 0) && (bottom <= window.innerHeight));
    };
//Form
	//textarea and checkbox. Functionality for the appearance of the necessary placeholders
	let form_check = document.querySelectorAll(".checkbox")
		, form_TA = document.querySelector(".discription")
		, form = document.querySelector(".sup_form")
		, b = 0
		, minlenghtTA = document.querySelector("#score")
		, show_ML_TA = document.querySelector("#min-lenghtTA")
		, scoreTA = document.querySelector(".lenght_TA")
		, submit = document.querySelector(".sub_btn");
	form_TA.placeholder = "Выбирите тему(-ы).\nЕсли вы напишите текст и оставите его без темы на 2 минут он пропадёт";
	form_TA.disabled = true;
	submit.disabled = true;
	form.onchange = ()=>{
	for(let i = 0; i < form_check.length;i++){
		let check = form_check[i]
		if(check.checked == true){
			b++
			form_TA.placeholder = check.dataset.checkname + " ";
			show_ML_TA.textContent =check.dataset.minlenght;
		}else{
			b--
		}
	};
	if(b >= 0){
			form_TA.disabled = false;
	}else{
			form_TA.disabled = true;
			show_ML_TA.textContent = 0;
			if(form_TA.value.length > 0){
				setTimeout(()=>{form_TA.value = "";form_TA.placeholder = "Выбирите тему(-ы).Если вы напишите текст и оставите его без темы на 2 мин. он пропадёт";form_TA.disabled = true;minlenght.textContent = 0;},120000);
			}else{
				form_TA.placeholder = "Выбирите тему(-ы).\nЕсли вы напишите текст и оставите его без темы на 2 минут он пропадёт";
			}
	};
	if(b == 2){
		show_ML_TA.textContent = 50;
		form_TA.placeholder = "Напишите на какой странице нашли ошибку.Для удобства цитируйте предложение с ошибкой.\nКаккую статью хотите?"
	}
	//removw class score lenght if no check checkbox
	if(show_ML_TA.textContent != 0 && form_TA.value.length >= Number(show_ML_TA.textContent)){
		scoreTA.classList.add("valid")
	}else{
		scoreTA.classList.remove("valid")
	};
		//disable button submit if form not completely filled
	if(b >= 0 && inputN.value.length > 0 && inputE.value.length > 0 && scoreTA.classList.contains("valid")){
		submit.disabled = false;
		submit.classList.add("active")
	}else{
		submit.disabled = true;
		submit.classList.remove("active")
	};

	b=0;
};
//second check on input
form_TA.oninput = ()=>{
	minlenghtTA.textContent = form_TA.value.length;
	if(form_TA.value.length >= Number(show_ML_TA.textContent)){
		scoreTA.classList.add("valid")
	}else{
		scoreTA.classList.remove("valid")
	}
	// add class 
	if(b >= 0 && inputN.value.length > 0 && inputE.value.length > 0 && scoreTA.classList.contains("valid")){
		submit.disabled = false;
		submit.classList.add("active")
	}else{
		submit.disabled = true;
		submit.classList.remove("active")
	}
};
	//up "placeholder" for inputs name and email
	let inputN = document.querySelector(".input._name")
		 ,inputE = document.querySelector(".input._email")
		 ,input_boxN = document.querySelector(".input_box._name")
		 ,input_boxE = document.querySelector(".input_box._email");
		 //Name
		 input_boxN.addEventListener("click", ()=> inputN.focus());
		 inputN.addEventListener("focusin", ()=> input_boxN.classList.add('focus'))
		 inputN.addEventListener("focusout", () =>{
		 	if(inputN.value == ""){
		 		input_boxN.classList.remove('focus')
		 	}
		 });
		 //email
		input_boxE.addEventListener("click", ()=> inputE.focus());
		 inputE.addEventListener("focusin", ()=> input_boxE.classList.add('focus'))
		 inputE.addEventListener("focusout", () => {
		 	if(inputE.value == ""){
		 		input_boxE.classList.remove('focus')
		 	}
		 });