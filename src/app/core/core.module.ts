import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { ProgressBarModule } from './components/progress-bar/progress-bar.module';

@NgModule({
    imports: [
        HttpClientModule,
        ProgressBarModule,
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true,
        }
    ],
    exports: [
        ProgressBarModule
    ]
})
export class CoreModule {
}
