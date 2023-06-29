document.querySelector(".barline").addEventListener("click", function() {
    document.querySelector(".one").classList.toggle("dropdown_menu");
});

document.querySelectorAll(".active").forEach(function(element) {
    element.addEventListener("click", function() {
        document.querySelector(".one").classList.remove("dropdown_menu");
    });
});

function openProfile(profile) {
    switch (profile) {
        case 'instagram':
            window.open('https://www.instagram.com/h_shekhar_302', '_blank');
            break;
        case 'github':
            window.open('https://github.com/hiitgmanshu', '_blank');
            break;
        case 'twitter':
            window.open('https://twitter.com/Himansh52472191', '_blank');
            break;
        default:
            break;
    }
}

function sendEmail() {
    window.open('mailto:himanshushekhar44578@gmail.com');
}