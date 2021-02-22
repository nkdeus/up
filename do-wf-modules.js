/* Utils */

getRandomColor = function(offset) {
  
  //console.log('offset',offset)
      
  if(offset < 100){
    //sombre
    var r = Math.floor(Math.random()*offset);
    var colorR = r;
    var colorG = r;
    var colorB = r;
  }else if(offset > 200){
    //claire
    var max = 255-offset;
    var r = Math.floor(Math.random()*max);
    var colorR =  Number(offset)+r;
    var colorG =  Number(offset)+r;
    var colorB =  Number(offset)+r;

  }else{
    //nice
    var start = 255-offset;
    var colorR = Number(start)+Math.floor(Math.random()*offset);
    var colorG = Number(start)+Math.floor(Math.random()*offset);
    var colorB = Number(start)+Math.floor(Math.random()*offset)
  }
	
  var color  = "rgb(" + colorR + "," + colorG + "," + colorB + ")";
  //console.log('color',color);
  return color;
  
};


  
/* Start Head code */
window.WFmodules = {
  docolor: function() {
    
    const $btActions = $('[data-bt-action]', this);
    var $scope = this;
    if($($scope).attr("data-custom-target") != undefined){
      $scope = $($($scope).attr("data-custom-target"));
    }
    
    var saveSecond = undefined;
    var saveContraste = undefined;
    
    $scope.toggles = {
      random : false,
      nuit : false,
      theme : false
    }

   $scope.changeColorByBt = function(btData){
     
      var offset = btData.attr('data-bt-color-offset');
      if(offset == undefined){
         return;
      }
  	  var cssVar = "--"+btData.attr('data-bt-color');
  	 
  	  var color = getRandomColor(offset);
     //console.log("??",cssVar);
      $($scope).css(cssVar, color);

    };
    
    var timeOut = undefined;
  
  	$scope.randomPlay = function(){
       
       if($scope.toggles['random']){         
           $scope.changeColor("--main",190);
           $scope.changeColor("--second",210);
           $scope.changeColor("--contraste",60);
         
           $scope.changeColor("--main2",190);
           $scope.changeColor("--second2",210);
           $scope.changeColor("--contraste2",60);
           clearTimeout(timeOut);
           timeOut = setTimeout($scope.randomPlay, 1200);        
        }else{
          clearTimeout(timeOut);
        }
    }

  	$scope.changeColor = function(cssVar,offsetColor){
	    var color = getRandomColor(offsetColor);
      $($scope).css(cssVar, color);
    };
    
    $scope.keyColor = function(){
     
      var left = 37;
      var up = 38;
      var right = 39;
      var down = 40;
      


      $(document).keydown(function(e) {
        
      	switch(e.which) {
          case 37:
          //left
          console.log("key left");
          break;

          case 38:
          //up
          console.log("key up");
          $scope.reverse();
          break;

          case 39:
          //next
          console.log("key next");
          break;

          case 40:
          //down
          console.log("key down");
          $scope.changeColor("--main-color",190);
          $scope.changeColor("--second-color",230);
          $scope.changeColor("--contraste-color",60);
          break;

          default: return;
      	}
      e.preventDefault();
      
    });
      
    }
                          
    $scope.reverse = function(){	
      if(saveSecond == undefined){
          saveSecond =  $($scope).css("--second-color");
          saveContraste =  $($scope).css("--contraste-color");
      }
      console.log("resverse ",$scope.toggles['nuit']);
      if($scope.toggles['nuit']){
         
         $($scope).css("--second-color", saveContraste);
         $($scope).css("--contraste-color", saveSecond);
      }else{
         $($scope).css("--second-color", saveSecond);
         $($scope).css("--contraste-color", saveContraste);
      }
      //$scope.toggleForce($scope,$scope.toggles['nuit'],'reverse');
    }
    
    $scope.toggleForce = function(target,toggle,className){
    	
      if(toggle){
        $(target, $scope).addClass(className);
      }else{
        $(target, $scope).removeClass(className);
      }
     
    }
    
    $scope.toggle = function(target,param,className){
    	
	    param = !param;
      $(target, $scope).toggleClass(className);     
      return param;
 
    }
    
    $btActions.click((e) => {
      e.preventDefault();
      var action = $(e.currentTarget).attr('data-bt-action');
      var actionToggleAdd = $(e.currentTarget).attr('data-bt-toggle-add');
      var actionToggleRemove = $(e.currentTarget).attr('data-bt-toggle-remove');
      switch(action){
        case "reverse":
          console.log("REVERSE");
          $scope.toggles['nuit'] = $scope.toggle(e.currentTarget,$scope.toggles['nuit'],'active');
          $scope.reverse();
          
        break;
        case "random":
          console.log("RANDOM");
          
          $scope.toggles['random'] = $scope.toggle(e.currentTarget,$scope.toggles['random'],'active');
          $scope.randomPlay();
       
        break;
        case "theme":
          console.log("THEME");
          $scope.toggles['theme'] = $scope.toggle(e.currentTarget,$scope.toggles['theme'],'active');
          
       
        break;
        case "change":
          console.log("CHANGE");
          $scope.changeColorByBt($(e.currentTarget));
          saveSecond =  $($scope).css("--second-color");
          saveContraste =  $($scope).css("--contraste-color");
       
        break;
        default:
      }
      
      if(actionToggleAdd != undefined){
        
        var toggleRef = actionToggleAdd.split(",")[0];
        var newTarget = actionToggleAdd.split(",")[1];
        var toggleClass = actionToggleAdd.split(",")[2];
        $scope.toggleForce(newTarget,$scope.toggles[toggleRef],toggleClass);
      }
      
       if(actionToggleRemove != undefined){
        
        var toggleRef = actionToggleRemove.split(",")[0];
        var newTarget = actionToggleRemove.split(",")[1];
        var toggleClass = actionToggleRemove.split(",")[2];
        $scope.toggleForce(newTarget,!$scope.toggles[toggleRef],toggleClass);
      }
	    

    });
   
    //$scope.keyColor();
    
  	return this;

  },
   dotoggle:function(){
    const $scope = this;
    const isGlobal = $($scope).attr('data-global') == "true";
    var $parent = $($scope).parent();
    if(isGlobal){
      $parent = $("html");
    }
    const actionToggleAdd = $($scope).attr('data-bt-toggle-add');
    const actionToggleRemove = $($scope).attr('data-bt-toggle-remove');
    const actionToggleType = $($scope).attr('data-bt-type') || 'click';
     console.log("?? ",actionToggleType);
    var datas = null;
    var toggleSens = true;
    if(actionToggleAdd != undefined){
        
       datas = $($scope).attr('data-bt-toggle-add').split(',');
       toggleSens = true;

    }
    if(actionToggleRemove != undefined){
        
        datas = $($scope).attr('data-bt-toggle-remove').split(',');
        toggleSens = false;

    }
    const active = datas[0];
    const target = $(datas[1], $parent) || $scope;
    const classToggle = datas[2] || active;

    
    $scope.toggles = {};
    
    $($scope).on(actionToggleType,$scope, function(e) {
          
         $scope.toggle();

    });
    $scope.toggle = function(){
      
       if($scope.toggles[active] == undefined){
          $scope.toggles[active] = toggleSens;
        }
        
        $scope.toggles[active] = !$scope.toggles[active];

        $($scope).toggleClass(active);
        if($scope.toggles[active]){
           target.removeClass(classToggle);   
        }else{
           target.addClass(classToggle);          
        }

      
        console.log("TOGGLE ",classToggle,$scope.toggles[active]);
    }
   

    //



  },
  doautotheme: function(){
    
    var $scope = this; 
    var paletteReady = false;
    var urlInputPhoto = $("#imageUrl")[0] != undefined;
    var img = $("#theme-auto")[0];
    var imgSrc = $("#theme-auto").attr('data-src') || $("#theme-auto").attr('src');
    
    
    console.log('urlInputPhoto',urlInputPhoto);
    var consoleCss;
    window.doautotheme = $scope;
    $scope.colors = [];
    
    if(urlInputPhoto){
        var inputUrl = $("#imageUrl");
        inputUrl.focusout(function() {

          $scope.forceLoad();

        })
    }
  

    $scope.getPalette = function(targetImg) {

      console.log('__getPalette');
      if(paletteReady == false){
        return;
      }
      // https://jariz.github.io/vibrant.js/
      var vibrant = new Vibrant(targetImg,64,5);
      $scope.swatches = vibrant.swatches();
      $scope.colors = [];
     // console.log('__$scope.swatches ',$scope.swatches);
      for ( var swatch in $scope.swatches ) {
          if ($scope.swatches.hasOwnProperty(swatch) && $scope.swatches[swatch]) {       
            $scope.colors.push($scope.swatches[swatch].getHex());

          }
      }
      if($scope.swatches['Vibrant'] != undefined){        
          $scope.colors.push($scope.swatches['Vibrant'].getTitleTextColor());
          
          var hsv = Please.HEX_to_HSV($scope.swatches['Vibrant'].getHex());

          result = Please.make_scheme( hsv, { 'scheme_type': 'complementary', format: 'hex' });
          var result2 = Please.make_color({
            golden: true,
            base_color: hsv,
            saturation: 0.01,
            value:0.15,
            colors_returned: 2,
            format: 'hex'
          });
          var result3 = Please.make_color({
            golden: true,
            base_color: Please.HEX_to_HSV(result[1]),
            saturation: 0.01,
            value:0.91,
            colors_returned: 2,
            format: 'hex'
          });
         
         $scope.colors.push(result[1]);      
         $scope.colors = $.merge($scope.colors, result2);
         $scope.colors = $.merge($scope.colors, result3);


      }else{
          $scope.colors.push('#FF0000');
          console.log("__error");
          $scope.colors = [];
          $scope.forceLoad();
          return;
      }
          
      //$('html').css("--main-color",$scope.swatches['Vibrant'].getHex());
      //$('html').css("--second-color",$scope.swatches['Muted'].getHex());
      //$('html').css("--contraste-color",$scope.swatches['Muted'].getTitleTextColor());
      
       var i;
       for (i = 0; i < window.dothemes.length; ++i) {
            var cItem = window.dothemes[i];
            cItem.pushColors($scope.colors);
       }
        
       //$('[data-module=dotheme]').pushColors($scope.colors);
       // window.dotheme().pushColors($scope.colors);
       //list.appendChild(listFragment);

    }
    


    $scope.doconsole = function(){
      
      var i;
      var consoleCss = ":root {<br>"
      for (i = 0; i < window.dothemes.length; ++i) {

          var cItem = window.dothemes[i];
          consoleCss += cItem.getCssLine();
         
       }
      
      consoleCss += "}"
      
      $('#console').html(consoleCss);
      
   
     
    };

    $scope.imageLoaded = function() {
          console.log('__imageLoaded');
          paletteReady = true;
          setTimeout(function(){
            $scope.getPalette(img);
          },0);
          
    }
    $scope.forceLoad = function() {
       console.log('__forceLoad ',$('#imageUrl').val() == "");
   
       var imgContainer = $('#imgContainer');
        if($('#imageUrl').val() == "" && urlInputPhoto){
            
            img.onload = $scope.imageLoaded();
        }else{
          
          console.log("OK2")
          
            if(img){
               img.remove();
               img.onload = null;
               img = null;
            }
           
            var tmpImg = new Image();
            var urlImg  = $('#imageUrl').val() || imgSrc;
  
            tmpImg.crossOrigin = "anonymous";

           tmpImg.addEventListener("load", function() {
                img = tmpImg;     
                $scope.imageLoaded();
            } , false);
  
            tmpImg.src = urlImg;
            imgContainer.html(tmpImg);
          
        }
    

    }
    
   

    
    if(urlInputPhoto){
      
        $('.hero-grid').click((e) => {    
          var R = window.innerWidth-Math.floor(window.innerWidth/10)-Math.floor(Math.random()*10);
          $('#imageUrl').val(imgSrc+R.toString());
          e.preventDefault();
          $scope.forceLoad();         
        });
      
        var R = window.innerWidth-Math.floor(window.innerWidth/10)-Math.floor(Math.random()*10);
        $('#imageUrl').val(imgSrc+R.toString());
        $scope.forceLoad();
      
    }else{
       console.log("OK");
      $scope.forceLoad();
    }

    return $scope;
    
  },
  dotheme: function(){
    
 
      var $scope = this;
      var containerItem = $($scope);
      var currentItem = null;
      
      var timeOut = null;
      containerItem.click(function() {
          containerItem.toggleClass('active');
      });
    
      $scope.getCssLine = function(){

        if(currentItem == null){
          return "null"
        }
        return  "--"+currentItem.attr("data-bt-color")+": "+currentItem.attr("data-color")+";<br>";
      }
    
      $scope.changeSelectedColor = function(type, color){
       
        var cssVar = "--"+type;
        if($($scope).attr("data-custom-target") != undefined){
            $($($scope).attr("data-custom-target")).css(cssVar, color);
        }else{
            $('[data-module=docolor]').css(cssVar, color);
        }
       
      };

      containerItem.on('click', '[data-bt-color]', function(e) {
          
          var timeOutDelay = 0;
          if(currentItem){
             timeOutDelay = 300;
             var tempItem = currentItem;
             currentItem.removeClass('active');
          }
         
          currentItem = $(this);
          currentItem.addClass('active');
          $scope.changeSelectedColor(currentItem.attr("data-bt-color"),currentItem.attr("data-color"));
          clearTimeout(timeOut);
          timeOut = setTimeout(function() { 
              if(tempItem){
                containerItem.append(tempItem);
              }
              containerItem.prepend(currentItem);
          }, timeOutDelay);  
        
          //$('#console').append($scope.getCssLine());
          window.doautotheme.doconsole();
      
      });
    
      $scope.itemsCreat = false;
      $scope.colorsList = undefined;
      $scope.itemsList = [];
      if($($scope).attr("data-colors") != undefined){
                 
          $scope.colorsList  = $($scope).attr("data-colors").split(",");

      }
    
      $scope.pushColors = function(colors){
       
          var newColors = colors;
          
          var typeC = $($scope).attr("data-type-color");
          //console.log("max -- ",newColors.length);
          var i = 0;
          for (i = 0; i < newColors.length; ++i) {
                       
            if($scope.itemsCreat == false){
              var cItem = "<div class='color-"+i+"' data-bt-color='"+typeC+"' data-color='"+newColors[i]+"'></div>";
              containerItem.append(cItem);
              $scope.itemsList.push(cItem);
              //console.log("__ __itemsCreat ");
              
            }else{
              //console.log("__reset");
              $(".color-"+i, $scope).removeClass('active');  
            }
            $(".color-"+i, $scope).attr("data-color",newColors[i]);
            $(".color-"+i, $scope).css("background-color",newColors[i]);

          }
        
          var currentIndex = 0;
          var customChoice = {"main":0,"second":5,"contraste":2,"main2":6,"second2":1,"contraste2":3};
          currentIndex = customChoice[typeC];
          
   
         
 
          $(".color-"+currentIndex, $scope).css("background-color",newColors[currentIndex]);
          $(".color-"+currentIndex, $scope).attr("data-color",newColors[currentIndex]);
          $(".color-"+currentIndex, $scope).click();
          containerItem.toggleClass('active');
          $scope.itemsCreat = true;
          //containerItem.click();
          
      };
    
      if($scope.colorsList != undefined){
        $scope.pushColors($scope.colorsList);
      }
    
      return $scope;

  
  },
 
  copyright: function() {
    const d = new Date();
    $('[data-year]', this).text(d.getFullYear())
  },
  do: function(str) {
    console.log(`DO ${str}`);
  },
  /* START DO-CHRONOS */
  dochronos: function(){
    
    var $target = $(this);
    var $type = $target.attr('data-do-chronos');
    var $notrigger = $target.attr('data-do-notrigger') == "true";
    var $dateStart = $target.attr('data-do-date');
   // console.log("$dateStart ",$dateStart);
    var cible = ".do-date";
    var $container = $(cible, $target); 
     
    var start = new Date('2004-01-01T00:00');
    if($dateStart != undefined){
      start = new Date($dateStart);
    }
    var now = new Date();
    
    function dayDiff(d1, d2)
    {
      d1 = d1.getTime() / 86400000 / 360;
      d2 = d2.getTime() / 86400000 / 360;
      return new Number(d2 - d1).toFixed(0);
    }


    var getData = {
      
      annees : function(){
        return dayDiff(start,now);
      },
      epoque : function(){
        return start.getFullYear();
      },
      number : function(){
        return  Number($target.attr('data-do-number'));
      }
      
    }
    
    var result = {count: $container.text(), max:getData[$type]};


    
    if($notrigger){
       gsap.to(result, {duration:1, count: result.max, onUpdate:function(){
         $container.text(result.count.toFixed(0));
      }});
    }else{
      gsap.to(result, {count: result.max, onUpdate:function(){
         $container.text(result.count.toFixed(0));
      },scrollTrigger: {
        trigger:  $container,
        scrub: 1,
        start: 'bottom bottom',
        end: 'top top+=50%',
        ease: 'expo.in'
      }});
    }
      
    
  },
 /* START DO-TRIGGER */
  dotrigger: function(){
     
     var $scope = this; 
     $scope.toggle = $($scope).attr("data-do-trigger") == "true";
     $scope.target = $($scope).attr("data-do-target");
     $scope.classToggle = $($scope).attr("data-do-class");
     
     //var customTarget = $($scope).attr("data-do-trigger") == "true";
    
     
  
     ScrollTrigger.create({
      trigger: $scope,
      start: 'bottom bottom-=10%',
      end: 'top top-=10%',
 
      onToggle: function(){
        $scope.toggle = !$scope.toggle;
        $($scope).toggleClass("active");
         //console.log("toggle ",$scope.toggle);
        $($scope).attr("data-do-trigger", $scope.toggle);
        
        if($scope.target){
          //console.log("target ", $scope.toggle, $scope.classToggle);
          $($scope.target).toggleClass($scope.classToggle);
        }
      },
    });
    
  }, /* START DO-TRIGGER */
  dotexture: function(){
     
     var $scope = $(this); 
     $scope.append('<div class="texture"></div>'); 
	 	
    
  },
  
  
  /* START DO-CHANGE */
    dochange: function() {  
    
    const $scope = this;
    var $target = $($scope);
    var $container = $('.do-span', $target); 
    var $mainColor = $target.css("--main-color");
    var $baseColor = $target.css("color");
    var $mots = $target.attr('data-do-change').split(",");
    var $max = $mots.length;
    $mots.push($container.text());
    
    var random = $target.attr('data-do-random') == "true";
    var index = 0;
    var duration = 0.2;
    var delay = 3;
   
    var stateActive = false; 
    var stateAnim = false;
    
    $scope.random = function(exclude){     
      
      var r = Math.floor( Math.random()*($max+1) );
      
      while(r == exclude){
        r = Math.floor( Math.random()*($max+1) );
        
      }
      
      return r;
    }
    $scope.randomDelay = function(){    
        if(random){
          return Number(2+Math.floor( Math.random()*4 ));
        }else{
          return delay;
        }
    }
    
    

    $scope.changeMot = function(){
      
       if(stateActive == false){
          return;
       }
       
       stateAnim = true;
      
      
       gsap.to($container,{ duration:duration/2, delay:$scope.randomDelay, color:$mainColor, opacity:0, y:-5, onComplete:function(){
                 
         var newMot = $mots[index];
         $container.text(newMot);
         
          $container.attr("data-do-fx","wtf");
           setTimeout(function(){
              $container.attr("data-do-fx","none");
           },200);
         
         
         gsap.fromTo($container,{duration:duration*50,y:5,color:$mainColor},{opacity:1, y:0, color:$baseColor, onComplete:function(){
           
          
           stateAnim = false;
           if(stateActive == true){
              $scope.changeMot();
       	   }
           
         }})
         if(random){
           
           index = $scope.random(index);
           
         }else{
            index++;
           if(index > $max){
             index = 0;
           }
         }
        
         
         
       }})
    }
    
      $scope.getCurrentSection = function() {
      
      var isActive  = $target.hasClass("ok");
      if(stateActive != isActive){
        
         stateActive = isActive;
         if(stateAnim == false){
           $scope.changeMot();
         }
         
      }
        
    }
    
    ScrollTrigger.create({
      trigger: this,
      start: 'bottom bottom-=10%',
      end: 'top top+=10%',
      toggleClass: {targets: $target, className: "ok"},
      onUpdate: $scope.getCurrentSection
    }); 
  }
  /* END DO-CHANGE */
}
/* End Head code */
