// https://qiita.com/ygkn/items/9a3ca4769c3ba7a24191
export type PropsWithAsChild<
  // コンポーネント独自の props
  Props,
  // asChild がない時の HTML 要素 or コンポーネント
  DefaultElement extends import("react").ElementType,
> =
  | // asChild が true の時
  // Slot の Props が指定できる
  (import("@radix-ui/react-slot").SlotProps &
      Props & {
        asChild: true
        // asChild が true の時は children を必須にしておく
        children: import("react").ReactNode
      })
  // asChild が指定なし or false の時
  // DelautElement の ref 以外の props が指定できる
  | (import("react").ComponentPropsWithoutRef<DefaultElement> &
      Props & {
        asChild?: false
      })
