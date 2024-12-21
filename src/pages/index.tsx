import { api } from '@/common/http';
import RootLayout from '@/components/layout/RootLayout';
import CredentialForm from '@/components/ui/CredentialForm';
import { DEFAULT_ROUTES } from '@/common/constant/routerConstant';
import { cn } from '@/utils/classname';
import { getItem, setItem } from '@/utils/storage';
import { Button, Input, List, message, Modal, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import { LuPlus } from 'react-icons/lu';
import { useInfiniteQuery, useMutation } from 'react-query';
import useDebounce from '@/common/hooks/useDebounce';

interface PostType {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

export default function Home() {
  const name = getItem('name');
  const token = getItem('token');

  const router = useRouter();

  const [isFirst, setIsFirst] = useState(!name || !token);
  const [filledToken, setFilledToken] = useState('');

  const currentToken = isFirst ? filledToken : token;

  const validateTokenMutation = useMutation({
    mutationFn: (data: { name: string; token: string }) => {
      return api.get('/public/v2/users', {}, {}, { headers: { Authorization: `Bearer ${data.token}` } });
    },
    onSuccess: (_, variables) => {
      setItem('name', variables.name);
      setItem('token', variables.token);

      setFilledToken(variables.token);
      setIsFirst(false);
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get(
        '/public/v2/posts',
        { page: pageParam, per_page: 10 },
        {},
        { headers: { Authorization: `Bearer ${currentToken}` } },
      );
      return response;
    },
    getNextPageParam: (lastPage) => {
      const currentPage = parseInt(lastPage.headers['x-pagination-page']);
      const totalPages = parseInt(lastPage.headers['x-pagination-pages']);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    cacheTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    retry: 3,
    onError: (error) => {
      message.error('Failed to get posts');
    },
  });

  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  const list = useMemo(
    () =>
      (data?.pages
        .flatMap((page) => page.data)
        .filter((item) => item.title.toLowerCase().includes(debouncedSearchKeyword.toLowerCase())) ?? []) as PostType[],
    [data?.pages, debouncedSearchKeyword],
  );

  const onFinish = (values: any) => {
    validateTokenMutation.mutate({ name: values.name, token: values.token });
  };

  return (
    <RootLayout>
      <div
        className={cn([
          'max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto dark:text-white space-y-8',
        ])}
      >
        <div className={cn(['flex flex-col gap-2', isFirst && 'hidden'])}>
          <h1 className={cn(['text-2xl'])}>Hai, {getItem('name')}</h1>
          <hr />
          <p className={cn(['text-sm text-gray-500'])}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>

        <div className={cn(['flex flex-col gap-4', isFirst && 'hidden'])}>
          <div className={cn(['flex flex-col w-full sticky top-16 bg-white dark:bg-zinc-950 py-2 z-30 '])}>
            <label className={cn(['text-sm text-black dark:text-white flex items-center gap-1'])}>
              <span>Search</span>
            </label>
            <Input.Search
              id="search-input"
              allowClear
              value={searchKeyword}
              placeholder="Search by title"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <span className={cn(['text-sm text-gray-500 dark:text-gray-400'])}>Only visible data can be searched!</span>
          </div>
          <List
            loading={status === 'loading'}
            dataSource={list}
            rowKey="id"
            loadMore={
              hasNextPage && (
                <div className={cn(['flex justify-center'])}>
                  <Button type="text" onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
                    {isFetchingNextPage ? 'Loading...' : 'Load More'}
                  </Button>
                </div>
              )
            }
            renderItem={(item: PostType) => (
              <Link href={DEFAULT_ROUTES.DETAIL(item.id.toString())}>
                <div className={cn(['shadow p-2 border rounded-lg flex flex-col gap-2 group cursor-pointer mb-4'])}>
                  <span className={cn(['group-hover:underline font-bold'])}>{item.title}</span>
                  <span className={cn(['text-sm text-gray-700 dark:text-gray-300 line-clamp-3 lg:line-clamp-2'])}>
                    {item.body}
                  </span>
                </div>
              </Link>
            )}
          />
        </div>

        <Modal open={isFirst} footer={null} centered closable={false}>
          <CredentialForm onFinish={onFinish} mutation={validateTokenMutation} />
        </Modal>
      </div>

      <div className={cn(['fixed bottom-8 right-8 z-50 lg:hidden'])}>
        <Button
          type="primary"
          className={cn(['w-full'])}
          icon={<LuPlus className={cn(['text-2xl'])} />}
          onClick={() => router.push(DEFAULT_ROUTES.CREATE)}
          id="create-post-button"
        />
      </div>
    </RootLayout>
  );
}
