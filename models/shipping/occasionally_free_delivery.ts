import AreaType from './area_type'

class OccasionallyFreeDelivery {
  id: number
  shipment: number
  type: AreaType
  freeFrom: number

  constructor (id: number, shipment: number, type: number, freeFrom: number) {
    this.id = id
    this.shipment = shipment
    this.type = type
    this.freeFrom = freeFrom
  }

  static jsonToInstance (jsonObject: any) : OccasionallyFreeDelivery | null {
    if (jsonObject == null) {
      return null
    }
    return new OccasionallyFreeDelivery(jsonObject.id, jsonObject.shipment, jsonObject.type, jsonObject.freeFrom)
  }
}

export default OccasionallyFreeDelivery
