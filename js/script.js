var imgName = $_GET('img'),
	viewNav = $_GET('menu'),
	viewBlock = document.getElementById('wrapper-img'),
	img = document.createElement('img');

// Якщо в GET параметрі щось є то формуємо картинку 
if(imgName){

	// Провіряємо чи переданий параметр відображення меню
	if(viewNav) {
		
		navElement = document.getElementById(viewNav);

		if(navElement) {
			navElement.classList.add('show');

		// Ативовуємо пункт меню
		var buttonsList = navElement.getElementsByClassName('button'),
			linkHref,
			hrefImgName;

		for(var key in buttonsList) {

			if(buttonsList[key] instanceof Element ){

				if(buttonsList[key].classList.contains('active')){
					buttonsList[key].classList.remove('active');
				}

				// Витягуємо посилання з кнопки
				linkHref = buttonsList[key]['href'];
				var searchText      = 'index.html?';
				var countSearchText = searchText.length + 4; // Включно і img=
				var from            = linkHref.search(searchText) + countSearchText; 
				var to              = linkHref.length;
				newLinkHref         = linkHref.substring(from,to);
				cleanSrc = imgName.substr(0, imgName.search('=?menu') - 1);

				if(newLinkHref == cleanSrc)
					buttonsList[key].classList.add('active');

				buttonsList[key].setAttribute('href', '?img=' + newLinkHref + '?menu=' + viewNav);
			}
		}
	} else {
			alert('Такого меню не знайдено!');
		}
	}

	// Створюємо елемент картинки
	var srcImg = 'img/' + imgName;
	img.src = srcImg;
	img.className = 'hide';

	img.onload = function() {
		
		// Ховаємо поле форми
		var formCallImg = 'call-img-form';
		formCallImg = document.getElementsByClassName(formCallImg);
		formCallImg[0].classList.add("hide");

		viewBlock.appendChild(img);
		
		var imgHeight = img.height,
			imgWidth = img.width;

		viewBlock.style.height = imgHeight + 'px';
		viewBlock.style.backgroundImage = 'url("' + srcImg + '")';

	}

	img.onerror = function() {
		noImg(viewBlock, 'Картинку не знайдено!<span class="small-text-block">Шлях до картинки: ' + this.src + '</span>');
	};

} else{

	// Виводимо тестову картику, якщо параметри шьп не передано
	noImg(viewBlock, 'Не передано назви картинки');

}

// Видаляємо ефект через заданий час
setTimeout(function(){
	if(typeof navElement !== 'undefined') {
		navElement.classList.remove('swing');
	}
}, 1300);


/**
 * Вивід повідомлення, що картинку не знайдено
 * @param  {[type]} answerBlock [ Блок куди потрібно все виводити ]
 * @param  {[type]} element     [ Якщо є то і шлях до картинки ]
 */
function noImg(answerBlock, answerText = false) {
	var srcImg = 'img/system/no_image.png',
		img = document.createElement('img'),
		textAnswer = document.createElement('p'),
		result;

	textAnswer.className = 'no-img';

	// Присвоюємо картинці шлях
	img.src = srcImg;
	img.setAttribute('width', '500');
	img.setAttribute('height', '362');
	answerBlock.appendChild(img);
	
	// Формуємо текст відповіді
	if(answerText){
		textAnswer.innerHTML = answerText;
		answerBlock.appendChild(textAnswer);
	} else {
		textAnswer.innerHTML = 'Картинку не знайдено';
		answerBlock.appendChild(textAnswer);
	}
}

/**
 * Отримуємо дані з GET
 * @param  {[type]} key [ Ключ, який потрібно отримати ]
 * @return {[type]}     [ Повертає значення або false ]
 */
function $_GET(key) {
    var s = window.location.search;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
}