import React from 'react'
import { Hai, HaiTalk } from './Hai'

export default { title: 'Hai', component: Hai }

const Template = (args: any): any => {
  return (
    <Hai {...args}>
      <button>hai</button>
    </Hai>
  )
}

export const Talks1 = Template.bind({})

const talks: HaiTalk[] = [
  {
    name: 'question',
    message: 'Do you want something to eat?',
    button: [
      [
        'Yes',
        (next: (answer: any) => void, names: any, actions: any): void => {
          console.log(actions.done)
          next(actions.done)
        },
        false
      ],
      [
        'No',
        (next: (answer: any) => void, names: any, actions: any): void => {
          console.log(names, actions)
          // next(actions.cancel)
        }
      ]
    ]
  }
]

;(Talks1 as any).args = {
  theme: 'dark',
  talks,
  callback: (answers: object): any => {
    console.log(answers)
  }
}

// export const Example: React.FC = () => {
//   const talks: HaiTalk[] = [
//     {
//       name: 'question',
//       message: 'Do you want something to eat?',
//       button: [
//         [
//           'Yes',
//           (next: (answer: any) => void, names: any): void => {
//             console.log(names)
//             // next(names.type)
//           }
//         ],
//         [
//           'No',
//           (next: (answer: any) => void, names: any, actions: any): void => {
//             console.log(names, actions)
//             // next(actions.cancel)
//           }
//         ]
//       ]
//     }
//   ]
//   return (
//     <Hai
//       theme="dark"
//       talks={talks}
//       callback={(answers) => {
//         console.log(answers)
//       }}
//       ><button>hai</button></Hai>
//   )
// }
