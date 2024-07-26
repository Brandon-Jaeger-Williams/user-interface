import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../../models/user-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  user!: UserModel;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['user'];
  }

}
