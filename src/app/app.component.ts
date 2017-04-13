import { Component, ViewChild,HostBinding, HostListener } from '@angular/core';
import { EsriComponent } from './esri/esri.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  public isMenuOpen: boolean = false

  @ViewChild(EsriComponent) myESRI: EsriComponent;

  layersList = [
    {
      label:"World Terrain Base",
      type: "tile",
      config: {
        id: "World_Terrain_Base",
        url: "http://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer",
        visible: false
      }
    }
    ,
    {
      label:"World Transportation",
      type: "tile",
      config: {
        id: "World_Transportation",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer"
      }
    }
    ,
    {
      label:"Geology",
      type: "mapImage",
      config: {
        id: "Geology",
        url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Energy/Geology/MapServer",
        opacity: 0.8
      }
    },
    {
      label:"HSEC",
      type: "feature",
      config: {
        id: "HSEC",
        url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Energy/HSEC/FeatureServer"
      }
    }
  ]

  adviseMapLoaded() {

    this.myESRI.changeMapProperties({ basemap: "streets" })
    this.myESRI.changeMapViewProperties({ center: [-112, 38], zoom: 5 })

    this.layersList.forEach(layer => {
      this.myESRI.addLayer(layer)
    });

  }

  changeLayerVisibility(layerID:string,e)
  {
    this.myESRI.changeLayerProperties(layerID,{visible:e.target.checked})
  }
}
