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

function Submit(){
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const dataArray = [];

    const data = {
        email: email,
        message: message
    };

    dataArray.push(data);

    document.querySelector("email").value = "";
    document.querySelector("message").value = ""; 
};

