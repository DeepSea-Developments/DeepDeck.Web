import { NgModule } from '@angular/core';
import { ObjectByIDPipe } from './object-by-id.pipe';


const PIPES = [
    ObjectByIDPipe,
];

@NgModule({
  declarations: [
    ...PIPES,
  ],
  exports: [
    ...PIPES,
  ],
  providers: [
    ...PIPES,
  ]
})
export class PipesModule { }
