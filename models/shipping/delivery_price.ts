import DeliveryType from './delivery_type'

class DeliveryPrice {
  shipment: number
  type: DeliveryType
  base: number
  perKilo: number

  constructor (shipment: number, type: number, base: number, perKilo: number) {
    this.shipment = shipment
    this.type = type
    this.base = base
    this.perKilo = perKilo
  }

  static jsonToInstance (jsonDeliveryPrice: any) : DeliveryPrice | null {
    if (jsonDeliveryPrice == null) {
      return null
    }
    return new DeliveryPrice(jsonDeliveryPrice.shipment, jsonDeliveryPrice.type, jsonDeliveryPrice.base, jsonDeliveryPrice.perKilo)
  }
}

export default DeliveryPrice
