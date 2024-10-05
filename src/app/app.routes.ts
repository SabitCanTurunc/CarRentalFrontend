import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';

export const routes: Routes = [
  { path: '', pathMatch: "full", component: CarComponent },  // Ana sayfa için yönlendirme
  { path: 'cars', component: CarComponent }  // 'cars' sayfası için yönlendirme
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
