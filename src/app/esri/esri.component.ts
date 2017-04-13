import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EsriLoaderService } from 'angular2-esri-loader';

@Component({
  selector: 'app-esri',
  templateUrl: './esri.component.html',
  styleUrls: ['./esri.component.css']
})
export class EsriComponent implements OnInit {

  @Output() onMapLoaded = new EventEmitter();

  map: any;
  mapView: any;
  mapImageLayer: any;
  tileLayer: any;
  featureLayer: any;
  unknownLayer:any;

  constructor(private esriLoader: EsriLoaderService) { }

  ngOnInit() {
    return this.esriLoader.load({
      // use a specific version of the API instead of the latest
      url: '//js.arcgis.com/4.3/'
    }).then(() => {
      // load the map class needed to create a new map
      this.esriLoader.loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/MapImageLayer',
        'esri/layers/TileLayer',
        'esri/layers/FeatureLayer'
      ]).then(([
        Map,
        MapView,
        MapImageLayer,
        TileLayer,
        FeatureLayer
      ]) => {
        this.map = new Map();
        this.mapView = new MapView({ map: this.map, container: "ESRIMap" });
        this.mapImageLayer = MapImageLayer;
        this.tileLayer = TileLayer;
        this.featureLayer = FeatureLayer;
        this.onMapLoaded.emit();
      });
    });
  }

  addLayer(layerProperty: any) {
    var layer: any;
    switch (layerProperty.type) {
      case "mapImage":
        layer = new this.mapImageLayer(layerProperty.config);
        break;
      case "tile":
        layer = new this.tileLayer(layerProperty.config);
        break;
      case "feature":
        layer = new this.featureLayer(layerProperty.config);
        break;
    }
    this.map.add(layer);
  }

  changeMapProperties(mapProperty) {
    for (var key in mapProperty) {
      this.map[key] = mapProperty[key]
    }
  }

  changeMapViewProperties(mapViewProperty) {
    for (var key in mapViewProperty) {
      this.mapView[key] = mapViewProperty[key]
    }
  }

  changeLayerProperties(layerID, layerProperty) {
    for (var key in layerProperty) {
      this.map.findLayerById(layerID)[key] = layerProperty[key]
    }
  }

}
