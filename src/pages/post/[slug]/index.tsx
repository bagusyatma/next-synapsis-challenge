import { api } from '@/common/http';
import RootLayout from '@/components/layout/RootLayout';
import { DEFAULT_ROUTES } from '@/common/constant/routerConstant';
import { cn } from '@/utils/classname';
import { getItem } from '@/utils/storage';
import { Button, Empty, message, Modal, Skeleton, Spin } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { LuArrowLeft, LuPencil, LuTrash } from 'react-icons/lu';
import { useMutation, useQuery } from 'react-query';

export default function Post() {
  const token = getItem('token');

  const router = useRouter();
  const params = useParams();

  const [modal, modalContext] = Modal.useModal();

  const { data: postData, isLoading: isLoadingPost } = useQuery({
    queryKey: ['post', params?.slug],
    queryFn: async () => {
      const response = await api.get(
        `/public/v2/posts/${params?.slug}`,
        {},
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response;
    },
    enabled: !!params?.slug,
  });

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', postData?.data?.user_id],
    queryFn: async () => {
      const response = await api.get(
        `/public/v2/users/${postData?.data?.user_id}`,
        {},
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response;
    },
    enabled: !!postData?.data?.user_id,
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => {
      return api.delete(`/public/v2/posts/${slug}`, {}, {}, { headers: { Authorization: `Bearer ${token}` } });
    },
    onSuccess: () => {
      message.success('Post deleted successfully');
      router.push(DEFAULT_ROUTES.HOME);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Failed to delete post');
    },
  });

  const handleDelete = (slug: string) => {
    const confirm = modal.confirm({
      centered: true,
      title: 'Delete Post',
      content: 'Are you sure you want to delete this post?',
      footer: () => (
        <div className={cn(['flex justify-end gap-2'])}>
          <Button
            id="confirm-delete-button"
            danger
            disabled={deleteMutation.isLoading}
            onClick={() =>
              deleteMutation.mutate(slug, {
                onSuccess: () => confirm.destroy(),
              })
            }
          >
            Yes, Delete
          </Button>
          <Button
            type="primary"
            onClick={() => confirm.destroy()}
            disabled={deleteMutation.isLoading}
            id="cancel-delete-button"
          >
            Cancel
          </Button>
        </div>
      ),
    });
  };

  return (
    <RootLayout>
      {modalContext}
      <div
        className={cn([
          'max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto dark:text-white space-y-8',
        ])}
      >
        <div className={cn(['flex flex-col gap-2'])}>
          <div className={cn(['flex items-center justify-between'])}>
            <div className={cn('flex items-center gap-2')}>
              <Button type="text" size="small" onClick={() => router.back()} id="back-button">
                <LuArrowLeft className={cn('text-xl')} />
              </Button>

              <span className={cn(['text-2xl font-semibold'])}>Post</span>
            </div>
            <div className={cn(['flex items-center gap-2'])}>
              <Button
                type="default"
                icon={<LuPencil />}
                onClick={() => router.push(DEFAULT_ROUTES.UPDATE(params?.slug as string))}
                id="update-post-button"
              />
              <Button
                type="default"
                danger
                icon={<LuTrash />}
                onClick={() => handleDelete(params?.slug as string)}
                id="delete-post-button"
              />
            </div>
          </div>
          <hr />

          {!isLoadingPost && postData?.data && (
            <div className={cn(['flex flex-col gap-8'])}>
              <div className={cn(['flex flex-col'])}>
                <span className={cn(['text-xl font-semibold text-black dark:text-white'])} id="post-title">
                  {postData?.data?.title}
                </span>
                {isLoadingUser ? (
                  <Skeleton.Input active size="small" />
                ) : (
                  <span className={cn(['text-sm text-gray-500'])}>{userData?.data?.name || 'Anonymous'}</span>
                )}
              </div>
              <div id="post-body">{postData?.data?.body}</div>
            </div>
          )}

          {isLoadingPost && (
            <div className={cn(['flex items-center justify-center w-full py-8'])}>
              <Spin />
            </div>
          )}

          {!isLoadingPost && !postData?.data && (
            <div className={cn(['flex items-center justify-center w-full py-8'])}>
              <Empty />
            </div>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
