import { SampleShellModel } from "./SampleShell";

export interface Properties {
  id: number;
  name: string;
  title: string;
  slug: string;
  agent_id: number;
  featured: number;
  price: string;
  cuisine: string;
  douche: number;
  purpose: string;
  type: string;
  image: string;
  floor_plan: string;
  bedroom: string;
  bathroom: string;
  city: string;
  address: string;
  area: number;
  description: string;
  video: string;
  location_latitude: number;
  location_longitude: number;
  nearby: string;
  // tslint:disable-next-line: ban-types
  gallery?: String;
  user: any;
}

export class SampleShellListingModel {
  data: Array<SampleShellModel> = [
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel()
  ];

  constructor(readonly isShell: boolean) { }
}
