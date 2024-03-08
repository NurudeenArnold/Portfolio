document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    function changeActiveNavLink() {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const targetId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('load', changeActiveNavLink);
    window.addEventListener('scroll', changeActiveNavLink);
});

var contactMeForm = document.getElementById("contactMeForm");
contactMeForm.addEventListener("submit", function(event){
    event.preventDefault()

    var email = document.getElementById("email").value;
    console.log(email);
    var message = document.getElementById("message").value;
    console.log(message);

    Swal.fire({
        title: "Thank you!",
        text: "I will be in contact with you soon.",
        color: "var(--text-color)",
        icon: "success",
        confirmButtonColor: "var(--main-color)",
        iconColor: "var(--main-color)",
        confirmButtonText: "Okay",
        background: "var(--bg-color)"
    });

    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
});
