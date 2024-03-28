import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Feature, FeatureCollection, Point } from 'geojson';

@Component({
  selector: 'app-add-marker',
  standalone: true,
  imports: [],
  templateUrl: './add-marker.component.html',
  styleUrl: './add-marker.component.css'
})
export class AddMarkerComponent {

    @Output() 
    addMarker = new EventEmitter<Feature>();

    protected options = new Array<Feature>;

    constructor( private http: HttpClient ) {}

    fetchCoords(query: string) {
        this.http.get("https://api-adresse.data.gouv.fr/search/?q=" + encodeURIComponent(query))
        .subscribe(r => this.options = (r as FeatureCollection).features);
    }

    findMarker(id: string) {
        return this.options.find(feature => feature.properties!['id'] == id);
    }
}
