import { icons } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { useMemo } from 'react';

type IconName = keyof typeof icons;
type IconProps = { name: IconName; className?: string };

export default function LucideIcon({ name, className }: IconProps) {
  const CustomIcon = useMemo(() => {
    // eslint-disable-next-line import/namespace
    const Icon = icons[name];
    Icon.displayName = name;

    return cssInterop(Icon, {
      className: {
        target: 'style',
        nativeStyleToProp: {
          color: true,
          width: true,
          height: true,
        },
      },
    });
  }, [name]);

  return <CustomIcon className={className} />;
}

// const Icon: React.FC<IconProps> = memo(({ name, className }) => {
//   const CustomIcon = useMemo(() => {
//     const Icon = icons[name];
//     Icon.displayName = name;

//     return cssInterop(Icon, {
//       className: {
//         target: 'style',
//         nativeStyleToProp: {
//           color: true,
//           width: true,
//           height: true,
//         },
//       },
//     });
//   }, [name]);

//   return <CustomIcon className={className} />;
// });

// export default Icon;
