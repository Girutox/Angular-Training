import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
})
export class ServerElementComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy {
  @Input('srvElement') element: { type: string, name: string, content: string };
  @Input() name: string;
  @ViewChild('header', {static: true}) header: ElementRef;
  @ContentChild('contentP', {static: true}) contentP: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges called!");
    console.log(changes);
  }

  ngOnInit(): void {
    console.log("ngOnInit called!");    
    console.log(this.header.nativeElement.textContent);
    console.log(this.contentP.nativeElement.textContent);
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit called!");
    console.log("Text Content of paragraph: " + this.contentP.nativeElement.textContent);
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called!");
    console.log("Text Content: " + this.header.nativeElement.textContent);
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called!");
  }
}
