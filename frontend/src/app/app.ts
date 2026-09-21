import { AfterViewInit, Component, HostListener, signal } from '@angular/core';
import { Home } from './home/home';
import { About } from './about/about';
import { Education } from './education/education';
import { Certifications } from './certifications/certifications';
import { Experience } from './experience/experience';
import { Skills } from './skills/skills';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-root',
  imports: [Home, About, Education, Certifications, Experience, Skills, Projects, Contact],
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements AfterViewInit {
  menuOpen = signal(false);
  activeSection = signal('home');

  private sections: HTMLElement[] = [];

  ngAfterViewInit(): void {
    this.sections = Array.from(document.querySelectorAll('section'));
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const top = window.scrollY;
    for (const section of this.sections) {
      const offset = section.offsetTop - 150;
      const height = section.offsetHeight;
      if (top >= offset && top < offset + height) {
        this.activeSection.set(section.id);
        break;
      }
    }
  }
}
