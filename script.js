const firebaseConfig = {
  apiKey: "AIzaSyAuR_UzGyF3hqhWO8Brue13ViR0bBijktE",
  authDomain: "portfolio-3b925.firebaseapp.com",
  projectId: "portfolio-3b925",
  storageBucket: "portfolio-3b925.appspot.com",
  messagingSenderId: "79526607612",
  appId: "1:79526607612:web:996350ccc6afc95b5e7579"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

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

    const randomId = function(length = 6) {
        return Math.random().toString(36).substring(2, length+2);
    }; 
    var name = document.getElementById("fullName").value;
    console.log(message);
    var email = document.getElementById("email").value;
    console.log(email);
    var message = document.getElementById("message").value;
    console.log(message);

        var name = name;
        var email = email;
        var message = message;
        var database_ref = database.ref();
        var data = {
            name : name,
            email : email,
            message : message
        };
        database_ref.child("Messages/" + randomId(6)).set(data);

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

    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
});

function DisplayError(error) {
    //Display Error Method
    var errorMessage = error.message; //assigning error message to var
    if (
      errorMessage ==
      '{"error":{"code":400,"message":"INVALID_LOGIN_CREDENTIALS","errors":[{"message":"INVALID_LOGIN_CREDENTIALS","domain":"global","reason":"invalid"}]}}'
    ) {
      errorMessage = "Invalid Email or Password.";
    }
    Swal.fire({
      //Alert box Error
      title: "Error:",
      text: errorMessage + " ",
      color: "#ffffff",
      icon: "error",
      confirmButtonText: "Okay",
      iconColor: "var(--text-color)",
      confirmButtonColor: "var(--text-color)",
    });
    return;
}
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height){
            navLinks.forEach (link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};
