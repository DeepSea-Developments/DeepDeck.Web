import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-config',
  templateUrl: './keymap.component.html',
  styleUrls: ['./keymap.component.scss']
})

export class KeymapComponent implements OnInit {

  macroList: any = [];
  lengthMacro: number;
  pageNumberMacro = 1;
  columndefsMacro: string[] = ['pos', 'name', 'action'];

  layerList: any = [];
  length: number;
  pageNumber = 1;
  columndefs: string[] = ['pos', 'name','active', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadLayers();
    this.loadMacros();    
  }
  
  loadLayers() {
    this.apiService.getLayersName().subscribe(response => {
      this.layerList = response.data;
    });
  }

  loadMacros() {
    this.macroList = [{
      "name": "M1",
      "keys": "Layer1 + Layer 2"
    },
    {
      "name": "M2",
      "keys": "Layer2 + Layer3 + Layer1"
    }
    ]
  }

  refreshLayer(event) {

  }

  refreshMacro(event) {

  }

  openConfirmationDialog(element: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { element: element }, // Pass the element object
    });
  
    dialogRef.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        //this.delete(elementId);
      }
    });
  }

}
