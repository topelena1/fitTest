import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailEventsSearchService } from '../mail-search.service';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  constructor(private searchMMailservice: EmailEventsSearchService) {}

  networkingErr = false;
  events = [];
  displayedColumns: string[] = ['timeStamp', 'source', 'eventType', 'subject'];
  today = new Date();

  ngOnInit() {}

  onSubmit(form: NgForm): void {
    this.networkingErr = false;
    const { email, date } = form.value;
    const searchDate = moment(date).format('YYYYMMDD');

    this.searchMMailservice.search(email, searchDate).subscribe(
      res => {
        this.events = res.data.events;
        console.log(this.events);
      },
      err => {
        this.networkingErr = true;
        this.events = [];
      }
    );
  }
}
