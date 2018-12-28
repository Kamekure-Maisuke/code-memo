(function(){
  "use strict";
  var open = document.getElementById('open');
  var mask = document.getElementById('mask');
  var modal = document.getElementById('modal');
  var close = document.getElementById('close');

  open.addEventListener("click",function(){
    modal.className = "";
    mask.className = "";
  });
  close.addEventListener("click",function(){
      modal.className = "hidden";
      mask.className = "hidden";
  });
  mask.addEventListener("click",function(){
      //  modal.className = "hidden";
      //  mask.className = "hidden";
      close.click();
  });
})();
