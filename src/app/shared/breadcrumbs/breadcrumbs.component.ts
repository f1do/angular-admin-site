import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  pageTitle: string = '';

  constructor(private router: Router, private title: Title, private meta: Meta) {

    this.getDataRoute().subscribe(data => {
      this.pageTitle = data.title;
      this.title.setTitle(this.pageTitle);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.pageTitle
      };

      this.meta.updateTag(metaTag);

    });

   }

  ngOnInit(): void {
  }

  getDataRoute(): Observable<any> {
    return this.router.events.pipe(
      filter((res, ndx) => res instanceof ActivationEnd),
      filter((res: ActivationEnd, ndx) => res.snapshot.firstChild === null),
      map((evt: ActivationEnd) => evt.snapshot.data )
    );
  }

}
