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

  static jsonToInstance (jsonAttr: any) : ProductAttribute {
    return new ProductAttribute(jsonAttr.id, jsonAttr.name, jsonAttr.name)
  }
}

export default ProductAttribute
