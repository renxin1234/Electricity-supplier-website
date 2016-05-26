window.onload = function () {
            var banner_bar = document.getElementById('banner_bar');
            var imgBox = document.getElementById('imgBox');
            var imgNum = document.getElementById('imgNum').getElementsByTagName('a');
            var index = 1;
            var len = 4;
            var animated = false;
            var interval = 2000;
            var timer;


            
            function animate (offset) {
                if (offset == 0) {
                    return;
                }
                animated = true;
                var time = 200;
                var inteval = 10;
                var speed = offset/(time/inteval);//走的小碎步
                var left = parseInt(imgBox.style.left) + offset;

                var go = function (){
                	//向右移  向左移           go 函数递归调用
                    if ( (speed > 0 && parseInt(imgBox.style.left) < left) || (speed < 0 && parseInt(imgBox.style.left) > left)) {
                        imgBox.style.left = parseInt(imgBox.style.left) + speed + 'px';
                        setTimeout(go, inteval);
                    }
                    else {
                    	//滑过一张图片  下一张图片开始
                        imgBox.style.left = left + 'px';
                          //是否大于一张图片  判断
                        if(left>-200){
                           imgBox.style.left = -810 * len + 'px';
                        }
                        if(left<(-810 * len)) {
                           imgBox.style.left = '-810px';
                        }
                        animated = false;
                    }
                }
                go();
            }

            function showButton() {
                for (var i = 0; i < imgNum.length ; i++) {
                    if( imgNum[i].className == 'active'){
                        imgNum[i].className = '';
                        break;
                    }
                }
                imgNum[index - 1].className = 'active';
            }

            function play() {
                timer = setTimeout(function () {
                if (animated) {
                    return;
                }
                if (index == 4) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate( -810 );
                showButton();
          
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }


            for (var i = 0; i < imgNum.length; i++) {
                imgNum[i].onclick = function () {
                    if (animated) {
                        return;
                    }
                    if(this.className == 'active') {
                        return;
                    }
                    var myIndex = parseInt(this.getAttribute('index'));
                    var offset = -810 * (myIndex - index);

                    animate(offset);
                    index = myIndex;
                    showButton();
                }
            }

            banner_bar.onmouseover = stop;
            banner_bar.onmouseout = play;

            play();

        }
			
