import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  showImagePreviewWolaNani(): void {
    Swal.fire({
      title: '<h2 class="previewheading">WolaNani<span> Preview</span></h2>',
      html: `
        <h2 class="preview">Login</h2>
        <img src="/images/WNLogin.jpg" alt="Login" style="width:25%; margin-bottom:10px;">
        <br><br><br>
        <h2 class="preview">Home</h2>
        <img src="/images/WNHome.jpg" alt="Home" style="width:25%; margin-bottom:10px;">
        <br><br><br>
        <h2 class="preview">Menu navbar</h2>
        <img src="/images/WNBar.jpg" alt="Menu navbar" style="width:25%; margin-bottom:10px;">
        <br><br><br>
        <h2 class="preview">Admin Home</h2>
        <img src="/images/WNAdminHome.jpg" alt="Admin Home" style="width:25%; margin-bottom:10px;">
        <br><br><br>
        <h2 class="preview">Admin navbar</h2>
        <img src="/images/WNAdminBar.jpg" alt="Admin navbar" style="width:25%; margin-bottom:10px;">
      `,
      width: 700,
      padding: '3rem',
      background: 'var(--bg-color)',
      backdrop: 'rgba(0,0,0,0.7) center center no-repeat blur(10px)',
      showConfirmButton: false,
    });
  }

  showImagePreviewTechFoods(): void {
    Swal.fire({
      title: '<h2 class="previewheading">TechFoods<span> Preview</span></h2>',
      html: `
        <h2 class="preview">Home Page</h2>
        <img src="/images/TechatronicsFoodHome.PNG" alt="Home" style="width:100%; margin-bottom:10px;">
        <br><br><br>
        <h2 class="preview">Menu Page</h2>
        <img src="/images/TechatronicsFoodMenu.PNG" alt="Food Menu" style="width:100%; margin-bottom:10px;">
        <br><br><br>
        <h2 class="preview">Meat Menu Page</h2>
        <img src="/images/MeatMenu.PNG" alt="Meat Menu" style="width:100%; margin-bottom:10px;">
        <br><br><br>
        <h2 class="preview">Cart Page</h2>
        <img src="/images/Cart.PNG" alt="Cart" style="width:100%; margin-bottom:10px;">
        <br><br><br>
        <h2 class="preview">Login Page</h2>
        <img src="/images/Login.PNG" alt="Login" style="width:100%; margin-bottom:10px;">
      `,
      width: 700,
      padding: '3rem',
      background: 'var(--bg-color)',
      backdrop: 'rgba(0,0,0,0.7) center center no-repeat blur(10px)',
      showConfirmButton: false,
    });
  }

  showImagePreviewLandingPage(): void {
    Swal.fire({
      title: '<h2 class="previewheading">Valorant Beta<span> Preview</span></h2>',
      html: `
        <h2 class="preview">Landing Page</h2>
        <img src="/images/LandingPage.PNG" alt="Landing Page" style="width:100%; margin-bottom:10px;">
        <br><br><br>
        <h2 class="preview">Popup</h2>
        <img src="/images/LandingPagePopUp.PNG" alt="Popup" style="width:100%; margin-bottom:10px;">
      `,
      width: 700,
      padding: '3rem',
      background: 'var(--bg-color)',
      backdrop: 'rgba(0,0,0,0.7) center center no-repeat blur(10px)',
      showConfirmButton: false,
    });
  }
}
