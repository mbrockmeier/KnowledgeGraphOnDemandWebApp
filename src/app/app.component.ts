import { Component, OnInit, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { LoaderService } from './services/loader.service';
import { Subscription } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderState } from './interfaces/loader-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'KGoDApp';

  private subscription: Subscription;
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay, private loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      if (state.show) {
        this.overlayRef = this.overlay.create({
          positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
          hasBackdrop: true
        });
        this.overlayRef.attach(new ComponentPortal(LoaderComponent));
      } else {
        this.overlayRef.dispose();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
