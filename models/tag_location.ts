class TagLocation {
  id: number
  x: number
  y: number

  constructor (id: number, x: number, y: number) {
    this.id = id
    this.x = x
    this.y = y
  }
  
  toJSON () {
    return { ...this }
  }

  static jsonToInstance (jsonTag: any) : TagLocation {
    return new TagLocation(jsonTag.id, jsonTag.x, jsonTag.y)
  }
}

export default TagLocation
