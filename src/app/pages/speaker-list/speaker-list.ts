import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { StorageServiceService } from '../../services/storage-service.service';


@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage {
  speakers: any[] = [];

  constructor(public confData: ConferenceData,private storageService:StorageServiceService) {}

  ionViewDidEnter() {
    this.storageService.getString('bookmark').then(res => {
      if (res != null && res != 'undefined') {
        this.speakers = res;
      } 
     
    });

  }
}
