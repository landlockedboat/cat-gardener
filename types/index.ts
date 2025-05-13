import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ToxicityToAnimals =
  | "toxic to cats"
  | "toxic to dogs"
  | "toxic to horses";

export type ToxicityStatus = "safe" | "toxic";
