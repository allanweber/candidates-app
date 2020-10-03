function toggleBurger() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".navbar-menu");
  burger.classList.toggle("is-active");
  menu.classList.toggle("is-active");
}

function toggleDropdown(dropdownId) {
  var dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("is-active");
}
