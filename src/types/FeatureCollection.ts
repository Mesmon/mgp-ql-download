export type FeatureCollection = {
  type: 'FeatureCollection'
  features: Feature[]
  numberReturned: number
  timestamp: string
  links: Link[]
}

type Feature = {
  id: string
  bbox: number[]
  type: 'Feature'
  links: Link[]
  assets: Assets
  geometry: Geometry
  collection: string
  properties: Properties
  stac_version: string
  stac_extensions: string[]
}

type Link = {
  rel: string
  href: string
  type?: string
}

type Assets = {
  browse: Asset
  'cloud-cover': Asset
  'sample-point-set': Asset
}

type Asset = {
  href: string
  type: string
  title: string
}

type Geometry = {
  type: 'Polygon'
  coordinates: number[][][]
}

type Properties = {
  gsd: number
  title: string
  datetime: string
  'eo:bands': Band[]
  platform: string
  instruments: string[]
  associations: unknown[]
  'view:azimuth': number
  constellation: string
  off_nadir_avg: number
  off_nadir_end: number
  off_nadir_max: number
  off_nadir_min: number
  rda_available: boolean
  'eo:cloud_cover': number
  scan_direction: string
  'view:off_nadir': number
  off_nadir_start: number
  collect_time_end: string
  'view:sun_azimuth': number
  raw_archive_state: string
  collect_time_start: string
  pan_resolution_avg: number
  pan_resolution_end: number
  pan_resolution_max: number
  pan_resolution_min: number
  'view:sun_elevation': number
  multi_resolution_avg: number
  multi_resolution_end: number
  multi_resolution_max: number
  multi_resolution_min: number
  pan_resolution_start: number
  acquisition_rev_number: number
  multi_resolution_start: number
  'view:sun_elevation_max': number
  'view:sun_elevation_min': number
  geolocation_uncertainty: number
  stereo_pair_identifiers: string[]
  spacecraft_to_target_azimuth_avg: number
  spacecraft_to_target_azimuth_end: number
  spacecraft_to_target_azimuth_max: number
  spacecraft_to_target_azimuth_min: number
  target_to_spacecraft_azimuth_avg: number
  target_to_spacecraft_azimuth_end: number
  target_to_spacecraft_azimuth_max: number
  target_to_spacecraft_azimuth_min: number
  spacecraft_to_target_azimuth_start: number
  target_to_spacecraft_azimuth_start: number
  target_to_spacecraft_elevation_avg: number
  target_to_spacecraft_elevation_end: number
  target_to_spacecraft_elevation_max: number
  target_to_spacecraft_elevation_min: number
  target_to_spacecraft_elevation_start: number
}

type Band = {
  name: string
  center_wavelength: number
}
