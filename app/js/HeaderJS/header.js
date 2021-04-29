"use strict";
let  burger_box = document.querySelector(".burger_box")
	, navigation = document.querySelector(".navigation")
	, body = document.querySelector("body");
// burger menu
burger_box.onclick = function burger (){
		body.classList.toggle('fixed-page')
		burger_box.classList.toggle('active')
		navigation.classList.toggle('active')
};