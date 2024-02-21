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

  const handleFinish = useCallback(
    (result: R | undefined) => {
      if (onFinished) onFinished(result)
    },
    [onFinished],
  )

  useEffect(() => {
    if (!finished) return

    handleFinish(result)
    resolver.current?.(result)
  }, [result, finished, handleFinish])

  const runAction = useCallback(
    async (...args: P): Promise<R | undefined> => {
      startTransition(() => {
        action(...args)
          .then(
            (data) => {
              setResult(data)
            },
            (error) => {
              console.error(error)
            },
          )
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
