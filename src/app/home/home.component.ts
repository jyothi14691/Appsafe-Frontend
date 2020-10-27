import { Component, OnInit } from '@angular/core';
import 'jquery';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedOption: String;
  printedOption: String;
  time: string;
  numOfPeople: String;

  options = [
    { name: "SHOPRITE : NEWARK DE 19713", value: 1 },
    { name: "FOOD LION : NEW CASTLE DE 19720", value: 2 }
  ]

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
  //   $(".dropdown-menu li a").click(function(e){
  //     var selText = $(this).text();
  //     $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');

  // });
  }

  onSubmit() {
    this.printedOption = this.selectedOption;
    console.log("My input: ", this.selectedOption);
    console.log("selected time: ", this.time);

    this.homeService.displayCount(this.selectedOption, this.time).subscribe(
      people => this.numOfPeople = people
    )

  }

}
