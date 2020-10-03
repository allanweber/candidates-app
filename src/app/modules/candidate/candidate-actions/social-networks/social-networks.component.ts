import { Candidate } from '../../model/candidate.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss'],
})
export class SocialNetworksComponent implements OnInit {
  @Input() candidate: Candidate;

  constructor() {}

  ngOnInit(): void {}
}
