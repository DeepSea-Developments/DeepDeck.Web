import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
    public authService: AuthService,
  ) {
  }

  getBasicApiEndpoint(): string {
    return environment.API_URL;
  }

  getPublicApiEndpoint(): string {
    return environment.API_URL + '/tenant/public';
  }

  getClientApiEndpoint(): string {
    const client = this.authService.getClient();
    if (client) {
      return environment.API_URL + '/tenant/' + client.id;
    }
    else {
      return environment.API_URL + '/tenant/public';
    }
  }

  roundTo(n, digits): any {
    let negative = false;
    if (digits === undefined) {
      digits = 0;
    }
    if (n < 0) {
      negative = true;
      n = n * -1;
    }
    const multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
      n = (n * -1).toFixed(digits);
    }
    return n;
  }
}
