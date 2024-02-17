import { useCallback, useEffect, useRef, useState, useTransition } from "react"

const useServerAction = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Fn extends (...args: any) => any,
  const P extends Parameters<Fn>,
  const R extends ReturnType<Fn>,
>(
  action: (...args: P) => Promise<R>,
  onFinished?: (_: R | undefined) => void,
): [(...args: P) => Promise<R | undefined>, boolean] => {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<R>()
  const [finished, setFinished] = useState(false)
  const resolver = useRef<(value?: PromiseLike<R> | R) => void>()

  useEffect(() => {
    if (!finished) return

    if (onFinished) onFinished(result)
    resolver.current?.(result)
  }, [result, finished, onFinished])

  const runAction = useCallback(
    async (...args: P): Promise<R | undefined> => {
      startTransition(() => {
        action(...args)
          .then((data) => {
            setResult(data)
          })
          .finally(() => {
            setFinished(true)
          })
      })

      return new Promise((resolve) => {
        resolver.current = resolve
      })
    },
    [action],
  )

  return [runAction, isPending]
}

export { useServerAction }
