import { DEFAULT_ROUTES } from '@/common/constant/routerConstant';
import { cn } from '@/utils/classname';
import { Button } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment } from 'react';

import { LuSun, LuMoon, LuPlus } from 'react-icons/lu';

export default function Header({
  isDarkMode,
  setIsDarkMode,
}: {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}) {
  const icon = isDarkMode ? (
    <LuSun className={cn(['h-5 w-5 text-yellow-500'])} />
  ) : (
    <LuMoon className={cn(['h-5 w-5 text-blue-800'])} />
  );

  const router = useRouter();
  const pathname = usePathname();

  return (
    <Fragment>
      <div className={cn(['fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-zinc-950'])}>
        <div
          className={cn([
            'max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto flex items-center justify-between h-full px-4',
          ])}
        >
          <div className={cn(['flex items-center text-2xl text-primary'])}>
            <b className={cn(['font-black text-black dark:text-white'])}>BLOG</b>
            Narsys
          </div>

          <div className={cn(['flex items-center gap-x-4'])}>
            <Button type="text" className={cn(['flex items-center'])} onClick={() => setIsDarkMode(!isDarkMode)}>
              {icon}
            </Button>
            <Button
              type="primary"
              className={cn(['items-center hidden lg:flex', pathname !== DEFAULT_ROUTES.HOME && 'lg:hidden'])}
              icon={<LuPlus className={cn(['text-2xl'])} />}
              onClick={() => router.push(DEFAULT_ROUTES.CREATE)}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
