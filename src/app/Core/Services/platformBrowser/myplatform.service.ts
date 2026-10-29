
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MyplatformService {

  constructor(@Inject(PLATFORM_ID) private id: object) {}

  // Returns true in the browser, false otherwise
  checkPlatformBrowser(): boolean {
    if (isPlatformBrowser(this.id)) {
      return true;
    }

    return false;
  }
}
