import HaiClass, {
  HaiTalk,
  HaiTalkButton,
  HaiTalkButtonCallbackFunction,
  HaiTalkConvenient
} from '@nju33/hai'
import React from 'react'

export type {
  HaiTalk,
  HaiTalkButton,
  HaiTalkConvenient,
  HaiTalkButtonCallbackFunction
}

export interface HaiProps<A extends Record<string, any> = {}> {
  callback: (answers: A) => any
  talks: HaiTalk[]
  theme: 'dark' | 'light'
}

export const Hai: React.FC<React.PropsWithChildren<HaiProps>> = ({
  callback,
  children,
  talks,
  theme
}) => {
  const elementRef = React.useRef<HTMLDivElement>(null)
  HaiClass.config.theme = theme

  const onClick = React.useCallback(async () => {
    if (elementRef.current === null) {
      return
    }

    const target = elementRef.current

    const hai = new HaiClass(talks)
    if (target.children.length > 0) {
      await hai.open(target.children[0]).then(callback)
    } else {
      await hai.open(target).then(callback)
    }
  }, [callback, talks, elementRef])

  return (
    <div ref={elementRef} onClick={onClick}>
      {children}
    </div>
  )
}
