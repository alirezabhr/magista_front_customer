class ProductAttribute {
  id: number
  name: string
  value: string

  constructor (id: number, name:string, value:string) {
    this.id = id
    this.name = name
    this.value = value
  }
  
  toJSON () {
    return { ...this }
  }
}

export default ProductAttribute
