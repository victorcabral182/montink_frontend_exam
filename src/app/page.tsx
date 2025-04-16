"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { IForm, IProduct } from "./types/types"
import { formatToCurrency } from "./utils/formatCurrency"

export default function Home() {
  const [product, setProduct] = useState<IProduct | null>(null)
  const [form, setForm] = useState<IForm>({ Tamanho: "", Cor: "" })

  async function getData() {
    try {
      const response = await fetch(
        "https://empreender.nyc3.cdn.digitaloceanspaces.com/static/teste-prod-1.json"
      )
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.error(error)
    }
  }

  const selectedValues = product?.options?.map(
    (opt) => form[opt as keyof IForm]
  )

  const matchedVariant = product?.variants?.find(
    (v) => JSON.stringify(v.values) === JSON.stringify(selectedValues)
  )

  const hasStock = matchedVariant && matchedVariant?.inventory_quantity >= 1
  const product_id = matchedVariant?.product_id
  const variant_id = matchedVariant?.id

  const payload = [
    {
      values: Object.values(form),
      quantity: 1,
      product_id: product_id,
      variant_id: variant_id,
    },
  ]

  async function purchaseItem() {
    try {
      const response = await fetch(
        "https://app.landingpage.com.br/api/checkoutloja/LPL2gc/5d87eb644e5631bc6a03f1e43a804e1c",
        { method: "POST", body: JSON.stringify(payload) }
      )
      const data = await response.json()
      if (data) {
        alert("Compra realizada com sucesso!")
      }
    } catch (e) {
      alert(e ?? "Ocorreu um erro, tente novamente mais tarde.")
    } finally {
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (!product) return null
  return (
    <section className="flex flex-col bg-gray-300 justify-center items-center h-screen">
      <div className="grid grid-cols-4 p-[30px] bg-white shadow-2xl rounded-[15px] max-w-[40%]">
        <div className="col-span-2">
          <Image
            priority
            width={900}
            height={900}
            quality={100}
            alt={product?.title}
            src={product?.image_url ?? ""}
            className="w-auto h-full object-cover"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-4 p-8">
          <p className="text-[25px]">{product?.title}</p>
          <p className="text-[23px]">
            {matchedVariant
              ? formatToCurrency(
                  parseFloat(matchedVariant?.price),
                  product?.currency ?? "BRL"
                )
              : ""}
          </p>
          {product?.options?.map((e: string, i: number) => {
            return (
              <div className="flex flex-col" key={e}>
                <label htmlFor="select" className="text-base">
                  {e}
                </label>
                <select
                  className="border-2 border-gray-300 rounded-md p-2 pr-4 cursor-pointer active:outline-purple-600 focus:outline-purple-600"
                  id="select"
                  value={form[product?.options?.[i] as keyof IForm]}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      [product?.options?.[i]]: e.target.value,
                    })
                  }}
                >
                  <option value="">Selecione</option>
                  {product?.values?.[i]?.map((e: string) => {
                    return (
                      <option className="cursor-pointer p-4" key={e} value={e}>
                        {e}
                      </option>
                    )
                  })}
                </select>
              </div>
            )
          })}
          {!hasStock && matchedVariant && (
            <span className="text-xs text-red-500">
              Não há itens disponíveis em estoque
            </span>
          )}
          {hasStock && (
            <button
              onClick={() => purchaseItem()}
              className="bg-purple-600 cursor-pointer rounded-lg px-4 py-2 text-white font-semibold "
            >
              Comprar
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
