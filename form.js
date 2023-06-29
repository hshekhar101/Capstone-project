document.querySelector(".barline").addEventListener("click", function() {
    document.querySelector(".one").classList.toggle("dropdown_menu");
});

document.querySelectorAll(".active").forEach(function(element) {
    element.addEventListener("click", function() {
        document.querySelector(".one").classList.remove("dropdown_menu");
    });
});