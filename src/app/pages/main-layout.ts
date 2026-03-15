import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../core/components/header';
import { Footer } from '../core/components/footer';

@Component({
  selector: 'app-main-layout',
  template: `
    <div>
      <app-header />
      <div class="flex-1">
        <router-outlet />
      </div>
      <app-footer/>
    </div>
  `,
  imports: [RouterOutlet, Header, Footer],
})
export class MainLayout {}
