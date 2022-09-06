import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular';
import { NasaService } from '../../services/nasa.service';
import { StorageServiceService } from '../../services/storage-service.service';


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage {
  //test
  result: any = "";
  dateOfPic = '2019-05-17';
  finalData = []
  bookmarkValue=""

  constructor(
    public popoverCtrl: PopoverController,
    private nasaService: NasaService,
    private loadingCtrl: LoadingController,
    private datePipe: DatePipe,
    private storageService: StorageServiceService
  ) {
    let date = new Date();
    this.dateOfPic = this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  ngOnInit() {
    this.loadAPOD(this.dateOfPic);

  }

  async loadAPOD(dateInput) {
    dateInput = this.datePipe.transform(dateInput, 'yyyy-MM-dd');
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.nasaService.getAPOD(dateInput).subscribe(
      (res) => {
        loading.dismiss();
        this.result = res
        this.storageService.getString('bookmark').then(res => {
          this.finalData=[]
          if (res != null && res != 'undefined') {
            this.finalData=res;
            if(this.finalData.includes(this.result.date)){
              this.bookmarkValue="Bookmarked!"
            }else{
              this.bookmarkValue="Bookmark this"
            }
          } else {
            this.bookmarkValue="Bookmark this"
          }
        });
    
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  dateChange() {
    this.loadAPOD(this.dateOfPic)
  }
  bookmarkItem() {
    if(this.bookmarkValue=="Bookmarked"){
      return;
    }
    this.storageService.getString('bookmark').then(res => {
      this.finalData=[]
      if (res != null && res != 'undefined') {
        this.finalData=res;
        if(!this.finalData.includes(this.result.date)){
        this.finalData.push(this.result)
        this.storageService.setString("bookmark", (this.finalData))
        }else{
          this.finalData.push(this.result)
        this.storageService.setString("bookmark", (this.finalData))
        }
      } else {
        this.finalData.push(this.result)
        this.storageService.setString("bookmark", (this.finalData))
      }
      alert("Bookmarked")
    });

  }
}
