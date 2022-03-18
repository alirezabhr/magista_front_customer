import DeliveryType from './delivery_type'

class DeliveryPrice {
  id: number
  shipment: number
  type: DeliveryType
  base: number
  perKilo: number

  constructor (id: number, shipment: number, type: number, base: number, perKilo: number) {
    this.id = id
    this.shipment = shipment
    this.type = type
    this.base = base
    this.perKilo = perKilo
  }

  static jsonToInstance (jsonDeliveryPrice: any) : DeliveryPrice | null {
    if (jsonDeliveryPrice == null) {
      return null
    }
    return new DeliveryPrice(jsonDeliveryPrice.id, jsonDeliveryPrice.shipment, jsonDeliveryPrice.type,
      jsonDeliveryPrice.base, jsonDeliveryPrice.perKilo)
  }
}

export default DeliveryPrice
