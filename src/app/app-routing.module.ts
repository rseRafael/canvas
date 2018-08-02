import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewBookComponent } from './new-book/new-book.component';
import { CanvasComponent } from './canvas/canvas.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'newbook', component: NewBookComponent },
  {path: 'canvas', component: CanvasComponent},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
