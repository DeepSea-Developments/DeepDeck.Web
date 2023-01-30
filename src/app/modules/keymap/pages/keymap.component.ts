import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-config',
  templateUrl: './keymap.component.html',
  styleUrls: ['./keymap.component.scss']
})

export class KeymapComponent implements OnInit {

  macroList: any = [];
  lengthMacro: number;
  pageNumberMacro = 1;
  columndefsMacro: string[] = ['name', 'keys', 'action'];

  layerList: any = [];
  length: number;
  pageNumber = 1;
  columndefs: string[] = ['name', 'keys', 'action'];
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
    this.layerList = [{
      "name": "Layer 1",
      "keys": "A1, A2, A3"
    },
    {
      "name": "Layer 2",
      "keys": "A, B, C"
    }
    ]
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


}
