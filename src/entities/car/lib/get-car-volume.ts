export const getCarVolumeFromCubesToLiter = (engineVolume?: number | string) =>
  engineVolume && (Number(engineVolume) / 1000).toFixed(1)
