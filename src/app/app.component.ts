import { AfterViewInit, Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import L, { LatLng, LatLngExpression, Marker, Point } from 'leaflet';
import { AddMarkerComponent } from "./add-marker/add-marker.component";
import G, { Feature, GeoJsonProperties, Geometry } from 'geojson';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, AddMarkerComponent]
})
export class AppComponent implements AfterViewInit {
    
    title = 'Barathon';
    protected map! : L.Map;
    protected markers = signal<Array<Marker<Point>>>([]);
    protected previewedMarker: Marker | null = null;

    constructor() {
        this.markers().push(L.marker([45.193076, 5.73147], {title: "Le tonneau de diogène", opacity: 1}));
        this.markers().push(L.marker([45.193504, 5.729239], {title: "Pub shakesbeer", opacity: 1}));
        this.markers().push(L.marker([45.187095, 5.723727], {title: "Le Champollion", opacity: 1}));
        
        effect( () => {
            for (let m of this.markers())
                m.addTo(this.map);
        })
    }

    ngAfterViewInit(): void {
        this.map = L.map('map').setView([45.186436, 5.736047], 13);
        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
    }

    myLog(obj : Object) {
        console.log(obj)
    }

    markerFromFeature(f : Feature) {
        let point = f.geometry as G.Point;
        return L.marker(
            new LatLng(point.coordinates[1], point.coordinates[0]), 
            {title: f.properties!['label'], opacity: 1});
    }

    addMarker(m : Marker) {
        this.markers.update(value => [...value, m]);
    }

    toggleMarker(m: Marker) {
        m.setOpacity((m.options.opacity ?? 0) == 1 ? 0 : 1);
    }

    
}
