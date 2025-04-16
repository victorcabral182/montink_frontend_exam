interface IProduct {
  id: number
  title: string
  created_at: number
  updated_at: number
  options: string[]
  values: string[][]
  variants: IVariant[]
  image_url: string
  images: IProductImage[]
  currency: string
}

interface IVariant {
  id: number
  product_id: number
  price: string
  sku: string | null
  position: number
  compare_at_price: string
  values: string[]
  created_at: string
  updated_at: string
  barcode: string | null
  image_id: number
  weight: string
  inventory_quantity: number
  image_url: string
}

interface IProductImage {
  id: number
  product_id: number
  position: number
  alt: string[]
  src: string
}

interface IForm {
  Tamanho: string
  Cor: string
}

export type { IProduct, IVariant, IProductImage, IForm }
