$(document).ready(function() {
    const btn = document.getElementById("menu-toggle");
    const menu = $('.topmenu__mobile__list');
    const cls = { open: "open", close: "close" };
    let btnClass = cls.open;
  
    btn.addEventListener("click", (evt) => {
      evt.preventDefault();
      if (btn.classList.contains(cls.open)) {
        btn.classList.remove(btnClass);
        btnClass = cls.close;
      } else if (btn.classList.contains(cls.close)) {
        btn.classList.remove(btnClass);
        btnClass = cls.open;
        
      }
    
      void btn.offsetWidth;
      btn.classList.add(btnClass);
      btnClass === cls.open ? menu.show() : menu.hide();
      
    })
  });