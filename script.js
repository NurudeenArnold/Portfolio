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

function showImagePreviewTechFoods() {
    Swal.fire({
        title: '<h2 class="previewheading">TechFoods<span> Preview</span></h2>',
        html: `
            <h2 class="preview">Home Page</h2>
            <img src="images/TechatronicsFoodHome.PNG" alt="Home" style="width:100%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            <h2 class="preview">Menu Page</h2>
            <img src="images/TechatronicsFoodMenu.PNG" alt="Food Menu" style="width:100%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            <h2 class="preview">Meat Menu Page</h2>
            <img src="images/MeatMenu.PNG" alt="Meat Menu" style="width:100%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            <h2 class="preview">Cart Page</h2>
            <img src="images/Cart.PNG" alt="Cart" style="width:100%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            <h2 class="preview">Login Page</h2>
            <img src="images/Login.PNG" alt="Login" style="width:100%; margin-bottom:10px;">
            </br>
            </br>
            </br>
        `,
        width: 700,
        padding: '3rem',
        background: 'var(--bg-color)',
        backdrop: `
            rgba(0,0,0,0.7)
            center center
            no-repeat
            blur(10px)
        `,
        showConfirmButton: false
    });
}

function showImagePreviewWolaNani() {
    Swal.fire({
        title: '<h2 class="previewheading">WolaNani<span> Preview</span></h2>',
        html: `
            <h2 class="preview">Login</h2>
            <img src="images/WNLogin.jpg" alt="Home" style="width:25%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            <h2 class="preview">Home</h2>
            <img src="images/WNHome.jpg" alt="Home" style="width:25%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            <h2 class="preview">Menu navbar</h2>
            <img src="images/WNBar.jpg" alt="Menu navbar" style="width:25%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            <h2 class="preview">Admin Home</h2>
            <img src="images/WNAdminHome.jpg" alt="Admin Home" style="width:25%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            <h2 class="preview">Admin navbar</h2>
            <img src="images/WNAdminBar.jpg" alt="Admin navbar" style="width:25%; margin-bottom:10px;">
            </br>
            </br>
            </br>
        `,
        width: 700,
        padding: '3rem',
        background: 'var(--bg-color)',
        backdrop: `
            rgba(0,0,0,0.7)
            url("portfolio_screenshot.jpg")
            center center
            no-repeat
            blur(10px)
        `,
        showConfirmButton: false
    });
}

function showImagePreviewLandingPage() {
    Swal.fire({
        title: '<h2 class="previewheading">Valorant Beta<span> Preview</span></h2>',
        html: `
            <h2 class="preview">Landing Page</h2>
            <img src="images/LandingPage.PNG" alt="Landing Page" style="width:100%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            <h2 class="preview">Popup</h2>
            <img src="images/LandingPagePopup.PNG" alt="Popup" style="width:100%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            </br>
        `,
        width: 700,
        padding: '3rem',
        background: 'var(--bg-color)',
        backdrop: `
            rgba(0,0,0,0.7)
            center center
            no-repeat
            blur(10px)
        `,
        showConfirmButton: false
    });
}
function showImagePreviewSnake() {
    Swal.fire({
        title: '<h2 class="previewheading">Snake Game<span> Preview</span></h2>',
        html: `
            <h2 class="preview">Start</h2>
            <img src="images/SnakeStart.PNG" alt="Start" style="width:50%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            <h2 class="preview">Game Over</h2>
            <img src="images/SnakeGameOver.PNG" alt="Game Over" style="width:50%; margin-bottom:10px;">
            </br>
            </br>
            </br>
            </br>
        `,
        width: 700,
        padding: '3rem',
        background: 'var(--bg-color)',
        backdrop: `
            rgba(0,0,0,0.7)
            center center
            no-repeat
            blur(10px)
        `,
        showConfirmButton: false
    });
}

