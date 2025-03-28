interface Fairings {
  reused: boolean | null;
  recovery_attempt: boolean | null;
  recovered: boolean | null;
  ships: string[];
}

interface Patch {
  small: string;
  large: string;
}

interface Reddit {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
}

interface Flickr {
  small: string[];
  original: string[];
}

interface Links {
  patch: Patch;
  reddit: Reddit;
  flickr: Flickr;
  presskit: string | null;
  webcast: string;
  youtube_id: string;
  article: string;
  wikipedia: string;
}

interface Rocket {
  name: string;
  id: string;
}

interface Payload {
  customers: string[];
  id: string;
}

interface Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}

interface ILaunchData {
  fairings: Fairings | null;
  links: Links;
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  net: boolean;
  window: number;
  rocket: Rocket;
  success: boolean;
  failures: any[];
  details: string | null;
  crew: any[];
  ships: string[];
  capsules: string[];
  payloads: Payload[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
}
