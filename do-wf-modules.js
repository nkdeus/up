
/* Start Head code */
window.WFmodules = {
  docolor: function() {

  	return this;

  },
  dowtf: function() {
    
     const $scope = this;
     $scope.max = $($scope).attr('data-do-max') || 6;
     $scope.space = $($scope).attr('data-do-space') || 2;
     $scope.itemClass = $($scope).attr('data-do-wtf') || 'do-wtf-item';
     $scope.gap = $($scope).attr('data-do-gap') || '1px';
     $scope.force = $($scope).attr('data-do-force') || 5;
     $scope.blend = $($scope).attr('data-do-blend') || 'screen';
     $scope.random = [];
     $scope.random = $($scope).attr('data-do-tween').split(",");
     //console.log($scope.random);
    
     $scope.getParams = function(){
         let gsapParams = {duration:20,ease:'power3.inOut'};
         $.each($scope.random, function(index, value) {
          
            if(value == "scale" || value == "scaleX" || value == "scaleY" || value == "opacity"){
               gsapParams[value] = "random(0,"+(0.2*$scope.force)+")";
            }
            if(value == "x" || value == "y"){
               gsapParams[value] = "random(0,"+(20*$scope.force)+")";
            }
            if(value == "rotation" ||value == "rotationX" || value == "rotationY" || value == "rotationZ"){
               gsapParams[value] = "random(0,"+(10*$scope.force)+")";
            }

         });
        return gsapParams;
     }
 
    
    //gsap.set(item,{opacity:0,x:"random(0,50)", y:"random(0,50)"});
     $($scope).css('position',$($scope).attr('data-do-position') || 'relative');
    
     var containerItems = $("<div>");
     containerItems.addClass('do-grid-wtf');
     containerItems.css("mix-blend-mode", $scope.blend);
     var columns = Math.floor($scope.max/$scope.space);
     var cssRepeat = "repeat("+columns+", 1fr)";
     containerItems.css("grid-template-columns",cssRepeat);
     containerItems.css("gap",$scope.gap);
     //console.log(cssRepeat);

      
     $scope.append(containerItems[0]);
     var tl = gsap.timeline({yoyo:true,repeat:5});
 
     $scope.creatWtf = function(){
       
         let item = $("<li></li>");
         item.addClass($scope.itemClass);
         containerItems.append(item[0]);
         gsap.set(item,$scope.getParams());
         tl.to(item,$scope.getParams(),0)
         return item;
          
     }  
     var wtfItems = [];
    
     for (var i = 0; i < $scope.max; i++) {
        
         wtfItems.push($scope.creatWtf());
         
     }
    
      
      

  },
   dofaker: function() {
    
     const $scope = this;

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
    const targetName = datas[1] || 'do'
    const target = $(datas[1], $parent) || $scope;
    const classToggle = datas[2] || active;
    $scope.toggleKey = active+targetName;
     
     if(window.togglesKey[$scope.toggleKey] == undefined){
       //console.log('NEW KEY ',$scope.toggleKey);
       window.togglesKey[$scope.toggleKey] = {};
       window.togglesKey[$scope.toggleKey].bool = toggleSens;
        //console.log('RESULT ',window.togglesKey[$scope.toggleKey].bool);
     }else{
       //console.log('ADD KEY ',$scope.toggleKey);
     }

    
    $scope.toggles = {};
    
    $($scope).on(actionToggleType,$scope, function(e) {
          
         $scope.toggle();

    });
    $scope.toggle = function(){
      
       //console.log("TOGGLE ")
       //console.log('TEST KEY ',window.togglesKey[$scope.toggleKey].bool);
       if($scope.toggles[active] == undefined){
          $scope.toggles[active] = window.togglesKey[$scope.toggleKey].bool;
        }
        window.togglesKey[$scope.toggleKey].bool = !window.togglesKey[$scope.toggleKey].bool;
        $scope.toggles[active] = window.togglesKey[$scope.toggleKey].bool;

        $($scope).toggleClass(active);
        if($scope.toggles[active]){
           target.removeClass(classToggle);   
        }else{
           target.addClass(classToggle);          
        }
      
        //console.log("TOGGLE ",classToggle,$scope.toggles[active]);
    }
   

    //



  },
  doautotheme: function(){
    
    var $scope = this; 
    var paletteReady = false;
    var urlInput = $($scope).attr('data-do-input-url');
    var customTarget = $($scope).attr('data-do-custom-target') || $scope;
    var urlInputPhoto = urlInput != undefined;
    var datac = $($scope).attr('data-do-target-container');
    
    var imgContainer = datac || $($scope);
    var imgDom = $("img",imgContainer);
    var img = imgDom[0];
    var imgSrc = imgDom.attr('data-src') || imgDom.attr('src'); 

    var consoleCss;
    if(window.doautotheme == null){
       window.doautotheme = $scope;
    }
   
    $scope.colors = [];
    
    if(urlInputPhoto){
        var inputUrl = $(urlInput);
        inputUrl.focusout(function() {
          $scope.forceLoad();
        })
    }
  
    $scope.getPalette = function(targetImg) {
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

          console.log("__error :/");
          $scope.colors = [];
          //$scope.forceLoad();
          return;
      }
      var i;
      //console.log("window.dothemes : ",window.dothemes);
      if(window.dothemes != null && customTarget == "html"){
          
           for (i = 0; i < window.dothemes.length; ++i) {
                var cItem = window.dothemes[i];
                cItem.pushColors($scope.colors);
           } 
        
      }else{
            
	    var currentIndex = 0;
	    var customChoice = {"main":0,"second":5,"contraste":2,"extra":6};   
	    $.each( customChoice, function( key, value ) {

	      var cssVar = "--"+key+"-color";
	      if(customTarget == "html"){
		cssVar = "--"+key;
	      }
	      var color = $scope.colors[value];
	      //console.//"OK --> ",cssVar, color);
	      $(customTarget).css(cssVar, color);
	    });
	      
      }

    }
    
    $scope.doconsole = function(){    
      var i;
      var consoleCss = ""
      for (i = 0; i < window.dothemes.length; ++i) {
          var cItem = window.dothemes[i];
          consoleCss += cItem.getCssLine();     
       }
       $('#console').html(consoleCss);     
    };

    $scope.imageLoaded = function() {
       
      paletteReady = true;
      setTimeout(function(){
        $scope.getPalette(img);
      },0);
          
    }
    
    $scope.forceLoad = function() {

        if($(urlInput).val() == "" && urlInputPhoto){
             console.log("$scope.imageLoaded()");
            img.onload = $scope.imageLoaded();
         
        }else{
                 
            if(img){
               img.remove();
               img.onload = null;
               img = null;
            }
           
            var tmpImg = new Image();
            var urlImg  = $(urlInput).val() || imgSrc;
  
            tmpImg.crossOrigin = "anonymous";

            tmpImg.addEventListener("load", function() {
                img = tmpImg;     
                $scope.imageLoaded();
            }, false);
  
            tmpImg.src = urlImg;
            $(imgContainer).html(tmpImg);
          
        }
    

    }
    
   

    
    if(urlInputPhoto){
      

        $($scope).click(function() {
          var R = window.innerWidth-Math.floor(window.innerWidth/10)-Math.floor(Math.random()*10);
          $(urlInput).val(imgSrc+R.toString());    
          $scope.forceLoad();  
        });
      
        var R = window.innerWidth-Math.floor(window.innerWidth/10)-Math.floor(Math.random()*10);
        $(urlInput).val(imgSrc+R.toString());
        $scope.forceLoad();
      
    }else{
       
        $($scope).click(function() {
           $scope.imageLoaded();
        });
	    
	if (imgDom.prop('complete')) {
          console.log("deja load")
          $scope.imageLoaded();
	} else {
          console.log("on load")
          imgDom.on('load',function(){
    	      $scope.imageLoaded();
	  });
	}
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
        return  "$"+currentItem.attr("data-bt-color")+"Color: "+currentItem.attr("data-color")+";<br>";
      }
    
      $scope.changeSelectedColor = function(type, color){
       
        var cssVar = "--"+type;
        console.log(cssVar);
        if($($scope).attr("data-custom-target") != undefined){
            $($($scope).attr("data-custom-target")).css(cssVar, color);
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
          //var customChoice = {"main":0,"second":9,"contraste":6,"extra":5};
          var customChoice = {"main":0,"second":5,"contraste":2,"extra":6};  
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
