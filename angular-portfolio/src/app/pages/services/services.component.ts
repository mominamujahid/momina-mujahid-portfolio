import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [  CommonModule],
  standalone: true,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services = [
    {
      title: 'Responsive Web Design',
      desc: 'Crafting pixel-perfect layouts that adapt seamlessly across all screen sizes using modern CSS and Angular components.'
    },
    {
      title: 'Single Page Applications (SPA)',
      desc: 'Building dynamic and fast-loading SPAs using Angular with efficient routing and component architecture.'
    },
    {
      title: 'UI/UX Prototyping',
      desc: 'Designing wireframes and interactive mockups in Figma or Adobe XD to ensure intuitive user experiences before development.'
    },
    {
      title: 'API Integration',
      desc: 'Connecting frontend apps to RESTful APIs and handling data securely and efficiently using Angular services and HTTP modules.'
    },
    {
      title: 'Component-Based Development',
      desc: 'Developing reusable and modular Angular components to ensure scalable and maintainable codebases.'
    },
    {
      title: 'Version Control (Git)',
      desc: 'Managing code with Git and GitHub, ensuring collaborative workflows and clean commit histories in team or solo projects.'
    }
  ];
}

