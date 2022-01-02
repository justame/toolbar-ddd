import {
  IToolbarButtonConfig,
  IVisibiltyRule,
  IDisabledRule,
  IRicosContent,
  IDraftContent,
  IToggleButtonConfig,
  IToggleButton,
  IToggleButtonCreator,
  ISpec,
} from './types';

import { visible } from './behaviours';

export class ToggleButton {
  constructor(
    readonly id,
    private presentation,
    private behaviours: IBehavoiur[]
  );

  getBehaviours(ISpecs) {}
}
// export class ToggleButton {
//   static create({
//     button,
//     visiblityRules,
//     disabledRules,
//     activeRules,
//   }: IToggleButtonConfig<IRicosContent>): IToggleButtonCreator {
//     return (content) => {
//       return {
//         label: button.label,
//         icon: button.icon,
//         onClick: button.onClick,
//         type: 'toggle',
//         get disabled() {
//           return (
//             disabledRules.length > 0 &&
//             disabledRules.every((rule) => {
//               return rule.test(content);
//             })
//           );
//         },
//         get visible() {
//           return (
//             visiblityRules.length > 0 &&
//             visiblityRules.every((rule) => {
//               return rule.test(content);
//             })
//           );
//         },
//         get active() {
//           return (
//             activeRules.length > 0 &&
//             activeRules.every((rule) => {
//               return rule.test(content);
//             })
//           );
//         },
//       };
//     };
//   }
// }
